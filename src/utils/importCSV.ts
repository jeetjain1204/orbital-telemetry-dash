import { supabase } from "@/integrations/supabase/client";

export async function importPublicationsFromCSV(csvText: string) {
  try {
    // Parse CSV
    const lines = csvText.trim().split('\n');
    const headers = lines[0].split(',').map(h => h.trim().replace(/['"]/g, ''));
    
    const publications = [];
    
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i];
      if (!line.trim()) continue;
      
      // Handle quoted fields with commas
      const matches = line.match(/("([^"]*)"|[^,]+)/g);
      if (!matches || matches.length < 2) continue;
      
      const title = matches[0].replace(/^"|"$/g, '').trim();
      const url = matches[1].replace(/^"|"$/g, '').trim();
      
      if (title && url && url.includes('ncbi.nlm.nih.gov/pmc')) {
        publications.push({
          title,
          url_main: url,
          source: 'PMC'
        });
      }
    }
    
    console.log(`Parsed ${publications.length} publications from CSV`);
    
    // Insert in batches of 100
    const batchSize = 100;
    let imported = 0;
    
    for (let i = 0; i < publications.length; i += batchSize) {
      const batch = publications.slice(i, i + batchSize);
      
      const { error } = await supabase
        .from('publications')
        .upsert(batch, {
          onConflict: 'url_main',
          ignoreDuplicates: false
        });
      
      if (error) {
        console.error(`Error importing batch ${i / batchSize + 1}:`, error);
        throw error;
      }
      
      imported += batch.length;
      console.log(`Imported ${imported} / ${publications.length}`);
    }
    
    return {
      success: true,
      imported: publications.length,
      message: `Successfully imported ${publications.length} publications`
    };
  } catch (error) {
    console.error('Import error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      message: 'Import failed'
    };
  }
}
