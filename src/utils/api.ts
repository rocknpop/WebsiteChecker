/**
 * Resolves a given API endpoint path to an absolute URL.
 * 
 * In production or preview environments, this ensures requests resolve to the 
 * correct absolute location, using VITE_APP_URL if defined, falling back to 
 * the window.location.origin, and trimming duplicate or trailing slashes.
 */
export function getApiUrl(endpoint: string): string {
  // Read production/custom API base URL if defined in the client build env
  const appUrl = (import.meta as any).env?.VITE_APP_URL;
  
  // Choose the base origin
  const base = appUrl && appUrl !== "" && appUrl !== "MY_APP_URL" ? appUrl : window.location.origin;
  
  // Clean slash boundaries
  const cleanBase = base.replace(/\/+$/, "");
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  
  // Combine securely
  return `${cleanBase}${cleanEndpoint}`;
}
