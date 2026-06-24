import { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useSEO } from "./hooks/useSEO";

// Page imports
import Home from "./pages/Home";
import {
  PrivacyPolicyPage,
  TermsPage,
  DisclaimerPage,
  CookiePolicyPage,
  AboutUsPage,
  ContactUsPage
} from "./pages/LegalPages";

// Route to SEO Metadata Mapper (Full EEAT & Programmatic SEO scale support)
function getSeoMetadata(path: string): { title: string; description: string } {
  // 1. Core General Platform SEO Matches
  if (path === "/" || path === "/index.html") {
    return {
      title: "DownOrUp.net - Should You Do It? AI Decision Engine",
      description: "Get instant AI-powered analysis before making important decisions. DownOrUp.net helps you evaluate side hustles, careers, purchases, and businesses."
    };
  }

  if (path === "/blog") {
    return {
      title: "Expert Strategic Advice & Business Insights Blog - DownOrUp.net",
      description: "Read authoritative, data-driven analyses on the best side hustles, software tools, Python applications, and AI agencies thriving in 2026."
    };
  }

  // 2. EEAT Validation Pages
  if (path === "/about") {
    return {
      title: "About Us – Our Mission & Analytical Framework – DownOrUp.net",
      description: "Learn about the mission behind DownOrUp.net and how we leverage artificial intelligence to simplify decision making."
    };
  }
  if (path === "/contact") {
    return {
      title: "Contact Us – High-Priority Support Admin – DownOrUp.net",
      description: "Reach our support coordinator regarding system errors, branding proposals, or evaluation guidelines."
    };
  }

  // 3. Core Legal compliance mappings
  if (path === "/privacy-policy") {
    return {
      title: "Privacy Policy | GDPR & CCPA Compliance – DownOrUp.net",
      description: "We protect search telemetry. Read how we isolate search queries, localStorage settings, and Google AdSense parameters."
    };
  }
  if (path === "/terms-and-conditions") {
    return {
      title: "Terms and Conditions of Use – DownOrUp.net",
      description: "Platform guidelines and user agreement terms regarding fair usage of our free check status intelligence."
    };
  }
  if (path === "/disclaimer") {
    return {
      title: "Legal & Corporate Trademark Disclaimer – DownOrUp.net",
      description: "DownOrUp.net is an AI decision tool. Read our professional advisory disclaimer regarding investments."
    };
  }
  if (path === "/cookie-policy") {
    return {
      title: "Cookie Policy – Interface Caching Preferences – DownOrUp.net",
      description: "We utilize cookies and local preferences to maintain your preferred dark theme settings without requiring accounts."
    };
  }

  // 4. Default wildcard or programmatic title fallback
  return {
    title: "DownOrUp.net - Should You Do It? AI Decision Engine",
    description: "Get instant AI-powered analysis before making important decisions. The website evaluates business ideas, careers, purchases, and lifestyle."
  };
}

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  // Invoke useSEO hook for dynamic metadata updates on route state changes
  const seoMeta = getSeoMetadata(currentPath);
  useSEO({
    title: seoMeta.title,
    description: seoMeta.description,
    canonicalPath: currentPath
  });

  // Sync state with browser navigate path
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigate = (path: string) => {
    window.history.pushState({}, "", path);
    setCurrentPath(path);
  };

  // Route Router mapping
  const renderContent = () => {
    if (currentPath === "/privacy-policy") return <PrivacyPolicyPage />;
    if (currentPath === "/terms-and-conditions") return <TermsPage />;
    if (currentPath === "/disclaimer") return <DisclaimerPage />;
    if (currentPath === "/cookie-policy") return <CookiePolicyPage />;
    if (currentPath === "/about") return <AboutUsPage />;
    if (currentPath === "/contact") return <ContactUsPage />;

    // Handle all other pathways inside the highly centralized Home core
    return <Home currentPath={currentPath} onNavigate={navigate} />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900" id="app-viewport">
      <Header currentPath={currentPath} onNavigate={navigate} />
      <main className="flex-grow">{renderContent()}</main>
      <Footer onNavigate={navigate} />
    </div>
  );
}
