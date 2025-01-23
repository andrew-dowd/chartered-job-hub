import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { JobCardHeader } from "./job-card/JobCardHeader";
import { JobCardDetails } from "./job-card/JobCardDetails";
import { JobCardBadges } from "./job-card/JobCardBadges";
import { JobDetailsDialog } from "./job-card/JobDetailsDialog";

interface JobCardProps {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  description: string;
  reasoning?: string;
  applyUrl: string;
  createdAt?: string;
  postedDate?: string;
  onUnsave?: (jobId: string) => void;
  minExperience?: number | null;
  locationCategory?: string;
  routine?: string | null;
  responsibilities?: string;
  perks?: string;
  industry?: string;
  employmentType?: string;
  qualification?: string;
  other_key_experience?: string;
  onSaveStateChange?: (saved: boolean) => void;
}

export const JobCard = ({
  id,
  title,
  company,
  location,
  salary,
  description,
  reasoning,
  applyUrl,
  createdAt,
  postedDate,
  onUnsave,
  minExperience,
  locationCategory,
  routine,
  responsibilities,
  perks,
  industry,
  employmentType,
  qualification,
  other_key_experience,
  onSaveStateChange,
}: JobCardProps) => {
  const [saved, setSaved] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      if (currentSession?.user) {
        checkIfSaved(currentSession.user.id);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      if (newSession?.user) {
        checkIfSaved(newSession.user.id);
      } else {
        setSaved(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkIfSaved = async (userId: string) => {
    const { data, error } = await supabase
      .from("saved_jobs")
      .select("id")
      .eq("user_id", userId)
      .eq("job_id", id)
      .maybeSingle();

    if (data && !error) {
      setSaved(true);
    }
  };

  const handleSave = async () => {
    if (!session) {
      toast({
        title: "Sign in required",
        description: "Please sign in or create an account to save jobs",
      });
      navigate("/auth");
      return;
    }

    try {
      if (saved) {
        const { error } = await supabase
          .from("saved_jobs")
          .delete()
          .eq("user_id", session.user.id)
          .eq("job_id", id);

        if (error) throw error;

        setSaved(false);
        if (onSaveStateChange) onSaveStateChange(false);
        
        toast({
          title: "Job removed from saved jobs",
          description: "You can always save it again later",
        });
        
        if (onUnsave) {
          onUnsave(id);
        }
      } else {
        const { error } = await supabase
          .from("saved_jobs")
          .insert([{
            user_id: session.user.id,
            job_id: id,
          }]);

        if (error) throw error;

        setSaved(true);
        if (onSaveStateChange) onSaveStateChange(true);
        
        toast({
          title: "Job saved successfully",
          description: "Check your saved jobs to apply later",
        });
      }
    } catch (error) {
      console.error("Error saving job:", error);
      toast({
        title: "Error",
        description: "There was an error saving the job. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Card 
        className="h-full hover:shadow-lg transition-shadow duration-200 bg-white cursor-pointer"
        onClick={() => setDialogOpen(true)}
      >
        <div className="p-5 flex flex-col h-full">
          <JobCardHeader
            title={title}
            createdAt={createdAt}
            postedDate={postedDate}
            saved={saved}
            onSave={(e) => {
              e.stopPropagation();
              handleSave();
            }}
          />

          <JobCardDetails
            company={company}
            location={location}
            salary={salary}
          />

          <JobCardBadges
            minExperience={minExperience}
            locationCategory={locationCategory}
            routine={routine}
          />

          <p className="text-sm text-gray-600 mb-4 flex-grow line-clamp-3">
            {reasoning || description}
          </p>

          <div className="mt-auto">
            <Button 
              asChild
              variant="outline"
              className="w-full border-gray-200 hover:bg-gray-100 hover:border-gray-300 hover:text-gray-900 text-gray-700 font-medium transition-all duration-200"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <a href={applyUrl} target="_blank" rel="noopener noreferrer">
                Apply Now
              </a>
            </Button>
          </div>
        </div>
      </Card>

      <JobDetailsDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSaveStateChange={(newSavedState) => {
          setSaved(newSavedState);
          if (onSaveStateChange) onSaveStateChange(newSavedState);
        }}
        job={{
          title,
          company,
          location,
          salary,
          description,
          responsibilities,
          perks,
          minExperience,
          locationCategory,
          routine,
          industry,
          employmentType,
          qualification,
          reasoning,
          other_key_experience,
          applyUrl,
          postedDate,
          id,
        }}
      />
    </>
  );
};

export default JobCard;
