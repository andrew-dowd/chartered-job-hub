import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Link } from "react-router-dom";

const FAQ = () => {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Frequently Asked Questions</h1>
      <Accordion type="single" collapsible className="space-y-2">
        <AccordionItem value="item-1">
          <AccordionTrigger>When are jobs added/updated?</AccordionTrigger>
          <AccordionContent>
            Listings are updated every week.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger>Can I submit a job?</AccordionTrigger>
          <AccordionContent>
            Yes. Please do so <Link to="/post-job" className="text-primary hover:underline">here</Link>.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger>Are all submissions approved?</AccordionTrigger>
          <AccordionContent>
            No. Each role is reviewed and approved at our discretion to ensure quality standards for companies and candidates.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4">
          <AccordionTrigger>Do you offer promoted/sponsored job posts?</AccordionTrigger>
          <AccordionContent>
            Yes, we offer promoted job listings. Please contact us through the job submission form for more information.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default FAQ;