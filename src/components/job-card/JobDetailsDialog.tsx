import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Building2, MapPin, Banknote, Briefcase, Calendar, Globe } from "lucide-react";

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
    applyUrl,
  } = job;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
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
              <Badge variant="secondary">
                <Briefcase className="w-3 h-3 mr-1" />
                {minExperience}+ YOE
              </Badge>
            )}
            {locationCategory && (
              <Badge variant="secondary">
                <Globe className="w-3 h-3 mr-1" />
                {locationCategory}
              </Badge>
            )}
            {routine && (
              <Badge variant="secondary">
                <Calendar className="w-3 h-3 mr-1" />
                {routine}
              </Badge>
            )}
            {industry && (
              <Badge variant="secondary">
                {industry}
              </Badge>
            )}
            {employmentType && (
              <Badge variant="secondary">
                {employmentType}
              </Badge>
            )}
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <p className="text-gray-600 whitespace-pre-line">{description}</p>
          </div>

          {/* Responsibilities */}
          {responsibilities && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Responsibilities</h3>
              <p className="text-gray-600 whitespace-pre-line">{responsibilities}</p>
            </div>
          )}

          {/* Perks */}
          {perks && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Perks & Benefits</h3>
              <p className="text-gray-600 whitespace-pre-line">{perks}</p>
            </div>
          )}

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