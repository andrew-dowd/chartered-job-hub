import { useNavigate } from "react-router-dom";
import { DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { BookmarkIcon, BriefcaseIcon, Users, Mail, HelpCircle, LogIn } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const AuthenticatedMenuItems = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Error signing out:", error);
        toast({
          title: "Error signing out",
          description: error.message,
          variant: "destructive",
        });
        return;
      }
      
      toast({
        title: "Signed out successfully",
        description: "You have been signed out of your account",
      });
    } catch (error) {
      console.error("Unexpected error during sign out:", error);
      toast({
        title: "Error signing out",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    }
  };

  const handleSubscribe = () => {
    window.open("https://www.charteredjobs.ie/", "_blank", "noopener,noreferrer");
  };

  const handleJoinCommunity = () => {
    window.open("https://www.reddit.com/r/AccountantsEire/", "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <DropdownMenuItem onClick={() => navigate("/saved-jobs")} className="cursor-pointer">
        <BookmarkIcon className="mr-2 h-4 w-4" />
        Saved Jobs
      </DropdownMenuItem>
      <DropdownMenuItem onClick={() => navigate("/post-job")} className="cursor-pointer">
        <BriefcaseIcon className="mr-2 h-4 w-4" />
        Post a Job
      </DropdownMenuItem>
      <DropdownMenuItem onClick={() => navigate("/talent-network")} className="cursor-pointer">
        <Users className="mr-2 h-4 w-4" />
        Talent Network
      </DropdownMenuItem>
      <DropdownMenuItem onClick={handleSubscribe} className="cursor-pointer">
        <Mail className="mr-2 h-4 w-4" />
        Subscribe
      </DropdownMenuItem>
      <DropdownMenuItem onClick={handleJoinCommunity} className="cursor-pointer">
        <Users className="mr-2 h-4 w-4" />
        Join Community
      </DropdownMenuItem>
      <DropdownMenuItem onClick={() => navigate("/faq")} className="cursor-pointer">
        <HelpCircle className="mr-2 h-4 w-4" />
        FAQ
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-red-600">
        <LogIn className="mr-2 h-4 w-4" />
        Sign Out
      </DropdownMenuItem>
    </>
  );
};