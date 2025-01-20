import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface JobFilters {
  searchQuery: string;
  minSalary: number;
  includeMissingSalary: boolean;
  experience: string;
  location: string;
}

export const useJobs = (initialPage: number, filters: JobFilters) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [totalJobs, setTotalJobs] = useState(0);
  const [page, setPage] = useState(initialPage);
  const { toast } = useToast();

  const JOBS_PER_PAGE = 24;

  const buildQuery = (countOnly = false) => {
    let query = supabase
      .from("jobs")
      .select(countOnly ? 'count' : '*', { count: 'exact' });

    if (filters.searchQuery) {
      query = query.or(`title.ilike.%${filters.searchQuery}%,company.ilike.%${filters.searchQuery}%,description.ilike.%${filters.searchQuery}%`);
    }
    
    if (filters.minSalary > 30) {
      if (filters.includeMissingSalary) {
        query = query.or(`min_salary.gte.${filters.minSalary * 1000},min_salary.is.null`);
      } else {
        query = query.gte("min_salary", filters.minSalary * 1000);
      }
    }
    
    if (filters.experience) {
      query = query.eq("experience_level", filters.experience);
    }
    if (filters.location) {
      query = query.ilike("location_category", filters.location);
    }

    return query;
  };

  const fetchTotalCount = async () => {
    try {
      console.log("Fetching total count with filters:", filters);
      const { count, error } = await buildQuery(true);
      
      if (error) {
        console.error("Error fetching count:", error);
        throw error;
      }
      
      console.log("Total matching jobs:", count);
      setTotalJobs(count || 0);
    } catch (error) {
      console.error("Error fetching total count:", error);
      toast({
        title: "Error",
        description: "Failed to fetch total job count. Please try again later.",
        variant: "destructive",
      });
    }
  };

  const fetchJobs = async () => {
    try {
      console.log("Fetching jobs with filters:", filters, "page:", page);
      
      // Only show loading state for initial load or filter changes
      if (page === 0) {
        setLoading(true);
      }

      const query = buildQuery()
        .order('posted_date', { ascending: false, nullsFirst: false })
        .order('salary_range', { nullsFirst: false })
        .order('min_experience', { ascending: true })
        .range(page * JOBS_PER_PAGE, (page + 1) * JOBS_PER_PAGE - 1);

      const { data, error } = await query;

      if (error) {
        console.error("Query error:", error);
        throw error;
      }

      console.log("Fetched jobs:", data?.length || 0, "jobs");
      
      if (data && data.length < JOBS_PER_PAGE) {
        setHasMore(false);
      }

      if (page === 0) {
        setJobs(data || []);
      } else {
        setJobs(prevJobs => [...prevJobs, ...(data || [])]);
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
      toast({
        title: "Error",
        description: "Failed to fetch jobs. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setJobs([]);
    setPage(0);
    setHasMore(true);
    fetchTotalCount();
  }, [filters]);

  useEffect(() => {
    fetchJobs();
  }, [filters, page]);

  return { jobs, loading, hasMore, totalJobs, setPage };
};