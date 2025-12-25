import { useEffect, useState, type PropsWithChildren } from "react";
import { AuthContext } from "./authContext";
import type { IAuthContext } from "./authContext";
import { supabase } from "@/lib/supabase.lib";
import { AuthBlocker } from "./AuthBlocker";

export function AuthProvider(props: PropsWithChildren) {
  const { children } = props;

  const [authState, setAuthState] = useState<IAuthContext>({
    uid: null,
    loading: true,
  });

  useEffect(() => {
    return supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT") {
        setAuthState({
          uid: null,
          loading: false,
        });
      } else if (session) {
        setAuthState({
          uid: session.user.id,
          loading: false,
        });
      } else {
        setAuthState({
          uid: null,
          loading: false,
        });
      }
    }).data.subscription.unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={authState}>
      <AuthBlocker>{children}</AuthBlocker>
    </AuthContext.Provider>
  );
}
