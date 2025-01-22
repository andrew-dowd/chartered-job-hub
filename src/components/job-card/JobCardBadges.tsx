import { Badge } from "@/components/ui/badge";
import { Calendar, Globe } from "lucide-react";

interface JobCardBadgesProps {
  minExperience?: number | null;
  locationCategory?: string;
  routine?: string | null;
}

export const JobCardBadges = ({ minExperience, locationCategory, routine }: JobCardBadgesProps) => {
  if (!minExperience && !locationCategory && !routine) return null;

  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  return (
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
      {routine && (
        <Badge variant="secondary" className="text-xs">
          <Calendar className="w-3 h-3 mr-1" />
          {capitalizeFirstLetter(routine)}
        </Badge>
      )}
    </div>
  );
};