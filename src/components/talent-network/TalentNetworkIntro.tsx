import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface TalentNetworkIntroProps {
  onContinue: () => void;
}

export const TalentNetworkIntro = ({ onContinue }: TalentNetworkIntroProps) => {
  return (
    <div className="max-w-2xl mx-auto space-y-8 p-6 bg-white rounded-lg shadow-sm">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">Join the Talent Network</h1>
        <p className="text-lg text-gray-600">
          Let Companies Apply to You
        </p>
      </div>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="how-it-works">
          <AccordionTrigger>How does it work?</AccordionTrigger>
          <AccordionContent>
            Submit your profile and let companies discover you. When they're interested,
            they'll send you a request to connect. You have full control - only respond
            to opportunities that interest you.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="is-it-free">
          <AccordionTrigger>Is it free?</AccordionTrigger>
          <AccordionContent>
            Yes, it's completely free for job seekers. Companies pay to access the talent network.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="privacy">
          <AccordionTrigger>What information will be shared with companies?</AccordionTrigger>
          <AccordionContent>
            Companies will see your professional information like experience, skills, and preferred locations.
            Your contact details are only shared when you accept a company's request to connect.
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="flex justify-center pt-4">
        <Button 
          onClick={onContinue}
          className="w-full md:w-auto px-8"
        >
          Continue to Profile
        </Button>
      </div>
    </div>
  );
};