import { formatDistanceToNow } from "date-fns";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, MapPin, Building2, Banknote, GraduationCap, Calendar, Briefcase } from "lucide-react";
import { Job } from "@/types/job";

interface JobDetailsDialogProps {
  job: Job;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: React.ReactNode;
}

export const JobDetailsDialog = ({ job, open, onOpenChange, trigger }: JobDetailsDialogProps) => {
  const {
    title,
    company,
    location,
    salary,
    salary_range,
    description,
    responsibilities,
    perks,
    min_experience,
    minExperience,
    location_category,
    locationCategory,
    routine,
    industry,
    employment_type,
    employmentType,
    qualification,
    reasoning,
    other_key_experience,
    job_url,
    applyUrl,
    posted_date,
    postedDate,
  } = job;

  const displaySalary = salary || salary_range;
  const effectiveSalary = displaySalary && 
    displaySalary !== "null" && 
    displaySalary !== "undefined" && 
    displaySalary.trim() !== "" && 
    displaySalary !== "€0k - €0k" &&
    displaySalary !== "€0 - €0"
      ? displaySalary 
      : "Not disclosed";

  const effectiveLocationCategory = locationCategory || location_category;
  const effectiveMinExperience = minExperience || min_experience;
  const effectiveEmploymentType = employmentType || employment_type;
  const effectivePostedDate = postedDate || posted_date;
  const effectiveApplyUrl = applyUrl || job_url;

  const timeAgo = effectivePostedDate ? formatDistanceToNow(new Date(effectivePostedDate), { addSuffix: true }) : "Recently";

  const handleApply = () => {
    if (effectiveApplyUrl) {
      // Ensure the URL is properly formatted
      const url = effectiveApplyUrl.startsWith('http') ? effectiveApplyUrl : `https://${effectiveApplyUrl}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" className="w-full">
            View Details
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="space-y-6">
          {/* Header Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
                <p className="text-gray-500">Posted {timeAgo}</p>
              </div>
              <Button onClick={handleApply} className="shrink-0">
                Apply Now
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </div>

            {/* Company and Location Info */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex items-center text-gray-600">
                <Building2 className="w-5 h-5 mr-2" />
                <span className="text-lg">{company}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <MapPin className="w-5 h-5 mr-2" />
                <span className="text-lg">{location}</span>
              </div>
            </div>

            {/* Salary Info */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex items-center text-gray-600">
                <Banknote className="w-5 h-5 mr-2" />
                <span className="text-lg">{effectiveSalary}</span>
              </div>
            </div>

            {/* Tags Section */}
            <div className="flex flex-wrap gap-2">
              {effectiveLocationCategory && (
                <Badge variant="secondary">
                  <MapPin className="w-3 h-3 mr-1" />
                  {effectiveLocationCategory}
                </Badge>
              )}
              {effectiveMinExperience && (
                <Badge variant="secondary">
                  <Briefcase className="w-3 h-3 mr-1" />
                  {effectiveMinExperience}+ years
                </Badge>
              )}
              {qualification && qualification !== "n/a" && (
                <Badge variant="secondary">
                  <GraduationCap className="w-3 h-3 mr-1" />
                  {qualification}
                </Badge>
              )}
              {routine && (
                <Badge variant="secondary">
                  <Calendar className="w-3 h-3 mr-1" />
                  {routine}
                </Badge>
              )}
              {effectiveEmploymentType && (
                <Badge variant="secondary">
                  <Briefcase className="w-3 h-3 mr-1" />
                  {effectiveEmploymentType}
                </Badge>
              )}
            </div>
          </div>

          {/* Description Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Job Description</h3>
            <div className="text-gray-700 whitespace-pre-wrap">{description}</div>
          </div>

          {/* Requirements Summary */}
          {reasoning && (
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Requirements Summary</h3>
              <p className="text-gray-700">{reasoning}</p>
            </div>
          )}

          {/* Responsibilities Section */}
          {responsibilities && (
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Key Responsibilities</h3>
              <p className="text-gray-700">{responsibilities}</p>
            </div>
          )}

          {/* Other Experience Section */}
          {other_key_experience && (
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Other Experience</h3>
              <p className="text-gray-700">{other_key_experience}</p>
            </div>
          )}

          {/* Perks Section */}
          {perks && (
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Perks</h3>
              <p className="text-gray-700">{perks}</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};