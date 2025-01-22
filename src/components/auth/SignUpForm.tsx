import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

export const SignUpForm = ({ onToggle }: { onToggle: () => void }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log("Attempting sign up with:", { email });
      
      if (!email || !password) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Please enter both email and password",
        });
        setLoading(false);
        return;
      }

      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          // This ensures the user is immediately signed in after signup
          data: {
            email_confirmed: true
          }
        }
      });

      if (signUpError) {
        console.error("Signup error:", signUpError);
        toast({
          variant: "destructive",
          title: "Signup Error",
          description: signUpError.message,
        });
      } else if (signUpData.user) {
        console.log("Signup successful:", signUpData);
        // Sign in the user immediately after signup
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (signInError) {
          console.error("Auto-login error:", signInError);
          toast({
            variant: "destructive",
            title: "Login Error",
            description: "Account created but couldn't log in automatically. Please try logging in.",
          });
        } else {
          toast({
            title: "Success",
            description: "Account created and logged in successfully",
          });
          navigate('/');
        }
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "An unexpected error occurred",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email address</Label>
        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
          className="w-full"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={loading}
          className="w-full"
        />
      </div>

      <Button
        type="submit"
        className="w-full bg-primary hover:bg-primary/90 h-11 text-base font-medium"
        disabled={loading}
      >
        {loading ? "Creating account..." : "Create account"}
      </Button>

      <div className="text-center">
        <button
          type="button"
          onClick={onToggle}
          className="text-sm text-primary hover:underline font-medium"
          disabled={loading}
        >
          Already have an account? Sign in
        </button>
      </div>
    </form>
  );
};