import { useEffect, useState } from "react";
import { JobCard } from "@/components/JobCard";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Loader2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SavedJob {
  id: string;
  title: string;
  company: string;
  location: string;
  salary_range: string | null;
  description: string;
  job_url: string;
  created_at: string;
  min_experience: number | null;
  location_category: string | null;
  reasoning: string | null;
}

const SavedJobs = () => {
  const [savedJobs, setSavedJobs] = useState<SavedJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      console.log("Initial session check:", currentSession?.user?.email);
      setSession(currentSession);
      if (!currentSession) {
        navigate("/auth");
      } else {
        fetchSavedJobs(currentSession.user.id);
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      console.log("Auth state changed:", _event, newSession?.user?.email);
      setSession(newSession);
      if (!newSession) {
        navigate("/auth");
      } else {
        fetchSavedJobs(newSession.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const fetchSavedJobs = async (userId: string) => {
    try {
      const { data: savedJobsData, error } = await supabase
        .from('saved_jobs')
        .select(`
          job_id,
          jobs (
            id,
            title,
            company,
            location,
            salary_range,
            description,
            job_url,
            created_at,
            min_experience,
            location_category,
            reasoning
          )
        `)
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error("Error fetching saved jobs:", error);
        return;
      }

      const formattedJobs = savedJobsData
        .map(record => record.jobs)
        .filter(job => job !== null);

      console.log("Fetched saved jobs:", formattedJobs?.length);
      setSavedJobs(formattedJobs || []);
      setLoading(false);
    } catch (error) {
      console.error("Error in fetchSavedJobs:", error);
      setLoading(false);
    }
  };

  const handleBackToJobs = () => {
    navigate("/");
  };

  const onJobUnsaved = (jobId: string) => {
    setSavedJobs((current) =>
      current.filter((job) => job.id !== jobId)
    );
  };

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          onClick={handleBackToJobs}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Jobs
        </Button>
        <h1 className="text-2xl font-bold text-gray-900">Saved Jobs</h1>
      </div>

      {savedJobs.length === 0 ? (
        <div className="bg-white rounded-lg p-6 shadow-sm border text-center">
          <p className="text-gray-600">You haven't saved any jobs yet.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {savedJobs.map((job) => (
            <JobCard
              key={job.id}
              id={job.id}
              title={job.title}
              company={job.company}
              location={job.location}
              salary={job.salary_range || ""}
              description={job.description}
              applyUrl={job.job_url}
              createdAt={job.created_at}
              onUnsave={onJobUnsaved}
              minExperience={job.min_experience}
              locationCategory={job.location_category}
              reasoning={job.reasoning}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedJobs;
