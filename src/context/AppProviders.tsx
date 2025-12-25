import { Provider } from "@/components/ui/provider";
import type { PropsWithChildren } from "react";
import { AuthProvider } from "./AuthProvider";
import { Router } from "wouter";

export function AppProviders(props: PropsWithChildren) {
  const { children } = props;

  return (
    <AuthProvider>
      <Router>
        <Provider>{children}</Provider>
      </Router>
    </AuthProvider>
  );
}
