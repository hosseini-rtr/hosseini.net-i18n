"use client";

import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();
  const params = useParams();
  const locale = (params.locale as string) || "en";

  const handleLogout = async () => {
    try {
      // Call logout endpoint to clear cookies
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include", // Include cookies in the request
      });
    } catch (error) {
      console.error("Logout error:", error);
    }

    router.push(`/${locale}/login`);
  };

  return (
    <Button
      variant="outline"
      onClick={handleLogout}
      className="text-red-600 hover:text-red-700"
    >
      <LogOut className="mr-2 h-4 w-4" />
      Logout
    </Button>
  );
}
