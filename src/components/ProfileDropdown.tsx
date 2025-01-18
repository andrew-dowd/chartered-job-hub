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
import { UserCircle2, BookmarkIcon, LogOut, BriefcaseIcon, Mail, Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export const ProfileDropdown = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState("");

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
    if (!email) {
      toast({
        title: "Please enter an email",
        variant: "destructive",
      });
      return;
    }
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
      <DropdownMenuContent align="end" className="w-72 bg-white dark:bg-gray-800 border shadow-lg p-4">
        <div className="space-y-2 mb-2">
          <div className="text-sm font-medium">Subscribe</div>
          <div className="flex gap-2">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-8"
            />
            <Button onClick={handleSubscribe} className="h-8 bg-primary hover:bg-primary/90">
              <Mail className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => navigate("/saved-jobs")} className="cursor-pointer">
          <BookmarkIcon className="mr-2 h-4 w-4" />
          Saved Jobs
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate("/post-job")} className="cursor-pointer">
          <BriefcaseIcon className="mr-2 h-4 w-4" />
          Post a Job
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleJoinCommunity} className="cursor-pointer">
          <Users className="mr-2 h-4 w-4" />
          Join Community
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