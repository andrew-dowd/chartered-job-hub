import { Button } from "@/components/ui/button";
import { BriefcaseIcon, BookmarkPlus, BookmarkCheck } from "lucide-react";

interface JobDialogActionsProps {
  onSave: () => void;
  saved: boolean;
  applyUrl: string;
}

export const JobDialogActions = ({ onSave, saved, applyUrl }: JobDialogActionsProps) => {
  return (
    <div className="flex justify-end gap-3">
      <Button
        variant="outline"
        size="icon"
        onClick={(e) => {
          e.preventDefault();
          onSave();
        }}
        className={`${
          saved 
            ? "bg-primary/10 text-primary border-primary hover:bg-primary/20" 
            : "border-gray-200 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
        } flex-shrink-0`}
        title={saved ? "Remove from saved jobs" : "Save job"}
      >
        {saved ? <BookmarkCheck className="w-4 h-4" /> : <BookmarkPlus className="w-4 h-4" />}
      </Button>
      <Button
        asChild
        className="gap-2"
      >
        <a href={applyUrl} target="_blank" rel="noopener noreferrer">
          Apply Now
          <BriefcaseIcon className="w-4 h-4" />
        </a>
      </Button>
    </div>
  );
};