import { useEffect, useState } from "react";
import { JobCard } from "@/components/JobCard";
import { useSession } from "@supabase/auth-helpers-react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

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
  const session = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (!session) {
      navigate("/auth");
      return;
    }

    const fetchSavedJobs = async () => {
      const { data, error } = await supabase
        .from("saved_jobs")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching saved jobs:", error);
        return;
      }

      setSavedJobs(data || []);
      setLoading(false);
    };

    fetchSavedJobs();
  }, [session, navigate]);

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
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Saved Jobs</h1>
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
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedJobs;