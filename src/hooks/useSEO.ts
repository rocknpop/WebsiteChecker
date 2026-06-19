import { useEffect } from "react";

export interface UseSEOProps {
  title: string;
  description: string;
  canonicalPath?: string;
  image?: string;
  type?: string;
  schemas?: object[];
}

/**
 * Custom React hook that dynamically updates:
 * - Document title
 * - Meta description
 * - Canonical link tag based on current route/path
 * - Open Graph meta tags (og:title, og:description, og:type, og:url, og:image)
 * - Twitter Card meta tags (twitter:card, twitter:title, twitter:description, twitter:image)
 * - Dynamic JSON-LD schema markups
 */
export function useSEO({
  title,
  description,
  canonicalPath,
  image,
  type = "website",
  schemas
}: UseSEOProps) {
  useEffect(() => {
    // 1. Update Document Title
    document.title = title;

    // Helper to update or create a meta tag
    const updateMetaTag = (attribute: string, attrValue: string, content: string) => {
      let element = document.querySelector(`meta[${attribute}="${attrValue}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, attrValue);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    // 2. Update Meta Description
    updateMetaTag("name", "description", description);

    // 3. Update Canonical URL
    const origin = window.location.origin;
    const path = canonicalPath !== undefined ? canonicalPath : window.location.pathname;
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", `${origin}${path}`);

    // 4. Update Open Graph Meta Tags
    updateMetaTag("property", "og:title", title);
    updateMetaTag("property", "og:description", description);
    updateMetaTag("property", "og:type", type);
    updateMetaTag("property", "og:url", `${origin}${path}`);
    
    // Choose an OG image (default to logo/cover if not specified)
    const ogImage = image || `${origin}/logo-seo.png`;
    updateMetaTag("property", "og:image", ogImage);

    // 5. Update Twitter Card Meta Tags
    updateMetaTag("name", "twitter:card", "summary_large_image");
    updateMetaTag("name", "twitter:title", title);
    updateMetaTag("name", "twitter:description", description);
    updateMetaTag("name", "twitter:image", ogImage);

    // 6. Update Schema Markups (JSON-LD)
    const existingScripts = document.querySelectorAll('script[type="application/ld+json"].dynamic-schema');
    existingScripts.forEach((script) => script.remove());

    const defaultSchemas = [
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": `${origin}/#organization`,
        "name": "DownOrUp",
        "url": origin,
        "logo": `${origin}/logo-seo.png`,
        "sameAs": []
      },
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": `${origin}/#website`,
        "name": "DownOrUp",
        "url": origin,
        "potentialAction": {
          "@type": "SearchAction",
          "target": `${origin}/status/{search_term_string}`,
          "query-input": "required name=search_term_string"
        }
      }
    ];

    const activeSchemas = [...defaultSchemas, ...(schemas || [])];

    activeSchemas.forEach((schemaObj) => {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.className = "dynamic-schema";
      script.text = JSON.stringify(schemaObj);
      document.head.appendChild(script);
    });

  }, [title, description, canonicalPath, image, type, schemas]);
}

export default useSEO;
