import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const TalentNetworkSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-2xl mx-auto space-y-6 p-6 bg-white rounded-lg shadow-sm text-center">
      <div className="flex justify-center">
        <CheckCircle2 className="h-16 w-16 text-green-500" />
      </div>
      <h2 className="text-2xl font-semibold text-gray-900">Profile Submitted Successfully!</h2>
      <p className="text-gray-600">
        Your profile is now live in our Talent Network. When companies are interested,
        you'll receive connection requests via email. You can choose which opportunities
        to pursue - you're in control.
      </p>
      <div className="pt-4">
        <Button 
          onClick={() => navigate('/')}
          variant="outline"
          className="px-8"
        >
          Return to Home
        </Button>
      </div>
    </div>
  );
};