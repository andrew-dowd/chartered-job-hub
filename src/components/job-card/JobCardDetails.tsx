import { MapPin, Building2, Banknote } from "lucide-react";

interface JobCardDetailsProps {
  company: string;
  location: string;
  salary: string;
}

export const JobCardDetails = ({ company, location, salary }: JobCardDetailsProps) => {
  const formatValue = (value: string): string => {
    if (!value || 
        value === "null" || 
        value === "undefined" || 
        value.trim() === "" || 
        value === "€0k - €0k" ||
        value.toLowerCase() === "n/a" ||
        /^€\d{2,3},\d{3}-€\d{2,3},\d{3}$/.test(value)) {
      return "Not disclosed";
    }
    return value;
  };

  return (
    <div className="space-y-2 mb-4">
      <div className="flex items-center text-gray-600">
        <Building2 className="w-4 h-4 mr-2 flex-shrink-0" />
        <span className="text-sm line-clamp-1">{formatValue(company)}</span>
      </div>
      <div className="flex items-center text-gray-600">
        <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
        <span className="text-sm line-clamp-1">{formatValue(location)}</span>
      </div>
      <div className="flex items-center text-gray-600">
        <Banknote className="w-4 h-4 mr-2 flex-shrink-0" />
        <span className="text-sm">{formatValue(salary)}</span>
      </div>
    </div>
  );
};