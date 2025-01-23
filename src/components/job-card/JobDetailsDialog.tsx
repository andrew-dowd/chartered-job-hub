import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { BookmarkPlus, BookmarkCheck } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { JobDialogHeader } from "./dialog/JobDialogHeader";
import { JobDialogCompanyInfo } from "./dialog/JobDialogCompanyInfo";
import { JobDialogBadges } from "./dialog/JobDialogBadges";
import { JobDialogContent } from "./dialog/JobDialogContent";
import { JobDialogMetrics } from "./dialog/JobDialogMetrics";
import { JobDialogActions } from "./dialog/JobDialogActions";

interface JobDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSaveStateChange?: (saved: boolean) => void;
  job: {
    id: string;
    title: string;
    company: string;
    location: string;
    salary: string;
    description: string;
    responsibilities?: string;
    perks?: string;
    minExperience?: number | null;
    locationCategory?: string;
    routine?: string | null;
    industry?: string;
    employmentType?: string;
    qualification?: string;
    reasoning?: string;
    other_key_experience?: string;
    applyUrl: string;
    postedDate?: string;
    intensity?: string | null;
  };
}

export const JobDetailsDialog = ({
  open,
  onOpenChange,
  onSaveStateChange,
  job,
}: JobDetailsDialogProps) => {
  const [saved, setSaved] = useState(false);
  const [session, setSession] = useState(null);
  const navigate = useNavigate();
  const { toast } = useToast();

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
  }, [job.id]);

  const checkIfSaved = async (userId: string) => {
    const { data, error } = await supabase
      .from("saved_jobs")
      .select("id")
      .eq("user_id", userId)
      .eq("job_id", job.id)
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
      onOpenChange(false);
      navigate("/auth");
      return;
    }

    try {
      if (saved) {
        const { error } = await supabase
          .from("saved_jobs")
          .delete()
          .eq("user_id", session.user.id)
          .eq("job_id", job.id);

        if (error) throw error;

        setSaved(false);
        if (onSaveStateChange) onSaveStateChange(false);
        
        toast({
          title: "Job removed from saved jobs",
          description: "You can always save it again later",
        });
        onOpenChange(false);
      } else {
        const { error } = await supabase
          .from("saved_jobs")
          .insert([{
            user_id: session.user.id,
            job_id: job.id,
          }]);

        if (error) {
          // Check if it's a duplicate error
          if (error.code === '23505') {
            console.log("Job already saved:", error);
            // Update the UI state to reflect that the job is saved
            setSaved(true);
            if (onSaveStateChange) onSaveStateChange(true);
            toast({
              title: "Job already saved",
              description: "This job is already in your saved jobs",
            });
            onOpenChange(false);
            return;
          }
          throw error;
        }

        setSaved(true);
        if (onSaveStateChange) onSaveStateChange(true);
        
        toast({
          title: "Job saved successfully",
          description: "Check your saved jobs to apply later",
        });
        onOpenChange(false);
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="space-y-6">
          <div className="flex items-start justify-between gap-4 pr-12">
            <div className="space-y-4 flex-grow">
              <JobDialogHeader
                title={job.title}
                postedDate={job.postedDate}
              />
              
              <JobDialogCompanyInfo
                company={job.company}
                location={job.location}
                salary={job.salary}
              />

              <JobDialogBadges
                minExperience={job.minExperience}
                routine={job.routine}
              />
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={(e) => {
                e.preventDefault();
                handleSave();
              }}
              className={`${
                saved 
                  ? "bg-primary/10 text-primary border-primary hover:bg-primary/20" 
                  : "border-gray-200 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              } flex-shrink-0`}
              title={saved ? "Remove from saved jobs" : "Save job"}
            >
              {saved ? <BookmarkCheck className="w-4 h-4" /> : <BookmarkPlus className="w-4 h-4" />}
            </Button>
          </div>

          <JobDialogContent
            reasoning={job.reasoning}
            responsibilities={job.responsibilities}
            other_key_experience={job.other_key_experience}
            perks={job.perks}
          />

          <JobDialogMetrics
            qualification={job.qualification}
            employmentType={job.employmentType}
            routine={job.routine}
            intensity={job.intensity}
          />

          <JobDialogActions
            onClose={() => onOpenChange(false)}
            applyUrl={job.applyUrl}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};