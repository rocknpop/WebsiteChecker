import { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";

// Page imports
import Home from "./pages/Home";
import StatusPage from "./pages/StatusPage";
import StatusDirectory from "./pages/StatusDirectory";
import PingTester from "./pages/PingTester";
import {
  DnsLookupPage,
  IpLookupPage,
  SslCheckerPage,
  HttpHeaderCheckerPage,
  DnsPropagationPage,
  WhoisLookupPage,
  PortCheckerPage
} from "./pages/DiagnosticTools";
import {
  SpeedTestPage,
  TraceroutePage,
  RedirectCheckerPage,
  ScreenshotToolPage,
  EmailSecuritySuitePage,
  BlacklistAndMalwarePage,
  DomainAgePage
} from "./pages/MoreDiagnosticTools";
import Blog from "./pages/Blog";
import { AboutUsPage, EditorialPolicyPage, MethodologyPage, DataSourcesPage, ContactUsPage } from "./pages/EeatPages";
import {
  PrivacyPolicyPage,
  TermsPage,
  DisclaimerPage,
  CookiePolicyPage,
  DmcaPage,
  AcceptableUsePage
} from "./pages/LegalPages";

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

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

  // Helper: check if a domain was searched, then navigate
  const handleCheckStatus = (domain: string) => {
    let clean = domain.trim().toLowerCase();
    // Strip protocols if entered
    clean = clean.replace(/^(https?:\/\/)?(www\.)?/, "");
    clean = clean.split("/")[0]; // keep only host
    if (clean) {
      navigate(`/status/${clean}`);
    }
  };

  // Route Router mapping
  const renderContent = () => {
    if (currentPath === "/" || currentPath === "/index.html") {
      return <Home onCheckStatus={handleCheckStatus} onNavigate={navigate} />;
    }

    if (currentPath === "/status") {
      return <StatusDirectory onCheckStatus={handleCheckStatus} onNavigate={navigate} />;
    }

    if (currentPath.startsWith("/status/")) {
      const domain = currentPath.substring("/status/".length);
      return <StatusPage domain={domain} onNavigate={navigate} onCheckStatus={handleCheckStatus} />;
    }

    if (currentPath.startsWith("/website-status/")) {
      const domain = currentPath.substring("/website-status/".length);
      return <StatusPage domain={domain} onNavigate={navigate} onCheckStatus={handleCheckStatus} />;
    }

    // Tools
    if (currentPath === "/ip-ping-tester") {
      return <PingTester />;
    }
    if (currentPath === "/dns-lookup") {
      return <DnsLookupPage onNavigate={navigate} />;
    }
    if (currentPath === "/ip-lookup") {
      return <IpLookupPage />;
    }
    if (currentPath === "/ssl-checker") {
      return <SslCheckerPage />;
    }
    if (currentPath === "/http-header-checker") {
      return <HttpHeaderCheckerPage />;
    }
    // Support both paths to be bulletproof
    if (currentPath === "/dns-propagation" || currentPath === "/dns-propagation-checker") {
      return <DnsPropagationPage />;
    }
    if (currentPath === "/whois-lookup") {
      return <WhoisLookupPage />;
    }
    if (currentPath === "/port-checker") {
      return <PortCheckerPage />;
    }
    if (currentPath === "/speed-test" || currentPath === "/website-speed-test") {
      return <SpeedTestPage />;
    }
    if (currentPath === "/traceroute" || currentPath === "/traceroute-tool") {
      return <TraceroutePage />;
    }
    if (currentPath === "/redirect-checker") {
      return <RedirectCheckerPage />;
    }
    if (currentPath === "/screenshot-tool" || currentPath === "/website-screenshot-tool") {
      return <ScreenshotToolPage />;
    }
    if (currentPath === "/email-security" || currentPath === "/spf-checker" || currentPath === "/dkim-checker" || currentPath === "/dmarc-checker") {
      return <EmailSecuritySuitePage />;
    }
    if (currentPath === "/blacklist-scanner" || currentPath === "/blacklist-checker") {
      return <BlacklistAndMalwarePage />;
    }
    if (currentPath === "/domain-age" || currentPath === "/domain-age-checker") {
      return <DomainAgePage />;
    }

    // Blog
    if (currentPath === "/blog") {
      return <Blog />;
    }

    // EEAT Pages
    if (currentPath === "/about-us") {
      return <AboutUsPage />;
    }
    if (currentPath === "/editorial-policy") {
      return <EditorialPolicyPage />;
    }
    if (currentPath === "/methodology") {
      return <MethodologyPage />;
    }
    if (currentPath === "/data-sources") {
      return <DataSourcesPage />;
    }
    if (currentPath === "/contact-us") {
      return <ContactUsPage />;
    }

    // Legal Pages
    if (currentPath === "/privacy-policy") {
      return <PrivacyPolicyPage />;
    }
    if (currentPath === "/terms-and-conditions") {
      return <TermsPage />;
    }
    if (currentPath === "/disclaimer") {
      return <DisclaimerPage />;
    }
    if (currentPath === "/cookie-policy") {
      return <CookiePolicyPage />;
    }
    if (currentPath === "/dmca") {
      return <DmcaPage />;
    }
    if (currentPath === "/acceptable-use-policy") {
      return <AcceptableUsePage />;
    }

    // Fallback error-safe 404 handler
    return (
      <div className="max-w-md mx-auto py-24 text-center px-4">
        <h2 className="text-3xl font-display font-extrabold text-gray-900 mb-2">404 - Diagnostic Error</h2>
        <p className="text-sm text-gray-500 mb-6 font-mono">Unmapped diagnostic pipeline trajectory.</p>
        <button
          onClick={() => navigate("/")}
          className="bg-brand-600 hover:bg-brand-500 text-white text-sm font-semibold px-6 py-2.5 rounded-xl transition-all"
        >
          Return to central console
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/20" id="app-viewport">
      <Header currentPath={currentPath} onNavigate={navigate} />
      <main className="flex-grow">{renderContent()}</main>
      <Footer onNavigate={navigate} />
    </div>
  );
}
