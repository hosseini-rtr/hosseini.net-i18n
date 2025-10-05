"use client";

import { Loader2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const params = useParams();
  const locale = (params.locale as string) || "en";
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    let isMounted = true;

    // Check authentication using our internal API
    const verifyAuth = async () => {
      try {
        const response = await fetch("/api/auth/verify", {
          method: "GET",
          credentials: "include", // Include cookies in the request
        });

        if (response.ok && isMounted) {
          const data = await response.json();
          if (data.authenticated && isMounted) {
            setIsAuthenticated(true);
          } else if (isMounted) {
            setIsAuthenticated(false);
            router.push(`/${locale}/login`);
          }
        } else if (isMounted) {
          setIsAuthenticated(false);
          router.push(`/${locale}/login`);
        }
      } catch (error) {
        console.error("Auth verification error:", error);
        if (isMounted) {
          setIsAuthenticated(false);
          router.push(`/${locale}/login`);
        }
      }
    };

    verifyAuth();

    return () => {
      isMounted = false;
    };
  }, [router, locale]);

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
