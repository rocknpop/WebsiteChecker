import { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useSEO } from "./hooks/useSEO";

// Page imports
import Home from "./pages/Home";
import MyIpPage from "./pages/MyIp";
import {
  PrivacyPolicyPage,
  TermsPage,
  DisclaimerPage,
  CookiePolicyPage,
  DmcaPage,
  AcceptableUsePage,
  AboutUsPage,
  EditorialPolicyPage,
  MethodologyPage,
  DataSourcesPage,
  HowCheckedPage,
  TransparencyReportPage,
  ContactUsPage
} from "./pages/LegalPages";

// Route to SEO Metadata Mapper (Full EEAT & Programmatic SEO scale support)
function getSeoMetadata(path: string): { title: string; description: string } {
  // 1. Core General Platform SEO Matches
  if (path === "/" || path === "/index.html") {
    return {
      title: "Username Availability Checker – Check Instagram, TikTok, YouTube & X handles – HandleHunt",
      description: "Secure a consistent online brand identity. Concurrently check username availability across Instagram, TikTok, YouTube, X, Reddit, GitHub, Snapchat, and Threads instantly."
    };
  }

  // 2. Programmatic SEO Platform Checkers
  if (path === "/instagram-username-checker") {
    return {
      title: "Free Instagram Username Checker – Check Instagram Handle Availability – HandleHunt",
      description: "Instantly check custom Instagram username availability. Verify is @handle taken, review brandability guidelines, and discover premium available Instagram names."
    };
  }
  if (path === "/tiktok-username-checker") {
    return {
      title: "TikTok Username Checker – Check TikTok Handles Instantly – HandleHunt",
      description: "Verify TikTok handle availability. Audit active profile registry slots concurrently and protect your social network branding before registering."
    };
  }
  if (path === "/youtube-username-checker") {
    return {
      title: "YouTube Handle Checker – Check Custom @Handles Availability – HandleHunt",
      description: "Validate custom YouTube Handles with @ prefix instantly. Guarantee trademark immunity and obtain clean creator suggestions."
    };
  }
  if (path === "/x-username-checker") {
    return {
      title: "X / Twitter Username Checker – Verify X Handle Availability – HandleHunt",
      description: "Check X profiles in real-time. Keep character limits within 15 count values and review alternative suggestions instantly."
    };
  }
  if (path === "/github-username-checker") {
    return {
      title: "GitHub Handle Checker – Check Dev Namespaces Instantly – HandleHunt",
      description: "Check GitHub username availability for personal portolios, organizations, or corporate repos. Maintain tech alignment instantly."
    };
  }
  if (path === "/reddit-username-checker") {
    return {
      title: "Reddit Username Checker – Scan Reddit Usernames – HandleHunt",
      description: "Check Reddit pseudonym availability. Ensure complete anonymized brand consistency and secure unique available nicknames."
    };
  }

  // 3. Curated Programmatic Category Pages
  if (path === "/gamer-usernames") {
    return {
      title: "Cool Gamer Username Ideas – Explore Available Gaming Nicknames – HandleHunt",
      description: "Unlock bold, unique and fully premium gaming usernames. Copy instantly or scan live availability across 10 prominent platforms."
    };
  }
  if (path === "/creator-usernames") {
    return {
      title: "Creative Username Ideas for Influencers & Videographers – HandleHunt",
      description: "Browse high-appeal ideas for video creators, bloggers, and visual artists. Check multi-network availability with one click."
    };
  }
  if (path === "/business-usernames") {
    return {
      title: "Professional Business Brand Names & Clean Identifiers – HandleHunt",
      description: "Find highly memorable, authority-driven names for consulting, services, and local agencies. Ensure cohesive brand handles."
    };
  }
  if (path === "/startup-usernames") {
    return {
      title: "Brandable Startup Names & Consistent Tech Handles – HandleHunt",
      description: "Identify high-growth modern tech identities. Complete brand checks for modern SaaS products with matching handles."
    };
  }
  if (path === "/influencer-usernames") {
    return {
      title: "Premium Influencer Username Ideas & Brand Handles – HandleHunt",
      description: "Discover clean aesthetic ideas for social creators, lifestyle bloggers, and fashion leaders. Securability assured."
    };
  }

  // 4. Fallback Long-Tail SEO wildcard routes
  if (path.startsWith("/username/")) {
    const user = path.substring("/username/".length);
    return {
      title: `Is @${user} Available? Social Username Check Report – HandleHunt`,
      description: `View full availability, brandability metrics, and global name consistency ratio for username "${user}" across 10 social networks.`
    };
  }

  // 5. Technical utility
  if (path === "/my-ip") {
    return {
      title: "What Is My IP Address? Check Public IP, Geolocation Coordinates – HandleHunt",
      description: "Locate your live IPv4/IPv6 address, discover internet service provider (ISP) parameters, and test browser connection security."
    };
  }

  // 6. EEAT Validation Pages
  if (path === "/about-us") {
    return {
      title: "About Us – Our Mission, Strategy & Engineering – HandleHunt",
      description: "Meet the team and branding experts delivering reliable username checking and consistency insights."
    };
  }
  if (path === "/editorial-policy") {
    return {
      title: "Editorial Policy & Data Integrity Guidelines – HandleHunt",
      description: "We focus on transparent accuracy. Read how we construct brand audits and recommendations without bias."
    };
  }
  if (path === "/methodology") {
    return {
      title: "Measurement & Concurrency Checking Methodology – HandleHunt",
      description: "Review our parallel retrieval pipeline architectures, response time averages, and error fallbacks."
    };
  }
  if (path === "/data-sources") {
    return {
      title: "Authoritative Checking Data Sources & APIs – HandleHunt",
      description: "Detailed compilation of public networking nodes, DNS lookups, and registries queried in our diagnostic checks."
    };
  }
  if (path === "/how-checked") {
    return {
      title: "How Social Media Username Availability Is Checked – HandleHunt",
      description: "Get answers to how status responses are verified behind-the-scenes, and why locked accounts return specific outcomes."
    };
  }
  if (path === "/transparency") {
    return {
      title: "Transparency and Zero-Telemetry Solvency Report – HandleHunt",
      description: "Review our security commitment. Your searches are private, never front-run, and never sold to aggregators."
    };
  }
  if (path === "/contact-us") {
    return {
      title: "Contact Us – High-Priority Support Admin – HandleHunt",
      description: "Reach our support coordinator regarding system errors, branding proposals, or trademark disputes."
    };
  }

  // 7. Core Legal compliance mappings
  if (path === "/privacy-policy") {
    return {
      title: "Privacy Policy | GDPR & CCPA Compliance – HandleHunt",
      description: "We protect search telemetry. Read how we isolate search queries, localStorage settings, and Google AdSense parameters."
    };
  }
  if (path === "/terms-and-conditions") {
    return {
      title: "Terms and Conditions of Use – HandleHunt",
      description: "Platform guidelines and user agreement terms regarding fair usage of our free check status intelligence."
    };
  }
  if (path === "/disclaimer") {
    return {
      title: "Legal & Corporate Trademark Disclaimer – HandleHunt",
      description: "All corporate trademark symbols are properties of their respective social networks. Read fair-use disclosures."
    };
  }
  if (path === "/cookie-policy") {
    return {
      title: "Cookie Policy – Interface Caching Preferences – HandleHunt",
      description: "We cookies to persist your custom bookmarked name lists without requiring login accounts."
    };
  }
  if (path === "/dmca") {
    return {
      title: "DMCA Copyright Compliance Policy – HandleHunt",
      description: "Guidelines and instructions to submit intellectual property takedowns or verify trademark registration."
    };
  }
  if (path === "/acceptable-use-policy") {
    return {
      title: "Acceptable Use Policy – Prevention of Bulk Scraping – HandleHunt",
      description: "Fair-use boundaries. Automation crawlers and continuous programmatic stress checks are strictly prohibited."
    };
  }

  return {
    title: "HandleHunt – Check Username Availability Across Social Media Channels",
    description: "Scan username availability on Instagram, TikTok, YouTube, X, Reddit, and GitHub. Secure a consistent online visual presence."
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
    // 1. Programmatic SEO Platform paths and Category paths fall directly inside the upgraded Home console with dynamic configurations
    const isPlatformPath = [
      "/instagram-username-checker",
      "/tiktok-username-checker",
      "/youtube-username-checker",
      "/x-username-checker",
      "/github-username-checker",
      "/reddit-username-checker"
    ].includes(currentPath);

    const isCategoryPath = [
      "/gamer-usernames",
      "/creator-usernames",
      "/business-usernames",
      "/startup-usernames",
      "/influencer-usernames"
    ].includes(currentPath);

    const isUsernameWildcard = currentPath.startsWith("/username/");

    if (currentPath === "/" || currentPath === "/index.html" || isPlatformPath || isCategoryPath || isUsernameWildcard) {
      return <Home currentPath={currentPath} onNavigate={navigate} />;
    }

    if (currentPath === "/my-ip") {
      return <MyIpPage />;
    }

    // 2. Trust EEAT & Legal Compliance views
    if (currentPath === "/privacy-policy") return <PrivacyPolicyPage />;
    if (currentPath === "/terms-and-conditions") return <TermsPage />;
    if (currentPath === "/disclaimer") return <DisclaimerPage />;
    if (currentPath === "/cookie-policy") return <CookiePolicyPage />;
    if (currentPath === "/dmca") return <DmcaPage />;
    if (currentPath === "/acceptable-use-policy") return <AcceptableUsePage />;

    if (currentPath === "/about-us") return <AboutUsPage />;
    if (currentPath === "/editorial-policy") return <EditorialPolicyPage />;
    if (currentPath === "/methodology") return <MethodologyPage />;
    if (currentPath === "/data-sources") return <DataSourcesPage />;
    if (currentPath === "/how-checked") return <HowCheckedPage />;
    if (currentPath === "/transparency") return <TransparencyReportPage />;
    if (currentPath === "/contact-us") return <ContactUsPage />;

    // Fallback error-safe 404 handler
    return (
      <div className="max-w-md mx-auto py-24 text-center px-4">
        <h2 className="text-3xl font-display font-extrabold text-gray-900 mb-2">404 - Diagnostic Error</h2>
        <p className="text-sm text-gray-500 mb-6 font-mono">Unmapped namespace trajectory.</p>
        <button
          onClick={() => navigate("/")}
          className="bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold px-6 py-2.5 rounded-xl transition-all"
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
