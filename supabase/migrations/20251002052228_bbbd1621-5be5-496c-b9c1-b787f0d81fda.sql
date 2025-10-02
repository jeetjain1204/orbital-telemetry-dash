-- Create publications table
CREATE TABLE IF NOT EXISTS public.publications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  url_main TEXT NOT NULL UNIQUE,
  source TEXT DEFAULT 'PMC',
  ingested_at TIMESTAMPTZ DEFAULT now()
);

-- Create full-text search index on title
CREATE INDEX IF NOT EXISTS idx_publications_title_search ON public.publications 
USING gin(to_tsvector('english', title));

-- Create index on ingested_at for sorting
CREATE INDEX IF NOT EXISTS idx_publications_ingested_at ON public.publications(ingested_at DESC);

-- Enable RLS
ALTER TABLE public.publications ENABLE ROW LEVEL SECURITY;

-- Allow public read access (publications are public data)
CREATE POLICY "Publications are viewable by everyone"
  ON public.publications
  FOR SELECT
  USING (true);

-- Create future tables (empty for now)
CREATE TABLE IF NOT EXISTS public.summaries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pub_id UUID NOT NULL REFERENCES public.publications(id) ON DELETE CASCADE,
  context TEXT,
  methods TEXT,
  results TEXT,
  limitations TEXT,
  mission_relevance TEXT,
  confidence TEXT,
  provenance_json JSONB,
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(pub_id)
);

CREATE TABLE IF NOT EXISTS public.paper_tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pub_id UUID NOT NULL REFERENCES public.publications(id) ON DELETE CASCADE,
  organism TEXT,
  stressor TEXT,
  system TEXT,
  platform TEXT,
  study_type TEXT,
  outcome_direction TEXT,
  evidence_level TEXT,
  year INTEGER,
  UNIQUE(pub_id)
);

-- Enable RLS on future tables
ALTER TABLE public.summaries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.paper_tags ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Summaries are viewable by everyone"
  ON public.summaries
  FOR SELECT
  USING (true);

CREATE POLICY "Tags are viewable by everyone"
  ON public.paper_tags
  FOR SELECT
  USING (true);

-- Optional: bookmarks table for authenticated users (future)
CREATE TABLE IF NOT EXISTS public.bookmarks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  publication_id UUID NOT NULL REFERENCES public.publications(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, publication_id)
);

ALTER TABLE public.bookmarks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own bookmarks"
  ON public.bookmarks
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own bookmarks"
  ON public.bookmarks
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own bookmarks"
  ON public.bookmarks
  FOR DELETE
  USING (auth.uid() = user_id);