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
  salary_min: number | null;
  salary_max: number | null;
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
      const { data, error } = await supabase
        .from("saved_jobs")
        .select(`
          job_id,
          jobs (
            id,
            title,
            company,
            location,
            salary_min,
            salary_max,
            description,
            job_url,
            created_at,
            min_experience,
            location_category,
            reasoning
          )
        `)
        .eq("user_id", userId);

      if (error) {
        console.error("Error fetching saved jobs:", error);
        return;
      }

      // Transform the data to match the SavedJob interface
      const transformedJobs = data
        .map((item: any) => ({
          id: item.jobs.id,
          title: item.jobs.title,
          company: item.jobs.company,
          location: item.jobs.location,
          salary_min: item.jobs.salary_min,
          salary_max: item.jobs.salary_max,
          description: item.jobs.description,
          job_url: item.jobs.job_url,
          created_at: item.jobs.created_at,
          min_experience: item.jobs.min_experience,
          location_category: item.jobs.location_category,
          reasoning: item.jobs.reasoning,
        }))
        .filter((job: any) => job.id); // Filter out any null jobs

      console.log("Fetched saved jobs:", transformedJobs.length);
      setSavedJobs(transformedJobs);
      setLoading(false);
    } catch (error) {
      console.error("Error in fetchSavedJobs:", error);
      setLoading(false);
    }
  };

  const handleBackToJobs = () => {
    navigate("/");
  };

  // This function will be passed to JobCard to handle state updates
  const onJobUnsaved = (title: string, company: string) => {
    setSavedJobs((current) =>
      current.filter((job) => !(job.title === title && job.company === company))
    );
  };

  if (loading) {
    return (
      <div className="min-h-[50vh] bg-gray-50 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-[50vh] bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center gap-4 mb-6">
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
          <div className="text-center py-8">
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
                salary={`${job.salary_min ? `$${job.salary_min}` : ''} ${
                  job.salary_max ? `- $${job.salary_max}` : ''
                }`}
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
    </div>
  );
};

export default SavedJobs;