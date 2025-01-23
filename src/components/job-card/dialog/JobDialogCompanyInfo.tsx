import { Building2, MapPin, BriefcaseIcon } from "lucide-react";

interface JobDialogCompanyInfoProps {
  company: string;
  location: string;
  salary: string;
}

export const JobDialogCompanyInfo = ({
  company,
  location,
  salary,
}: JobDialogCompanyInfoProps) => {
  const formatValue = (value: string | number | null | undefined) => {
    if (
      value === null || 
      value === undefined || 
      value === 0 || 
      value === '' || 
      value === 'null' || 
      value === 'undefined' ||
      value === '€0k - €0k' ||
      value.toString().toLowerCase() === 'n/a' ||
      value.toString().trim() === ''
    ) {
      return "Not disclosed";
    }
    return value;
  };

  return (
    <div className="flex flex-wrap gap-4 text-gray-600">
      <div className="flex items-center gap-1.5">
        <Building2 className="w-4 h-4" />
        <span>{formatValue(company)}</span>
      </div>
      <div className="flex items-center gap-1.5">
        <MapPin className="w-4 h-4" />
        <span>{formatValue(location)}</span>
      </div>
      <div className="flex items-center gap-1.5">
        <BriefcaseIcon className="w-4 h-4" />
        <span>{formatValue(salary)}</span>
      </div>
    </div>
  );
};