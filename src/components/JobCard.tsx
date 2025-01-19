import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BookmarkPlus, BookmarkCheck, MapPin, Building2, Banknote, Clock, File, Globe } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { Badge } from "@/components/ui/badge";

interface JobCardProps {
  id: string; // Add this line
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
}: JobCardProps) => {
  const [saved, setSaved] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const [session, setSession] = useState(null);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      if (currentSession?.user) {
        checkIfSaved(currentSession.user.id);
      }
    });

    // Listen for auth changes
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

  const timeAgo = (() => {
    try {
      if (postedDate) {
        return formatDistanceToNow(new Date(postedDate), { addSuffix: true });
      }
      if (createdAt) {
        return formatDistanceToNow(new Date(createdAt), { addSuffix: true });
      }
      return "Recently posted";
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Recently posted";
    }
  })();

  const displaySalary = salary && 
    salary !== "null" && 
    salary !== "undefined" && 
    salary.trim() !== "" && 
    salary !== "€0k - €0k"
      ? salary 
      : "Not disclosed";

  return (
    <Card className="h-full hover:shadow-lg transition-shadow duration-200 bg-white">
      <div className="p-5 flex flex-col h-full">
        <div className="flex justify-between items-start mb-4">
          <div className="space-y-1.5">
            <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">{title}</h3>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Clock className="w-4 h-4" />
              <span>{timeAgo}</span>
            </div>
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={handleSave}
            className={`${
              saved 
                ? "bg-primary/10 text-primary border-primary hover:bg-primary/20" 
                : "border-gray-200 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            } ml-2 flex-shrink-0`}
          >
            {saved ? <BookmarkCheck className="w-4 h-4" /> : <BookmarkPlus className="w-4 h-4" />}
          </Button>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-600">
            <Building2 className="w-4 h-4 mr-2 flex-shrink-0" />
            <span className="text-sm line-clamp-1">{company}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
            <span className="text-sm line-clamp-1">{location}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Banknote className="w-4 h-4 mr-2 flex-shrink-0" />
            <span className="text-sm">{displaySalary}</span>
          </div>
        </div>

        <div className="flex gap-2 mb-4">
          {minExperience !== null && minExperience !== undefined && (
            <Badge variant="secondary" className="text-xs">
              <File className="w-3 h-3 mr-1" />
              {minExperience}+ YOE
            </Badge>
          )}
          {locationCategory && (
            <Badge variant="secondary" className="text-xs">
              <Globe className="w-3 h-3 mr-1" />
              {locationCategory}
            </Badge>
          )}
        </div>

        <p className="text-sm text-gray-600 mb-4 flex-grow">
          {reasoning || description}
        </p>

        <div className="mt-auto">
          <Button 
            asChild
            className="w-full bg-primary hover:bg-primary/90 text-white font-medium"
          >
            <a href={applyUrl} target="_blank" rel="noopener noreferrer">
              Apply Now
            </a>
          </Button>
        </div>
      </div>
    </Card>
  );
};