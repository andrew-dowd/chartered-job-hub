import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Mail, Users, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const CareerActions = () => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Subscribed!",
      description: "You've been added to our newsletter list.",
    });
    setEmail("");
  };

  const handleJoinCommunity = () => {
    window.open("https://www.reddit.com/r/AccountantsEire", "_blank");
  };

  const handleTalentNetwork = () => {
    navigate('/talent-network');
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <form onSubmit={handleNewsletterSubmit} className="flex gap-2 flex-1 min-w-[280px]">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="max-w-[300px]"
          />
          <Button type="submit" size="sm" className="bg-primary hover:bg-primary/90">
            <Mail className="mr-2 h-4 w-4" />
            Subscribe
          </Button>
        </form>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleJoinCommunity}
            className="hover:bg-gray-50"
          >
            <Users className="mr-2 h-4 w-4" />
            Join Community
          </Button>
          <Button
            className="bg-primary hover:bg-primary/90 text-white"
            size="sm"
            onClick={handleTalentNetwork}
          >
            <Upload className="mr-2 h-4 w-4" />
            Join Talent Network
          </Button>
        </div>
      </div>
    </div>
  );
};