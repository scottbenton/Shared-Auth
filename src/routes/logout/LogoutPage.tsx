import { supabase } from "@/lib/supabase.lib";
import { useEffect } from "react";
import { useLocation } from "wouter";

export default function LogoutPage() {
  const [, navigate] = useLocation();

  useEffect(() => {
    supabase.auth.signOut();
    navigate("/login");
  }, [navigate]);

  return null;
}
