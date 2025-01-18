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
    <div>
      {isSignUp ? (
        <SignUpForm onToggle={toggleMode} />
      ) : (
        <SignInForm onToggle={toggleMode} />
      )}
    </div>
  );
};

export default Auth;