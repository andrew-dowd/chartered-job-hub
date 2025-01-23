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
        <Badge variant="secondary" className="bg-[#F1F1F1] text-gray-800 hover:bg-[#F1F1F1]/90">
          {minExperience}+
        </Badge>
      )}
      {routine && (
        <Badge variant="secondary" className="bg-[#F1F1F1] text-gray-800 hover:bg-[#F1F1F1]/90">
          {capitalizeFirstLetter(routine)}
        </Badge>
      )}
    </div>
  );
};