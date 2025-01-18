import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useSearchParams } from "react-router-dom";
import { SignInForm } from "@/components/auth/SignInForm";
import { SignUpForm } from "@/components/auth/SignUpForm";

const Auth = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isSignUp, setIsSignUp] = useState(searchParams.get("mode") !== "signin");

  useEffect(() => {
    setIsSignUp(searchParams.get("mode") !== "signin");
  }, [searchParams]);

  const toggleMode = () => {
    setSearchParams({ mode: isSignUp ? "signin" : "signup" });
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold tracking-tight">
          {isSignUp ? "Create Account" : "Sign In"}
        </h1>
        {isSignUp ? (
          <SignUpForm onToggle={toggleMode} />
        ) : (
          <SignInForm onToggle={toggleMode} />
        )}
      </div>
    </div>
  );
};

export default Auth;