import { useState, useEffect } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
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
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-4 bg-gray-50">
      <Card className="w-full max-w-md mx-auto shadow-lg">
        <CardHeader className="space-y-1 text-center pb-4">
          <h1 className="text-2xl font-bold tracking-tight">
            {isSignUp ? "Create an Account" : "Welcome Back"}
          </h1>
          <p className="text-sm text-muted-foreground">
            {isSignUp 
              ? "Join our talent network to discover exciting opportunities" 
              : "Sign in to access your account"}
          </p>
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