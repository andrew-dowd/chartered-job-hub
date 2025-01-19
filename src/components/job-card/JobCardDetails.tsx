import { MapPin, Building2, Banknote } from "lucide-react";

interface JobCardDetailsProps {
  company: string;
  location: string;
  salary: string;
}

export const JobCardDetails = ({ company, location, salary }: JobCardDetailsProps) => {
  const displaySalary = salary && 
    salary !== "null" && 
    salary !== "undefined" && 
    salary.trim() !== "" && 
    salary !== "€0k - €0k"
      ? salary 
      : "Not disclosed";

  return (
    <div className="space-y-2 mb-4">
      <div className="flex items-center text-gray-600">
        <Building2 className="w-4 h-4 mr-2 flex-shrink-0" />
        <span className="text-sm line-clamp-1">{company}</span>
      </div>
      <div className="flex items-center text-gray-600">
        <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
        <span className="text-sm line-clamp-1">{location}</span>
      </div>
      <div className="flex items-center text-gray-600">
        <Banknote className="w-4 h-4 mr-2 flex-shrink-0" />
        <span className="text-sm">{displaySalary}</span>
      </div>
    </div>
  );
};