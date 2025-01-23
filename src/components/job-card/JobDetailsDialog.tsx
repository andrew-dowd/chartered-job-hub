import { Dialog, DialogContent } from "@/components/ui/dialog";
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
  initialSaved?: boolean;
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
  initialSaved = false,
  job,
}: JobDetailsDialogProps) => {
  const [saved, setSaved] = useState(initialSaved);
  const [session, setSession] = useState(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    setSaved(initialSaved);
  }, [initialSaved]);

  useEffect(() => {
    // Check for pending job save in localStorage
    const checkPendingSave = async (currentSession) => {
      if (currentSession?.user) {
        const pendingJobId = localStorage.getItem('pendingJobSave');
        if (pendingJobId === job.id) {
          console.log('Found pending job save in dialog:', pendingJobId);
          await handleSave(true);
          localStorage.removeItem('pendingJobSave');
        }
      }
    };

    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      if (currentSession?.user) {
        checkIfSaved(currentSession.user.id);
        checkPendingSave(currentSession);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      if (newSession?.user) {
        checkIfSaved(newSession.user.id);
        checkPendingSave(newSession);
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

  const handleSave = async (skipAuthCheck = false) => {
    if (!session?.user && !skipAuthCheck) {
      // Store the job ID before redirecting
      localStorage.setItem('pendingJobSave', job.id);
      console.log('Storing pending job save in dialog:', job.id);
      
      onOpenChange(false); // Close the dialog
      toast({
        title: "Sign in required",
        description: "Please sign in or create an account to save jobs",
      });
      navigate("/auth");
      return;
    }

    if (!session?.user) {
      console.log('No user session available');
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
      } else {
        const { error } = await supabase
          .from("saved_jobs")
          .insert([{
            user_id: session.user.id,
            job_id: job.id,
          }]);

        if (error) {
          if (error.code === '23505') {
            console.log("Job already saved:", error);
            setSaved(true);
            if (onSaveStateChange) onSaveStateChange(true);
            toast({
              title: "Job already saved",
              description: "This job is already in your saved jobs",
            });
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
          <div className="space-y-4">
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
            saved={saved}
            onSave={handleSave}
            applyUrl={job.applyUrl}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};