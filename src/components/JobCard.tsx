import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Bookmark, ExternalLink } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface JobCardProps {
  id?: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  description: string;
  applyUrl: string;
  createdAt: string;
  onUnsave?: (title: string, company: string) => void;
  minExperience?: number | null;
  locationCategory?: string | null;
  reasoning?: string | null;
}

export function JobCard({
  id,
  title,
  company,
  location,
  salary,
  description,
  applyUrl,
  createdAt,
  onUnsave,
  minExperience,
  locationCategory,
  reasoning,
}: JobCardProps) {
  const [isSaved, setIsSaved] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [savedJobId, setSavedJobId] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user?.id) {
        setUserId(session.user.id);
        checkIfJobIsSaved(session.user.id);
      }
    };
    checkAuth();
  }, [id]);

  const checkIfJobIsSaved = async (currentUserId: string) => {
    try {
      if (!id) return; // Only check if we have a job ID

      const { data, error } = await supabase
        .from("saved_jobs")
        .select("id")
        .eq("user_id", currentUserId)
        .eq("job_id", id)
        .maybeSingle();

      if (error) {
        console.error("Error checking saved job:", error);
        return;
      }

      setIsSaved(!!data);
      if (data) {
        setSavedJobId(data.id);
      }
    } catch (error) {
      console.error("Error in checkIfJobIsSaved:", error);
    }
  };

  const handleSaveToggle = async () => {
    if (!userId) {
      toast({
        title: "Authentication required",
        description: "Please sign in to save jobs",
        variant: "destructive",
      });
      return;
    }

    if (!id) {
      console.error("No job ID provided");
      return;
    }

    try {
      if (isSaved && savedJobId) {
        const { error } = await supabase
          .from("saved_jobs")
          .delete()
          .eq("id", savedJobId);

        if (error) throw error;

        setIsSaved(false);
        setSavedJobId(null);
        if (onUnsave) {
          onUnsave(title, company);
        }
        toast({
          title: "Job removed",
          description: "Job has been removed from your saved jobs",
        });
      } else {
        const { error } = await supabase.from("saved_jobs").insert({
          user_id: userId,
          job_id: id,
        });

        if (error) throw error;

        setIsSaved(true);
        toast({
          title: "Job saved",
          description: "Job has been added to your saved jobs",
        });
        // Refresh the saved job ID
        checkIfJobIsSaved(userId);
      }
    } catch (error) {
      console.error("Error toggling save status:", error);
      toast({
        title: "Error",
        description: "There was an error updating your saved jobs",
        variant: "destructive",
      });
    }
  };

  const truncateDescription = (text: string, maxLength: number = 200) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>
            <p className="text-sm text-gray-600 mb-1">{company}</p>
            <div className="flex flex-wrap gap-2 mb-2">
              <Badge variant="secondary" className="text-xs">
                {location}
              </Badge>
              {locationCategory && (
                <Badge variant="outline" className="text-xs">
                  {locationCategory}
                </Badge>
              )}
              {minExperience && (
                <Badge variant="outline" className="text-xs">
                  {minExperience}+ years
                </Badge>
              )}
              <Badge variant="secondary" className="text-xs">
                {salary}
              </Badge>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleSaveToggle}
            className={`${
              isSaved ? "text-primary" : "text-gray-400"
            } hover:text-primary`}
          >
            <Bookmark className="h-5 w-5" fill={isSaved ? "currentColor" : "none"} />
          </Button>
        </div>

        <p className="text-sm text-gray-600 mb-4">
          {truncateDescription(description)}
        </p>

        {reasoning && (
          <div className="mb-4 p-3 bg-gray-50 rounded-md">
            <p className="text-sm text-gray-600">{reasoning}</p>
          </div>
        )}

        <div className="flex justify-between items-center">
          <p className="text-xs text-gray-500">
            Posted {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
          </p>
          <Button asChild variant="outline" size="sm">
            <a
              href={applyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              Apply <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}