import { useMemo } from "react";
import { useSearchParams } from "wouter";

// Allowed external domains for redirect
const ALLOWED_DOMAINS = [
  "scottbenton.dev",
  // Add more allowed domains here
];

function isAllowedURL(url: string): boolean {
  try {
    // If it starts with "/", it's a relative path - always allowed
    if (url.startsWith("/")) {
      // Prevent open redirect via protocol-relative URLs like "//evil.com"
      if (url.startsWith("//")) {
        return false;
      }
      return true;
    }

    // Parse as absolute URL
    const parsedURL = new URL(url);

    // Check if it's the current domain
    if (parsedURL.hostname === window.location.hostname) {
      return true;
    }

    // Check if the domain is in the allow list
    // This checks exact match and subdomain match (e.g., "app.scottsapps.com" matches "scottsapps.com")
    return ALLOWED_DOMAINS.some(
      (domain) =>
        parsedURL.hostname === domain ||
        parsedURL.hostname.endsWith(`.${domain}`),
    );
  } catch {
    // Invalid URL
    return false;
  }
}

export function useContinueParam() {
  const [params] = useSearchParams();

  const continueURL = useMemo(() => {
    const url = params.get("continue");

    if (!url) return null;

    // Validate the URL before returning it
    if (!isAllowedURL(url)) {
      console.warn(
        `[useContinueParam] Blocked redirect to disallowed URL: ${url}`,
      );
      return null;
    }

    // Determine if it's a local URL (relative path or same domain)
    const isLocalURL =
      url.startsWith("/") ||
      (url.startsWith("http") &&
        new URL(url).hostname === window.location.hostname);

    return {
      url,
      isLocalURL,
    };
  }, [params]);

  return continueURL;
}
