import { useState, useEffect } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const formSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  currentLocation: z.string().min(2, "Location is required"),
  additionalLocations: z.string().optional(),
  linkedinUrl: z.string().url("Invalid LinkedIn URL").optional().or(z.literal("")),
  portfolioUrl: z.string().optional()
    .refine(val => !val || val.startsWith('http://') || val.startsWith('https://'), {
      message: "Portfolio URL must start with http:// or https://"
    })
    .or(z.literal("")),
  salaryExpectation: z.string().optional(),
});

interface TalentNetworkFormProps {
  existingProfile?: any;
  onSuccess: () => void;
}

export const TalentNetworkForm = ({ existingProfile, onSuccess }: TalentNetworkFormProps) => {
  const session = useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: existingProfile?.full_name || "",
      email: existingProfile?.email || "",
      currentLocation: existingProfile?.current_location || "",
      additionalLocations: existingProfile?.additional_locations || "",
      linkedinUrl: existingProfile?.linkedin_url || "",
      portfolioUrl: existingProfile?.portfolio_url || "",
      salaryExpectation: existingProfile?.salary_expectation || "",
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
      let resumeUrl = existingProfile?.resume_url || "";
      
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

      const profileData = {
        user_id: session.user.id,
        full_name: values.fullName,
        email: values.email,
        current_location: values.currentLocation,
        additional_locations: values.additionalLocations || null,
        linkedin_url: values.linkedinUrl || null,
        portfolio_url: values.portfolioUrl || null,
        salary_expectation: values.salaryExpectation || null,
        resume_url: resumeUrl || null,
      };

      const { error } = existingProfile
        ? await supabase
            .from('talent_profiles')
            .update(profileData)
            .eq('user_id', session.user.id)
        : await supabase
            .from('talent_profiles')
            .insert(profileData);

      if (error) throw error;

      toast({
        title: existingProfile ? "Profile Updated" : "Profile Created",
        description: existingProfile 
          ? "Your profile has been successfully updated" 
          : "Your profile has been successfully created",
      });

      onSuccess();
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
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-gray-900">
          {existingProfile ? "Update Your Profile" : "Complete Your Profile"}
        </h1>
        <p className="text-gray-600">
          {existingProfile 
            ? "Keep your profile up to date to receive the best matches" 
            : "Help companies discover you"}
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            </div>

            <div>
              <FormLabel>Resume</FormLabel>
              <Input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="mt-1"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            </div>

            <FormField
              control={form.control}
              name="additionalLocations"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Locations You Would Work In</FormLabel>
                  <FormControl>
                    <Textarea 
                      {...field} 
                      placeholder="e.g. New York, London, Remote"
                      className="h-20"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            </div>

            <Button 
              type="submit" 
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting 
                ? "Submitting..." 
                : existingProfile 
                  ? "Update Profile"
                  : "Submit Profile"
              }
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};