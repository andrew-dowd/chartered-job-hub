import { Badge } from "@/components/ui/badge";
import { File, Globe } from "lucide-react";

interface JobCardBadgesProps {
  minExperience?: number | null;
  locationCategory?: string;
}

export const JobCardBadges = ({ minExperience, locationCategory }: JobCardBadgesProps) => {
  if (!minExperience && !locationCategory) return null;

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
    </div>
  );
};