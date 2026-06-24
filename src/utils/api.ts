/**
 * Resolves a given API endpoint path to an absolute URL.
 * 
 * In production or preview environments, this ensures requests resolve to the 
 * correct absolute location, using VITE_APP_URL if defined, falling back to 
 * the window.location.origin, and trimming duplicate or trailing slashes.
 */
export function getApiUrl(endpoint: string): string {
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;

  // If we are in the browser, always default to the current live page origin!
  // This is 100% robust against misconfigured or hardcoded domain overrides.
  if (typeof window !== "undefined" && window.location) {
    return `${window.location.origin}${cleanEndpoint}`;
  }

  // Fallback for non-browser environments if any (e.g. server-side/testing)
  const appUrl = (import.meta as any).env?.VITE_API_URL || (import.meta as any).env?.VITE_APP_URL;
  
  if (
    appUrl && 
    appUrl !== "" && 
    appUrl !== "MY_APP_URL" && 
    appUrl !== "MY_API_URL" && 
    !appUrl.includes("localhost") &&
    !appUrl.includes("your-api-domain.com")
  ) {
    const cleanBase = appUrl.replace(/\/+$/, "");
    return `${cleanBase}${cleanEndpoint}`;
  }

  // Fallback for non-browser environments if any
  const base = "http://localhost:3000";
  const cleanBase = base.replace(/\/+$/, "");
  return `${cleanBase}${cleanEndpoint}`;
}
