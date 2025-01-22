import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Building2, 
  MapPin, 
  Banknote, 
  Briefcase, 
  Calendar, 
  Globe,
  ListChecks,
  Gift,
  FileText,
  GraduationCap,
  Building,
  Clock,
  BookmarkPlus,
  Star
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface JobDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  job: {
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
    id?: string;
  };
}

export const JobDetailsDialog = ({ open, onOpenChange, job }: JobDetailsDialogProps) => {
  const [session, setSession] = useState(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  const [saved, setSaved] = useState(false);

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
  } = job;

  const timeAgo = postedDate ? formatDistanceToNow(new Date(postedDate), { addSuffix: true }) : "Recently";

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

  const capitalizeFirstLetter = (str: string) => {
    return str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : '';
  };

  const renderSection = (title: string, content: string | undefined, icon: React.ReactNode) => {
    if (!content) return null;
    return (
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-lg font-semibold text-gray-900">
          {icon}
          <h3>{title}</h3>
        </div>
        <p className="text-gray-600 whitespace-pre-line pl-6">{content}</p>
      </div>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Clock className="w-4 h-4" />
              <span>{timeAgo}</span>
            </div>
            
            <div className="space-y-2">
              <DialogTitle className="text-3xl font-bold text-gray-900">{title}</DialogTitle>
              <div className="flex items-center gap-2 text-xl font-semibold text-gray-700">
                <Building2 className="w-5 h-5" />
                <span>{company}</span>
              </div>
            </div>

            {/* Key Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center text-gray-600">
                <MapPin className="w-5 h-5 mr-2" />
                <span className="text-lg">{location}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Banknote className="w-5 h-5 mr-2" />
                <span className="text-lg">{salary}</span>
              </div>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-2">
              {minExperience && (
                <Badge variant="secondary" className="text-sm">
                  <Briefcase className="w-3 h-3 mr-1" />
                  {minExperience}+ YOE
                </Badge>
              )}
              {locationCategory && (
                <Badge variant="secondary" className="text-sm">
                  <Globe className="w-3 h-3 mr-1" />
                  {locationCategory}
                </Badge>
              )}
              {routine && (
                <Badge variant="secondary" className="text-sm">
                  <Clock className="w-3 h-3 mr-1" />
                  {capitalizeFirstLetter(routine)}
                </Badge>
              )}
              {industry && (
                <Badge variant="secondary" className="text-sm">
                  <Building className="w-3 h-3 mr-1" />
                  {industry}
                </Badge>
              )}
              {employmentType && (
                <Badge variant="secondary" className="text-sm">
                  <Calendar className="w-3 h-3 mr-1" />
                  {employmentType}
                </Badge>
              )}
              {qualification && (
                <Badge variant="secondary" className="text-sm">
                  <GraduationCap className="w-3 h-3 mr-1" />
                  {qualification}
                </Badge>
              )}
            </div>
          </div>
        </DialogHeader>

        {/* Main Content */}
        <div className="space-y-8 py-6">
          {renderSection("Requirements Summary", reasoning, <Star className="w-5 h-5 text-primary" />)}
          {renderSection("Other Experience", other_key_experience, <Briefcase className="w-5 h-5 text-primary" />)}
          {renderSection("Responsibilities", responsibilities, <ListChecks className="w-5 h-5 text-primary" />)}
          {renderSection("Perks", perks, <Gift className="w-5 h-5 text-primary" />)}
        </div>

        {/* Fixed bottom section */}
        <div className="sticky bottom-0 bg-white p-6 border-t mt-auto -mx-6 -mb-6">
          <div className="space-y-6">
            {description && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-lg font-semibold text-gray-900">
                  <FileText className="w-5 h-5 text-primary" />
                  <h3>Full Description</h3>
                </div>
                <p className="text-gray-600 whitespace-pre-line">{description}</p>
              </div>
            )}
            
            <div className="flex gap-4">
              <Button 
                asChild
                className="flex-1"
              >
                <a href={applyUrl} target="_blank" rel="noopener noreferrer">
                  Apply Now
                </a>
              </Button>
              <Button
                variant="outline"
                onClick={handleSave}
                className="flex-1"
              >
                <BookmarkPlus className="w-4 h-4 mr-2" />
                Save Job
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};