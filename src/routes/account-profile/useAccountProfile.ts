import { useAuthState } from "@/context/AuthProvider";
import { createSubscription } from "@/lib/supabase-realtime.lib";
import { supabase } from "@/lib/supabase.lib";
import type { Json } from "@/types/supabase-generated.type";
import { useEffect, useState } from "react";
import z from "zod";

interface AccountProfile {
  displayName: string;
  email: string;
  accessedApps: string[];
}

export function useAccountProfile() {
  const uid = useAuthState().uid;

  const [accountProfileState, setAccountProfileState] = useState<{
    profile: AccountProfile | null;
    loading: boolean;
    error: Error | null;
  }>({ profile: null, loading: true, error: null });

  useEffect(() => {
    if (uid) {
      createSubscription({
        table: "user_profiles",
        channelName: "watch_user_profile",
        filter: `id=eq.${uid}`,
        startInitialLoad: () => {
          supabase
            .from("user_profiles")
            .select()
            .eq("id", uid)
            .single()
            .then((result) => {
              if (result.error) {
                setAccountProfileState({
                  profile: null,
                  loading: false,
                  error: result.error,
                });
              } else {
                const profile = result.data;
                setAccountProfileState({
                  profile: {
                    displayName: profile.display_name,
                    email: profile.email ?? "No email found",
                    accessedApps: parseAccessedApps(profile.accessed_apps),
                  },
                  loading: false,
                  error: null,
                });
              }
            });
        },
        onPayload: (payload) => {
          if (payload.eventType === "UPDATE") {
            const updatedProfile = payload.new;
            setAccountProfileState({
              profile: {
                displayName: updatedProfile.display_name,
                email: updatedProfile.email ?? "No email found",
                accessedApps: parseAccessedApps(updatedProfile.accessed_apps),
              },
              loading: false,
              error: null,
            });
          }
        },
      });
    }
  }, [uid]);

  return accountProfileState;
}

const AccessedAppsSchema = z.array(z.string());

function parseAccessedApps(accessedApps: Json): string[] {
  const result = AccessedAppsSchema.safeParse(accessedApps);
  if (!result.success) {
    return [];
  }
  return result.data;
}
