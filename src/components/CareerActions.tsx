import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Mail, Users, Upload } from "lucide-react";

export const CareerActions = () => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here we would integrate with Beehiiv
    toast({
      title: "Subscribed!",
      description: "You've been added to our newsletter list.",
    });
    setEmail("");
  };

  const handleJoinCommunity = () => {
    window.open("https://reddit.com/r/charteredaccountants", "_blank");
  };

  const handleTalentNetwork = () => {
    toast({
      title: "Coming Soon",
      description: "CV submission feature will be available shortly.",
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Stay Updated</h3>
        <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1"
          />
          <Button type="submit">
            <Mail className="mr-2 h-4 w-4" />
            Subscribe
          </Button>
        </form>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          variant="outline"
          className="flex-1"
          onClick={handleJoinCommunity}
        >
          <Users className="mr-2 h-4 w-4" />
          Join Community
        </Button>
        <Button
          variant="outline"
          className="flex-1"
          onClick={handleTalentNetwork}
        >
          <Upload className="mr-2 h-4 w-4" />
          Join Talent Network
        </Button>
      </div>
    </div>
  );
};