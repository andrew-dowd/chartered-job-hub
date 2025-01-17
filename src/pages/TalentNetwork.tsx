import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSession } from "@supabase/auth-helpers-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ChevronLeft } from "lucide-react";

const formSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  currentLocation: z.string().min(2, "Location is required"),
  linkedinUrl: z.string().url("Invalid LinkedIn URL").optional().or(z.literal("")),
  portfolioUrl: z.string().url("Invalid portfolio URL").optional().or(z.literal("")),
  salaryExpectation: z.string().optional(),
});

const TalentNetwork = () => {
  const session = useSession();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      currentLocation: "",
      linkedinUrl: "",
      portfolioUrl: "",
      salaryExpectation: "",
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0]);
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!session?.user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to submit your profile",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      let resumeUrl = "";
      
      if (resumeFile) {
        const fileExt = resumeFile.name.split('.').pop();
        const fileName = `${session.user.id}/${Date.now()}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from('resumes')
          .upload(fileName, resumeFile);

        if (uploadError) throw uploadError;
        
        const { data: { publicUrl } } = supabase.storage
          .from('resumes')
          .getPublicUrl(fileName);
          
        resumeUrl = publicUrl;
      }

      const { error } = await supabase
        .from('talent_profiles')
        .insert({
          user_id: session.user.id,
          full_name: values.fullName,
          email: values.email,
          current_location: values.currentLocation,
          linkedin_url: values.linkedinUrl,
          portfolio_url: values.portfolioUrl,
          salary_expectation: values.salaryExpectation,
          resume_url: resumeUrl,
        });

      if (error) throw error;

      toast({
        title: "Profile submitted successfully!",
        description: "You'll be notified when companies want to connect.",
      });

      navigate('/');
    } catch (error) {
      console.error('Error submitting profile:', error);
      toast({
        title: "Error submitting profile",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
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

        <div className="max-w-2xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold text-gray-900">Join the Talent Network</h1>
            <p className="text-lg text-gray-600">
              Let Companies Apply to You
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border mb-8">
            <Accordion type="single" collapsible className="mb-8">
              <AccordionItem value="item-1">
                <AccordionTrigger>How does it work?</AccordionTrigger>
                <AccordionContent>
                  Submit your resume and let companies apply to you directly on HiringCafe. 
                  Go live anytime, and hide your profile whenever you want. Your identity 
                  is only revealed when you accept their intro request.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Is it free?</AccordionTrigger>
                <AccordionContent>
                  Yes, it's completely free for job seekers.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>What information will be shared with companies?</AccordionTrigger>
                <AccordionContent>
                  Only your professional information like experience and skills. Your contact 
                  details are only shared when you accept a company's request to connect.
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div>
                  <FormLabel>Resume</FormLabel>
                  <Input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="mt-1"
                  />
                </div>

                <FormField
                  control={form.control}
                  name="currentLocation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Location</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="linkedinUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>LinkedIn Profile (Optional)</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="https://linkedin.com/in/..." />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="portfolioUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Portfolio/Website (Optional)</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="https://..." />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="salaryExpectation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Salary Expectation (Optional)</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="e.g. €50,000 - €70,000" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Profile"}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TalentNetwork;