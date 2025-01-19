import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Toaster } from "@/components/ui/toaster";

export const NewsletterSubscription = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log("Attempting to subscribe email:", email);
      const { data, error } = await supabase.functions.invoke('subscribe-newsletter', {
        body: { email }
      });

      if (error) {
        console.error('Newsletter subscription error:', error);
        throw error;
      }

      console.log('Subscription response:', data);

      toast({
        title: "Successfully subscribed! 🎉",
        description: "You'll receive our weekly job updates every Thursday.",
        duration: 5000,
      });
      
      setEmail("");
    } catch (error: any) {
      console.error('Newsletter subscription error:', error);
      toast({
        title: "Subscription failed",
        description: "Please try again later or contact support if the issue persists.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full bg-white border-t">
      <div className="w-full max-w-[2000px] mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <div className="space-y-3">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
              We share Handpicked jobs to your email, every Thursday, for Free
            </h2>
            <p className="text-lg text-gray-600">
              Join hundreds of other recently qualified accountants in Ireland by subscribing
            </p>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 mt-8 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 text-base"
              disabled={isLoading}
            />
            <Button 
              type="submit" 
              disabled={isLoading}
              size="lg"
              className="px-8 py-2 text-base font-medium shadow-sm hover:shadow-md transition-all duration-200"
            >
              {isLoading ? "Subscribing..." : "Subscribe"}
            </Button>
          </form>
        </div>
      </div>
      <Toaster />
    </div>
  );
};