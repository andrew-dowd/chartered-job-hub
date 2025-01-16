import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BookmarkPlus, MapPin, Building2, Banknote } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

interface JobCardProps {
  title: string;
  company: string;
  location: string;
  salary: string;
  description: string;
  applyUrl: string;
}

export const JobCard = ({
  title,
  company,
  location,
  salary,
  description,
  applyUrl,
}: JobCardProps) => {
  const [saved, setSaved] = useState(false);
  const { toast } = useToast();

  const handleSave = () => {
    setSaved(!saved);
    toast({
      title: saved ? "Job removed from saved jobs" : "Job saved successfully",
      description: saved ? "You can always save it again later" : "Check your saved jobs to apply later",
    });
  };

  return (
    <Card className="p-6 hover:shadow-lg transition-shadow duration-200">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <div className="space-y-2">
            <div className="flex items-center text-gray-600">
              <Building2 className="w-4 h-4 mr-2" />
              <span>{company}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <MapPin className="w-4 h-4 mr-2" />
              <span>{location}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Banknote className="w-4 h-4 mr-2" />
              <span>{salary}</span>
            </div>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleSave}
          className={saved ? "text-accent" : "text-gray-400"}
        >
          <BookmarkPlus className="w-5 h-5" />
        </Button>
      </div>
      <p className="mt-4 text-gray-600 line-clamp-2">{description}</p>
      <div className="mt-6 flex justify-end">
        <Button asChild>
          <a href={applyUrl} target="_blank" rel="noopener noreferrer">
            Apply Now
          </a>
        </Button>
      </div>
    </Card>
  );
};