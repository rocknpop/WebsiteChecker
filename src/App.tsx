import { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useSEO } from "./hooks/useSEO";

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

// Route to SEO Metadata Mapper
function getSeoMetadata(path: string): { title: string; description: string } {
  if (path === "/" || path === "/index.html") {
    return {
      title: "Check If Any Website Is Down | Website Status Checker, IP Ping Test & DNS Lookup – DownOrUp",
      description: "Check website availability, run IP ping tests, DNS lookups, SSL checks, traceroutes, and network diagnostics with DownOrUp. Fast, free, and accurate."
    };
  }
  if (path === "/status") {
    return {
      title: "Public Status Directory – DownOrUp",
      description: "Explore response times, CDN detections, and SSL status logs for popular global websites and diagnostic nodes."
    };
  }
  if (path.startsWith("/status/")) {
    const domain = path.substring("/status/".length);
    return {
      title: `Is ${domain} Down? Active Website Status Checker – DownOrUp`,
      description: `Instantly check if ${domain} is currently down or experiencing a global outage. Get SSL validity, latency, port telemetry, and AI diagnosis.`
    };
  }
  if (path.startsWith("/website-status/")) {
    const domain = path.substring("/website-status/".length);
    return {
      title: `Is ${domain} Down? Active Website Status Checker – DownOrUp`,
      description: `Instantly check if ${domain} is currently down or experiencing a global outage. Get SSL validity, latency, port telemetry, and AI diagnosis.`
    };
  }
  if (path === "/ip-ping-tester") {
    return {
      title: "Free Network IP Ping Tester & Low Latency Tool – DownOrUp",
      description: "Perform real-time packet transmission tests to determine minimum, maximum, and average diagnostic latency metrics."
    };
  }
  if (path === "/dns-lookup") {
    return {
      title: "Advanced DNS Lookup & TTL Resolver Tool – DownOrUp",
      description: "Fetch dynamic A, AAAA, MX, TXT, CNAME, and NS records instantly with comprehensive TTL parameter mappings."
    };
  }
  if (path === "/ip-lookup") {
    return {
      title: "IP Tracker, Geographic Details & Whois IP Lookup – DownOrUp",
      description: "Geolocate IPv4 or IPv6 parameters to resolve ISP registries, regional network nodes, and registry configurations."
    };
  }
  if (path === "/ssl-checker") {
    return {
      title: "SSL Certificate Validation & Chain Security Inspector – DownOrUp",
      description: "Verify expiration thresholds, validation chains, issuers, and SAN domains for active secure socket layers."
    };
  }
  if (path === "/http-header-checker") {
    return {
      title: "HTTPS Response Header Inspector & Security Auditer – DownOrUp",
      description: "Extract active header values, analyze missing security mechanisms, and review recommended performance directives."
    };
  }
  if (path === "/dns-propagation" || path === "/dns-propagation-checker") {
    return {
      title: "Global DNS Propagation Checker & Namespace Resolver – DownOrUp",
      description: "Audit updated zone definitions globally using independent propagation nodes across different geographic hubs."
    };
  }
  if (path === "/whois-lookup") {
    return {
      title: "Domain Whois Registry Lookup & Expiration Checker – DownOrUp",
      description: "Access authoritative domain ownership dates, registrar details, administrative parameters, and nameservers."
    };
  }
  if (path === "/port-checker") {
    return {
      title: "Open Port Checker & Severe Network Vulnerability Scanner – DownOrUp",
      description: "Audit accessibility for core server channels like HTTP (80, 443), SSH (22), FTP (21) and SQL databases."
    };
  }
  if (path === "/speed-test" || path === "/website-speed-test") {
    return {
      title: "Website Speed Test, TTFB Optimization & Page Load Analyzer – DownOrUp",
      description: "Calculate TTFB, DNS lookup delay, secure SSL socket negotiation, and receive custom performance layout suggestions."
    };
  }
  if (path === "/traceroute" || path === "/traceroute-tool") {
    return {
      title: "Visual Traceroute Tool & Geographically Parsed Network Hop Map – DownOrUp",
      description: "Trace data packages to their target destinations to visualize localized network node bottlenecks to avoid latency."
    };
  }
  if (path === "/redirect-checker") {
    return {
      title: "Recursive Redirect Chain Auditor & Loop Detector – DownOrUp",
      description: "Observe response path redirection jumps (301, 302, etc.) to discover infinite validation cycles or incorrect routes."
    };
  }
  if (path === "/screenshot-tool" || path === "/website-screenshot-tool") {
    return {
      title: "Multi-Viewport Website Screenshot Tool & Rendering Capture – DownOrUp",
      description: "Capture instant, precise responsive layouts of custom domain displays for multi-device styling audits."
    };
  }
  if (path === "/email-security" || path === "/spf-checker" || path === "/dkim-checker" || path === "/dmarc-checker") {
    return {
      title: "Email Security Suite: SPF, DKIM, and DMARC Checkers – DownOrUp",
      description: "Verify configuration standards for automated spf, dkim and dmarc validation rules to enforce inbox alignment."
    };
  }
  if (path === "/blacklist-scanner" || path === "/blacklist-checker") {
    return {
      title: "Spam & Security Domain Blacklist Checker – DownOrUp",
      description: "Scan domains against major industry blacklist catalogs to check safe/suspicious server reputation flags."
    };
  }
  if (path === "/domain-age" || path === "/domain-age-checker") {
    return {
      title: "Domain Age Checker – Registration & Lifespan Tracker – DownOrUp",
      description: "Determine the exact operational duration since initial registry creation for specific secure namespaces."
    };
  }
  if (path === "/blog") {
    return {
      title: "Performance, DNS, SSL & Networking Resource Blog – DownOrUp",
      description: "Learn why websites crash, how traceroute packets analyze hops, optimizing DNS resolution speeds, and security practices."
    };
  }
  if (path === "/about-us") {
    return {
      title: "About Us – Corporate Mission, Integrity, & Global Staff – DownOrUp",
      description: "Discover our mission in diagnostic telemetry. Meet our engineering talent deploying robust cloud inspection nodes."
    };
  }
  if (path === "/editorial-policy") {
    return {
      title: "Editorial Policy & Objectivity Standards – DownOrUp",
      description: "Review our guidelines for editorial accuracy, peer-reviewed network tutorials, and factual data integrity frameworks."
    };
  }
  if (path === "/methodology") {
    return {
      title: "Measurement Methodology & Uptime Calculation – DownOrUp",
      description: "Audit the server execution parameters under which latency metrics and global node reachability indexes are generated."
    };
  }
  if (path === "/data-sources") {
    return {
      title: "Authoritative Diagnostic Data Sources & API Sync – DownOrUp",
      description: "Learn more about our backend network telemetry, whois registries, security feeds, and cloud lookup providers."
    };
  }
  if (path === "/contact-us") {
    return {
      title: "Contact Us & High Priority System Support – DownOrUp",
      description: "Reach our network administration, compliance, or developer relations divisions regarding tool accuracy."
    };
  }
  if (path === "/privacy-policy") {
    return {
      title: "Privacy Policy, System Logs, & Analytical Tracking – DownOrUp",
      description: "Review our strict telemetry storage parameters, analytical processing terms, and total absence of user selling."
    };
  }
  if (path === "/terms-and-conditions") {
    return {
      title: "Terms and Conditions & System Telemetry Acceptable Use – DownOrUp",
      description: "Understand requirements surrounding public diagnostic usage, automation constraints, and trademark guidelines."
    };
  }
  if (path === "/disclaimer") {
    return {
      title: "Compliance Disclaimer & Metric Integrity Statement – DownOrUp",
      description: "Familiarize yourself with our liability limitations, real-time error accuracy thresholds, and platform performance expectations."
    };
  }
  if (path === "/cookie-policy") {
    return {
      title: "Cookie Policy & Local Session Management Rules – DownOrUp",
      description: "We utilize local token variables solely for responsive theme adjustments and user tool search preferences."
    };
  }
  if (path === "/dmca") {
    return {
      title: "DMCA Copyright Compliance Policy – DownOrUp",
      description: "Our protocol for registering copyright infringement issues regarding static tutorials or structural content."
    };
  }
  if (path === "/acceptable-use-policy") {
    return {
      title: "Acceptable Use Policy – Prevention of Brute Scraping – DownOrUp",
      description: "Detailed operational boundaries for client testing frequencies, lookup scripts, and network querying."
    };
  }

  return {
    title: "DownOrUp – Website Status Checker, IP Ping Test, DNS Lookup & SSL Checker",
    description: "Check website availability, run IP ping tests, DNS lookups, SSL checks, traceroutes, and network diagnostics with DownOrUp. Fast, free, and accurate."
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
    <div className="min-h-screen flex flex-col bg-slate-50/20 dark:bg-slate-950 dark:text-gray-100 transition-colors duration-300" id="app-viewport">
      <Header currentPath={currentPath} onNavigate={navigate} />
      <main className="flex-grow">{renderContent()}</main>
      <Footer onNavigate={navigate} />
    </div>
  );
}
