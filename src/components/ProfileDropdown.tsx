import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { UserCircle2, BookmarkIcon, LogOut, BriefcaseIcon, Users, Mail, HelpCircle } from "lucide-react";

export const ProfileDropdown = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Error signing out",
        description: error.message,
        variant: "destructive",
      });
      return;
    }
    navigate("/auth");
  };

  const handleSubscribe = () => {
    window.location.href = "https://www.charteredjobs.ie/";
  };

  const handleJoinCommunity = () => {
    window.open("https://www.reddit.com/r/AccountantsEire/", "_blank");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <UserCircle2 className="h-6 w-6" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 bg-white dark:bg-gray-800 border shadow-lg">
        <DropdownMenuItem onClick={() => navigate("/saved-jobs")} className="cursor-pointer">
          <BookmarkIcon className="mr-2 h-4 w-4" />
          Saved Jobs
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate("/post-job")} className="cursor-pointer">
          <BriefcaseIcon className="mr-2 h-4 w-4" />
          Post a Job
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
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};