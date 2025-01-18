import { useState, useEffect } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { useSearchParams, useLocation } from "react-router-dom";
import { SignInForm } from "@/components/auth/SignInForm";
import { SignUpForm } from "@/components/auth/SignUpForm";

const Auth = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isSignUp, setIsSignUp] = useState(searchParams.get("mode") !== "signin");
  const location = useLocation();
  const isTalentNetwork = location.pathname.includes("talent-network");

  useEffect(() => {
    setIsSignUp(searchParams.get("mode") !== "signin");
  }, [searchParams]);

  const toggleMode = () => {
    setSearchParams({ mode: isSignUp ? "signin" : "signup" });
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-4 bg-gray-50">
      <Card className="w-full max-w-md mx-auto shadow-lg">
        <CardHeader className="space-y-1 text-center pb-4">
          <h1 className="text-2xl font-bold tracking-tight">
            {isSignUp ? "Create an Account" : "Welcome Back"}
          </h1>
          {isSignUp && isTalentNetwork ? (
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>To join our Talent Network, you'll need an account. This allows us to:</p>
              <ul className="list-disc list-inside text-left pl-4 space-y-1">
                <li>Save your profile securely</li>
                <li>Let you control who sees your information</li>
                <li>Keep you updated on matching opportunities</li>
                <li>Manage your privacy settings</li>
              </ul>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              {isSignUp 
                ? "Join our platform to discover exciting opportunities" 
                : "Sign in to access your account"}
            </p>
          )}
        </CardHeader>
        <CardContent>
          {isSignUp ? (
            <SignUpForm onToggle={toggleMode} />
          ) : (
            <SignInForm onToggle={toggleMode} />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;