import { formatDistanceToNow } from "date-fns";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, MapPin, Building2, Banknote, GraduationCap, Calendar, Briefcase } from "lucide-react";
import { Job } from "@/types/job";

interface JobDetailsDialogProps {
  job: Job;
  trigger?: React.ReactNode;
}

export const JobDetailsDialog = ({ job, trigger }: JobDetailsDialogProps) => {
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
    other_key_experience,
    applyUrl,
    postedDate,
  } = job;

  const displaySalary = salary && 
    salary !== "null" && 
    salary !== "undefined" && 
    salary.trim() !== "" && 
    salary !== "€0k - €0k" &&
    salary !== "€0 - €0"
      ? salary 
      : "Not disclosed";

  const timeAgo = postedDate ? formatDistanceToNow(new Date(postedDate), { addSuffix: true }) : "Recently";

  const handleApply = () => {
    if (applyUrl) {
      // Ensure the URL is properly formatted
      const url = applyUrl.startsWith('http') ? applyUrl : `https://${applyUrl}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <Dialog>
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
                <span className="text-lg">{displaySalary}</span>
              </div>
            </div>

            {/* Tags Section */}
            <div className="flex flex-wrap gap-2">
              {locationCategory && (
                <Badge variant="secondary">
                  <MapPin className="w-3 h-3 mr-1" />
                  {locationCategory}
                </Badge>
              )}
              {minExperience && (
                <Badge variant="secondary">
                  <Briefcase className="w-3 h-3 mr-1" />
                  {minExperience}+ years
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
              {employmentType && (
                <Badge variant="secondary">
                  <Briefcase className="w-3 h-3 mr-1" />
                  {employmentType}
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
