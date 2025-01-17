import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TalentNetworkIntro } from "@/components/talent-network/TalentNetworkIntro";
import { TalentNetworkForm } from "@/components/talent-network/TalentNetworkForm";
import { TalentNetworkSuccess } from "@/components/talent-network/TalentNetworkSuccess";

type Step = "intro" | "form" | "success";

const TalentNetwork = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<Step>("intro");

  const renderStep = () => {
    switch (currentStep) {
      case "intro":
        return <TalentNetworkIntro onContinue={() => setCurrentStep("form")} />;
      case "form":
        return <TalentNetworkForm onSuccess={() => setCurrentStep("success")} />;
      case "success":
        return <TalentNetworkSuccess />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
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