/**
 * Resolves a given API endpoint path to an absolute URL.
 * 
 * In production or preview environments, this ensures requests resolve to the 
 * correct absolute location, using VITE_APP_URL if defined, falling back to 
 * the window.location.origin, and trimming duplicate or trailing slashes.
 */
export function getApiUrl(endpoint: string): string {
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;

  // Check for client-accessible environment variable overrides first
  const appUrl = (import.meta as any).env?.VITE_API_URL || (import.meta as any).env?.VITE_APP_URL;
  
  if (appUrl && appUrl !== "" && appUrl !== "MY_APP_URL" && appUrl !== "MY_API_URL" && !appUrl.includes("localhost")) {
    const cleanBase = appUrl.replace(/\/+$/, "");
    return `${cleanBase}${cleanEndpoint}`;
  }

  if (typeof window !== "undefined" && window.location) {
    // If we are in the browser, always resolve relative to the current live page origin!
    // This is 100% robust against hardcoded / leaked localhost or mismatched protocols.
    return `${window.location.origin}${cleanEndpoint}`;
  }

  // Fallback for non-browser environments if any
  const base = "http://localhost:3000";
  const cleanBase = base.replace(/\/+$/, "");
  return `${cleanBase}${cleanEndpoint}`;
}
