import { GraduationCap, Briefcase, CalendarClock, Gauge } from "lucide-react";

interface JobDialogMetricsProps {
  qualification?: string;
  employmentType?: string;
  routine?: string | null;
  intensity?: string | null;
}

export const JobDialogMetrics = ({
  qualification,
  employmentType,
  routine,
  intensity,
}: JobDialogMetricsProps) => {
  const formatValue = (value: string | number | null | undefined) => {
    if (value === null || value === undefined || value === 0 || value === '') {
      return "Not disclosed";
    }
    return value;
  };

  const capitalizeFirstLetter = (str: string) => {
    return str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : '';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {qualification && (
        <div className="flex items-start gap-2">
          <GraduationCap className="w-5 h-5 text-gray-500 mt-0.5" />
          <div>
            <h4 className="font-medium">Qualification</h4>
            <p className="text-sm text-gray-600">{formatValue(qualification)}</p>
          </div>
        </div>
      )}

      {employmentType && (
        <div className="flex items-start gap-2">
          <Briefcase className="w-5 h-5 text-gray-500 mt-0.5" />
          <div>
            <h4 className="font-medium">Employment Type</h4>
            <p className="text-sm text-gray-600">{formatValue(employmentType)}</p>
          </div>
        </div>
      )}

      {routine && (
        <div className="flex items-start gap-2">
          <CalendarClock className="w-5 h-5 text-gray-500 mt-0.5" />
          <div>
            <h4 className="font-medium">Work Schedule</h4>
            <p className="text-sm text-gray-600">{capitalizeFirstLetter(routine)}</p>
          </div>
        </div>
      )}

      {intensity && (
        <div className="flex items-start gap-2">
          <Gauge className="w-5 h-5 text-gray-500 mt-0.5" />
          <div>
            <h4 className="font-medium">Intensity</h4>
            <p className="text-sm text-gray-600">{formatValue(intensity)}</p>
          </div>
        </div>
      )}
    </div>
  );
};