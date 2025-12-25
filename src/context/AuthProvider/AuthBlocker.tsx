import type { PropsWithChildren } from "react";
import { useAuthState } from "./useAuthState";
import { Redirect } from "wouter";
import { useContinueParam } from "@/hooks/useContinueParam";
import { useEffect } from "react";

type AuthStatus = "authenticated" | "unauthenticated";

interface AuthBlockerProps {
  requireAuthStatus?: {
    status: AuthStatus;
    redirectPath: string;
    useContinueParam?: boolean;
  };
}

export function AuthBlocker(props: PropsWithChildren<AuthBlockerProps>) {
  const { requireAuthStatus, children } = props;

  const { uid, loading } = useAuthState();

  const continueParam = useContinueParam();

  const shouldRedirect =
    (requireAuthStatus?.status === "authenticated" && !uid) ||
    (requireAuthStatus?.status === "unauthenticated" && uid);

  // Handle hard redirect for external URLs
  useEffect(() => {
    if (
      shouldRedirect &&
      requireAuthStatus?.useContinueParam &&
      continueParam &&
      !continueParam.isLocalURL
    ) {
      window.location.href = continueParam.url;
    }
  }, [shouldRedirect, requireAuthStatus?.useContinueParam, continueParam]);

  if (loading) {
    return null;
  }

  if (shouldRedirect) {
    // Determine redirect path
    let redirectPath: string = "/";
    if (requireAuthStatus?.useContinueParam && continueParam) {
      // Only use local URLs for SPA navigation
      if (continueParam.isLocalURL) {
        redirectPath = continueParam.url;
      } else {
        // External URL - will be handled by useEffect
        // Return null to prevent render while redirecting
        return null;
      }
    } else if (requireAuthStatus) {
      redirectPath = requireAuthStatus.redirectPath;
    }

    return <Redirect to={redirectPath} />;
  }

  return <>{children}</>;
}
