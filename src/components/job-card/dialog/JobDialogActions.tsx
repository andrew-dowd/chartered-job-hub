import { Button } from "@/components/ui/button";
import { BriefcaseIcon } from "lucide-react";

interface JobDialogActionsProps {
  onClose: () => void;
  applyUrl: string;
}

export const JobDialogActions = ({ onClose, applyUrl }: JobDialogActionsProps) => {
  return (
    <div className="flex justify-end gap-3">
      <Button
        variant="outline"
        onClick={onClose}
      >
        Close
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