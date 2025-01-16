import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BookmarkPlus, MapPin, Building2, Banknote } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useSession } from "@supabase/auth-helpers-react";

interface JobCardProps {
  title: string;
  company: string;
  location: string;
  salary: string;
  description: string;
  applyUrl: string;
}

export const JobCard = ({
  title,
  company,
  location,
  salary,
  description,
  applyUrl,
}: JobCardProps) => {
  const [saved, setSaved] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const session = useSession();

  useEffect(() => {
    const checkIfSaved = async () => {
      if (session?.user) {
        const { data, error } = await supabase
          .from("saved_jobs")
          .select("id")
          .eq("user_id", session.user.id)
          .eq("title", title)
          .eq("company", company)
          .maybeSingle();

        if (data && !error) {
          setSaved(true);
        }
      }
    };

    checkIfSaved();
  }, [session, title, company]);

  const handleSave = async () => {
    if (!session) {
      toast({
        title: "Authentication required",
        description: "Please sign in to save jobs",
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

  return (
    <Card className="p-6 hover:shadow-lg transition-shadow duration-200">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <div className="space-y-2">
            <div className="flex items-center text-gray-600">
              <Building2 className="w-4 h-4 mr-2" />
              <span>{company}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <MapPin className="w-4 h-4 mr-2" />
              <span>{location}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Banknote className="w-4 h-4 mr-2" />
              <span>{salary}</span>
            </div>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleSave}
          className={saved ? "text-primary" : "text-gray-400"}
        >
          <BookmarkPlus className="w-5 h-5" />
        </Button>
      </div>
      <p className="mt-4 text-gray-600 line-clamp-2">{description}</p>
      <div className="mt-6 flex justify-end">
        <Button asChild>
          <a href={applyUrl} target="_blank" rel="noopener noreferrer">
            Apply Now
          </a>
        </Button>
      </div>
    </Card>
  );
};