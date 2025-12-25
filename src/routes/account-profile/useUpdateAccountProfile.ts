import { useAuthState } from "@/context/AuthProvider";
import { supabase } from "@/lib/supabase.lib";
import type { TablesUpdate } from "@/types/supabase-generated.type";
import { useCallback } from "react";

export function useUpdateAccountProfile(): (
  updates: TablesUpdate<"user_profiles">,
) => Promise<void> {
  const uid = useAuthState().uid;

  return useCallback(
    (updates: TablesUpdate<"user_profiles">) => {
      return new Promise((resolve, reject) => {
        if (!uid) {
          reject(new Error("User not authenticated"));
          return;
        }

        supabase
          .from("user_profiles")
          .update(updates)
          .eq("id", uid)
          .then((result) => {
            if (result.error) {
              reject(result.error);
            } else {
              resolve();
            }
          });
      });
    },
    [uid],
  );
}
