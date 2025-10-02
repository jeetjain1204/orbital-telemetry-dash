import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Publication {
  id: string;
  title: string;
  url_main: string;
  source: string;
  ingested_at: string;
}

export const usePublications = (searchQuery?: string, sortBy: "title" | "recent" = "title") => {
  return useQuery({
    queryKey: ["publications", searchQuery, sortBy],
    queryFn: async () => {
      let query = supabase.from("publications").select("*");

      // Full-text search on title
      if (searchQuery && searchQuery.trim()) {
        query = query.textSearch("title", searchQuery.trim(), {
          type: "websearch",
          config: "english",
        });
      }

      // Sorting
      if (sortBy === "recent") {
        query = query.order("ingested_at", { ascending: false });
      } else {
        query = query.order("title", { ascending: true });
      }

      const { data, error } = await query;

      if (error) throw error;
      return data as Publication[];
    },
  });
};

export const usePublication = (id: string) => {
  return useQuery({
    queryKey: ["publication", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("publications")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data as Publication;
    },
    enabled: !!id,
  });
};

export const useRelatedPublications = (id: string, currentTitle: string) => {
  return useQuery({
    queryKey: ["related-publications", id, currentTitle],
    queryFn: async () => {
      // Extract key terms from the title (simple approach)
      const terms = currentTitle
        .toLowerCase()
        .split(/\s+/)
        .filter((word) => word.length > 4)
        .slice(0, 3)
        .join(" | ");

      let query = supabase
        .from("publications")
        .select("*")
        .neq("id", id)
        .limit(6);

      if (terms) {
        query = query.textSearch("title", terms, {
          type: "websearch",
          config: "english",
        });
      } else {
        query = query.order("ingested_at", { ascending: false });
      }

      const { data, error } = await query;

      if (error) throw error;
      return data as Publication[];
    },
    enabled: !!id && !!currentTitle,
  });
};

export const usePublicationStats = () => {
  return useQuery({
    queryKey: ["publication-stats"],
    queryFn: async () => {
      const { count, error } = await supabase
        .from("publications")
        .select("*", { count: "exact", head: true });

      if (error) throw error;
      return { total: count || 0 };
    },
  });
};
