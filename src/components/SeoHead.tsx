import { useEffect } from "react";

interface SeoHeadProps {
  title: string;
  description: string;
  canonicalPath: string;
  schemas?: object[]; // Optional JSON-LD schemas
}

export default function SeoHead({ title, description, canonicalPath, schemas }: SeoHeadProps) {
  useEffect(() => {
    // 1. Update document title
    document.title = title + " | Site Status Checker";

    // 2. Update meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.setAttribute("name", "description");
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute("content", description);

    // 3. Update Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    const origin = window.location.origin;
    canonical.setAttribute("href", `${origin}${canonicalPath}`);

    // 4. Update Schema Markups (JSON-LD)
    const existingScripts = document.querySelectorAll('script[type="application/ld+json"].dynamic-schema');
    existingScripts.forEach((script) => script.remove());

    // Inject base organization schema and website schemas + page specific schemas
    const defaultSchemas = [
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": `${origin}/#organization`,
        "name": "Website Status Checker",
        "url": origin,
        "logo": `${origin}/logo-seo.png`,
        "sameAs": []
      },
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": `${origin}/#website`,
        "name": "Website Status Checker",
        "url": origin,
        "potentialAction": {
          "@type": "SearchAction",
          "target": `${origin}/website-status/{search_term_string}`,
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

  }, [title, description, canonicalPath, schemas]);

  return null;
}
