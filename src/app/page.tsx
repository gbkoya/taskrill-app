"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../store/authStore";
import SplashScreen from "../components/SplashScreen";

export default function SplashPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuthStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isLoading) return;
      router.replace(isAuthenticated ? "/dashboard" : "/home");
    }, 2800);

    return () => clearTimeout(timer);
  }, [isAuthenticated, isLoading, router]);

  return <SplashScreen />;
}