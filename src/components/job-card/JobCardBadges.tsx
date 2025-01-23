import { Badge } from "@/components/ui/badge";
import { Briefcase, Calendar, Globe } from "lucide-react";

interface JobCardBadgesProps {
  minExperience?: number | null;
  locationCategory?: string;
  routine?: string | null;
}

export const JobCardBadges = ({ minExperience, locationCategory, routine }: JobCardBadgesProps) => {
  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const shouldShowValue = (value: string | null | undefined): boolean => {
    if (!value) return false;
    return !['n/a', 'N/a', 'N/A', 'n/A'].includes(value);
  };

  const hasAnyValidBadge = 
    (minExperience !== null && minExperience !== undefined) ||
    shouldShowValue(locationCategory) ||
    shouldShowValue(routine);

  if (!hasAnyValidBadge) return null;

  return (
    <div className="flex gap-2 mb-4">
      {minExperience !== null && minExperience !== undefined && (
        <Badge variant="secondary" className="text-xs">
          <Briefcase className="w-3 h-3 mr-1" />
          {minExperience}+ YOE
        </Badge>
      )}
      {shouldShowValue(locationCategory) && (
        <Badge variant="secondary" className="text-xs">
          <Globe className="w-3 h-3 mr-1" />
          {locationCategory}
        </Badge>
      )}
      {shouldShowValue(routine) && (
        <Badge variant="secondary" className="text-xs">
          <Calendar className="w-3 h-3 mr-1" />
          {capitalizeFirstLetter(routine)}
        </Badge>
      )}
    </div>
  );
};