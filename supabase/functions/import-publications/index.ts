import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.58.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface PublicationRow {
  title: string;
  url_main: string;
  source: string;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { csvData } = await req.json();

    if (!csvData || !Array.isArray(csvData)) {
      throw new Error('Invalid CSV data format');
    }

    const publications: PublicationRow[] = csvData.map((row: any) => ({
      title: row.Title || row.title,
      url_main: row.Link || row.url_main || row.link,
      source: 'PMC',
    }));

    // Upsert publications (on conflict with url_main, do nothing)
    const { data, error } = await supabase
      .from('publications')
      .upsert(publications, {
        onConflict: 'url_main',
        ignoreDuplicates: true
      });

    if (error) throw error;

    return new Response(
      JSON.stringify({ 
        success: true, 
        imported: publications.length,
        message: `Successfully imported ${publications.length} publications`
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
    );
  }
});
