import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { BookmarkPlus, BookmarkCheck, Building2, MapPin, BriefcaseIcon, Clock, GraduationCap, Briefcase, MapPinned, CalendarClock, Gauge } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { formatDistanceToNow } from "date-fns";

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

  const {
    id,
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
    intensity,
  } = job;

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
  }, [id]);

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
          .eq("job_id", id);

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
            job_id: id,
          }]);

        if (error) throw error;

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

  const timeAgo = postedDate
    ? formatDistanceToNow(new Date(postedDate), { addSuffix: true })
    : "Recently posted";

  const capitalizeFirstLetter = (str: string) => {
    return str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : '';
  };

  const formatValue = (value: string | number | null | undefined) => {
    if (value === null || value === undefined || value === 0 || value === '') {
      return "Not disclosed";
    }
    return value;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center text-gray-600 text-sm">
              <Clock className="w-4 h-4 mr-2" />
              <span>{timeAgo}</span>
            </div>

            <div className="flex items-start justify-between">
              <h2 className="text-2xl font-semibold">{title}</h2>
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
                } ml-2 flex-shrink-0`}
              >
                {saved ? <BookmarkCheck className="w-4 h-4" /> : <BookmarkPlus className="w-4 h-4" />}
              </Button>
            </div>

            <div className="flex flex-wrap gap-4 text-gray-600">
              <div className="flex items-center gap-1.5">
                <Building2 className="w-4 h-4" />
                <span>{company}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4" />
                <span>{location}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <BriefcaseIcon className="w-4 h-4" />
                <span>{formatValue(salary)}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {minExperience !== null && minExperience !== undefined && minExperience > 0 && (
                <Badge variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                  {minExperience}+ years experience
                </Badge>
              )}
              {routine && (
                <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-200">
                  {capitalizeFirstLetter(routine)}
                </Badge>
              )}
            </div>
          </div>

          <div className="space-y-4">
            {reasoning && (
              <div>
                <h3 className="font-semibold mb-2">Why this job is relevant:</h3>
                <p className="text-gray-600 whitespace-pre-line">{reasoning}</p>
              </div>
            )}

            {responsibilities && (
              <div>
                <h3 className="font-semibold mb-2">Responsibilities:</h3>
                <p className="text-gray-600 whitespace-pre-line">{responsibilities}</p>
              </div>
            )}

            {other_key_experience && (
              <div>
                <h3 className="font-semibold mb-2">Key Experience:</h3>
                <p className="text-gray-600 whitespace-pre-line">{other_key_experience}</p>
              </div>
            )}

            {perks && (
              <div>
                <h3 className="font-semibold mb-2">Perks & Benefits:</h3>
                <p className="text-gray-600 whitespace-pre-line">{perks}</p>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {qualification && (
              <div className="flex items-start gap-2">
                <GraduationCap className="w-5 h-5 text-gray-500 mt-0.5" />
                <div>
                  <h4 className="font-medium">Qualification</h4>
                  <p className="text-sm text-gray-600">{formatValue(qualification)}</p>
                </div>
              </div>
            )}

            {employmentType && (
              <div className="flex items-start gap-2">
                <Briefcase className="w-5 h-5 text-gray-500 mt-0.5" />
                <div>
                  <h4 className="font-medium">Employment Type</h4>
                  <p className="text-sm text-gray-600">{formatValue(employmentType)}</p>
                </div>
              </div>
            )}

            {routine && (
              <div className="flex items-start gap-2">
                <CalendarClock className="w-5 h-5 text-gray-500 mt-0.5" />
                <div>
                  <h4 className="font-medium">Work Schedule</h4>
                  <p className="text-sm text-gray-600">{capitalizeFirstLetter(routine)}</p>
                </div>
              </div>
            )}

            {intensity && (
              <div className="flex items-start gap-2">
                <Gauge className="w-5 h-5 text-gray-500 mt-0.5" />
                <div>
                  <h4 className="font-medium">Intensity</h4>
                  <p className="text-sm text-gray-600">{formatValue(intensity)}</p>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Close
            </Button>
            <Button
              asChild
              className="gap-2"
            >
              <a href={applyUrl} target="_blank" rel="noopener noreferrer">
                Apply Now
                <BriefcaseIcon className="w-4 h-4" />
              </a>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};