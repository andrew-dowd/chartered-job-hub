import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TalentNetworkIntro } from "@/components/talent-network/TalentNetworkIntro";
import { TalentNetworkForm } from "@/components/talent-network/TalentNetworkForm";
import { TalentNetworkSuccess } from "@/components/talent-network/TalentNetworkSuccess";
import { Card, CardContent } from "@/components/ui/card";
import Auth from "./Auth";

type Step = "intro" | "auth" | "form" | "success";

const TalentNetwork = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<Step>("intro");
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      if (currentSession) {
        setCurrentStep("form");
      }
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      if (newSession) {
        setCurrentStep("form");
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleContinue = () => {
    if (!session) {
      setCurrentStep("auth");
    } else {
      setCurrentStep("form");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  const renderStep = () => {
    switch (currentStep) {
      case "intro":
        return <TalentNetworkIntro onContinue={handleContinue} />;
      case "auth":
        return (
          <Card className="w-full max-w-md mx-auto bg-white shadow-md">
            <CardContent className="pt-6 px-6">
              <div className="space-y-6">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-center">Create an Account</h2>
                  <p className="text-gray-600 text-center text-sm">
                    Join our Talent Network to create your profile, control your privacy, 
                    and discover matching opportunities. We'll keep your information secure 
                    and notify you about relevant positions.
                  </p>
                </div>
                <Auth />
              </div>
            </CardContent>
          </Card>
        );
      case "form":
        return <TalentNetworkForm onSuccess={() => setCurrentStep("success")} />;
      case "success":
        return <TalentNetworkSuccess />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => navigate(-1)}
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        {renderStep()}
      </div>
    </div>
  );
};

export default TalentNetwork;