import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface TalentNetworkIntroProps {
  onContinue: () => void;
}

export const TalentNetworkIntro = ({ onContinue }: TalentNetworkIntroProps) => {
  return (
    <div className="max-w-3xl mx-auto space-y-8 p-6 bg-white rounded-lg shadow-sm">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">Join the Talent Network</h1>
        <p className="text-lg text-gray-600">
          Let Companies Apply to You
        </p>
      </div>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="what-is">
          <AccordionTrigger>What is CharteredJobs Talent Network?</AccordionTrigger>
          <AccordionContent>
            It's where companies come looking for you, not the other way around. You can make your profile 
            live whenever you want and hide it just as quickly when you need a break. Your identity stays 
            private - companies can only see your details when you accept their intro request.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="how-it-works">
          <AccordionTrigger>How does it work?</AccordionTrigger>
          <AccordionContent>
            Upload your CV and our AI/ML algorithms will match you with the right companies. Your personal 
            details stay hidden until you approve a company's intro request. No spam - this isn't a LinkedIn 
            Jungle.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="is-it-free">
          <AccordionTrigger>Is it free?</AccordionTrigger>
          <AccordionContent>
            Yes, it's completely free for job seekers! Companies are the ones paying to access the talent network.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="info-shared">
          <AccordionTrigger>What information will be shared with companies?</AccordionTrigger>
          <AccordionContent>
            They'll see your work experience, education, salary expectations, and preferred locations. 
            Your personal information stays private until you personally accept their intro request.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="application-history">
          <AccordionTrigger>Can they see what jobs I've applied to?</AccordionTrigger>
          <AccordionContent>
            Absolutely not. Your application history is completely private. Recruiters cannot access 
            your past applications.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="hide-profile">
          <AccordionTrigger>Can I hide my profile?</AccordionTrigger>
          <AccordionContent>
            Yes! You can toggle your profile visibility on or off at any time through your account settings.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="block-companies">
          <AccordionTrigger>Can I hide my profile from specific companies?</AccordionTrigger>
          <AccordionContent>
            Yes! If you prefer not to be visible to certain companies, you can block them. Your privacy 
            is important - no one can access your information unless you allow it.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="accept-requests">
          <AccordionTrigger>Do I have to accept requests?</AccordionTrigger>
          <AccordionContent>
            Not at all! You're in control. Accept or decline intro requests as you see fit. You can 
            decline requests without the company knowing.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="how-to-join">
          <AccordionTrigger>What do I need to do to join?</AccordionTrigger>
          <AccordionContent>
            Simply upload your CV, add your location, and optionally include salary expectations and other 
            details. Our algorithms will handle the matching while you wait for offers to come in.
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