import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BookmarkPlus, BookmarkCheck, MapPin, Building2, Banknote, Clock } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

interface JobCardProps {
  title: string;
  company: string;
  location: string;
  salary: string;
  description: string;
  applyUrl: string;
  createdAt?: string;
  onUnsave?: (title: string, company: string) => void;
}

export const JobCard = ({
  title,
  company,
  location,
  salary,
  description,
  applyUrl,
  createdAt,
  onUnsave,
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
      .eq("title", title)
      .eq("company", company)
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
          .eq("title", title)
          .eq("company", company);

        if (error) throw error;

        setSaved(false);
        toast({
          title: "Job removed from saved jobs",
          description: "You can always save it again later",
        });
        
        if (onUnsave) {
          onUnsave(title, company);
        }
      } else {
        const { error } = await supabase.from("saved_jobs").insert([
          {
            user_id: session.user.id,
            title,
            company,
            location,
            salary,
            description,
            apply_url: applyUrl,
          },
        ]);

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

  const timeAgo = createdAt 
    ? formatDistanceToNow(new Date(createdAt), { addSuffix: true })
    : "Recently posted";

  return (
    <Card className="p-4 md:p-6 hover:shadow-lg transition-shadow duration-200 bg-white">
      <div className="flex justify-between items-start gap-4">
        <div className="space-y-3 md:space-y-4 flex-1 min-w-0">
          <div>
            <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-1 line-clamp-2">{title}</h3>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Clock className="w-4 h-4 flex-shrink-0" />
              <span>{timeAgo}</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center text-gray-600">
              <Building2 className="w-4 h-4 mr-2 flex-shrink-0" />
              <span className="text-sm truncate">{company}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
              <span className="text-sm truncate">{location}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Banknote className="w-4 h-4 mr-2 flex-shrink-0" />
              <span className="text-sm truncate">{salary}</span>
            </div>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleSave}
          className={`${saved ? "text-primary" : "text-gray-400"} flex-shrink-0`}
        >
          {saved ? <BookmarkCheck className="w-5 h-5" /> : <BookmarkPlus className="w-5 h-5" />}
        </Button>
      </div>
      <p className="mt-4 text-sm text-gray-600 line-clamp-2">{description}</p>
      <div className="mt-4 md:mt-6 flex justify-end">
        <Button 
          asChild
          className="w-full md:w-auto bg-primary hover:bg-primary/90 text-white font-medium px-6"
        >
          <a href={applyUrl} target="_blank" rel="noopener noreferrer">
            Apply Now
          </a>
        </Button>
      </div>
    </Card>
  );
};