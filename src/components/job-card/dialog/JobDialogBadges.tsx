import { Badge } from "@/components/ui/badge";

interface JobDialogBadgesProps {
  minExperience?: number | null;
  routine?: string | null;
}

export const JobDialogBadges = ({
  minExperience,
  routine,
}: JobDialogBadgesProps) => {
  const capitalizeFirstLetter = (str: string) => {
    return str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : '';
  };

  return (
    <div className="flex flex-wrap gap-2">
      {minExperience !== null && minExperience !== undefined && minExperience > 0 && (
        <Badge variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-200">
          {minExperience}+ years experience
        </Badge>
      )}
      {routine && (
        <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-200">
          {capitalizeFirstLetter(routine)}
        </Badge>
      )}
    </div>
  );
};