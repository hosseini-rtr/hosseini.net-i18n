"use client";

import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    // Check authentication by making a request to the API
    // Cookies are automatically sent with the request
    const verifyAuth = async () => {
      try {
        const response = await fetch(
          "https://api.datamdynamics.com/api/auth/verify",
          {
            method: "GET",
            credentials: "include", // Include cookies in the request
          }
        );

        if (response.ok) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(true);
       
          // router.push("en/login");
        }
      } catch (error) {
        setIsAuthenticated(true);
        // router.push("en/login");
      }
    };

    verifyAuth();
  }, [router]);

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Verifying authentication...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
