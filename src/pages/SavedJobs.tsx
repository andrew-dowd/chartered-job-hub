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
  salary: string;
  description: string;
  apply_url: string;
  created_at: string;
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
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching saved jobs:", error);
        return;
      }

      console.log("Fetched saved jobs:", data?.length);
      setSavedJobs(data || []);
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
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
          <div className="text-center py-12">
            <p className="text-gray-600">You haven't saved any jobs yet.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {savedJobs.map((job) => (
              <JobCard
                key={job.id}
                title={job.title}
                company={job.company}
                location={job.location}
                salary={job.salary}
                description={job.description}
                applyUrl={job.apply_url}
                createdAt={job.created_at}
                onUnsave={onJobUnsaved}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedJobs;