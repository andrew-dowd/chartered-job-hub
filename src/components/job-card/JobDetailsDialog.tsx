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
  Star,
  FileText,
  GraduationCap,
  Building,
  Clock
} from "lucide-react";

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
    otherKeyExperience?: string;
    applyUrl: string;
  };
}

export const JobDetailsDialog = ({ open, onOpenChange, job }: JobDetailsDialogProps) => {
  const {
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
    otherKeyExperience,
    applyUrl,
  } = job;

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
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">{title}</DialogTitle>
          <div className="flex items-center gap-2 text-gray-600 mt-2">
            <Building2 className="w-4 h-4" />
            <span>{company}</span>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Key Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center text-gray-600">
              <MapPin className="w-4 h-4 mr-2" />
              <span>{location}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Banknote className="w-4 h-4 mr-2" />
              <span>{salary}</span>
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
                {routine}
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

          {/* Main Content */}
          <div className="space-y-6 border-t pt-6">
            {renderSection("Why This Role Matters", reasoning, <Star className="w-5 h-5 text-primary" />)}
            {renderSection("Key Experience", otherKeyExperience, <Briefcase className="w-5 h-5 text-primary" />)}
            {renderSection("Responsibilities", responsibilities, <ListChecks className="w-5 h-5 text-primary" />)}
            {renderSection("Perks & Benefits", perks, <Gift className="w-5 h-5 text-primary" />)}
            {renderSection("Full Description", description, <FileText className="w-5 h-5 text-primary" />)}
          </div>

          {/* Apply Button */}
          <div className="pt-4">
            <Button 
              asChild
              className="w-full"
            >
              <a href={applyUrl} target="_blank" rel="noopener noreferrer">
                Apply Now
              </a>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};