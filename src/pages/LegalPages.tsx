import React from "react";
import SeoHead from "../components/SeoHead";

// Wrapper component for legal layouts
function LegalLayout({ title, description, path, children }: { title: string; description: string; path: string; children: React.ReactNode }) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-fade-in">
      <SeoHead title={title} description={description} canonicalPath={path} />
      <div className="bg-white border border-gray-150 rounded-3xl p-6 sm:p-10 shadow-xs">
        <h1 className="text-3xl font-display font-extrabold text-gray-900 border-b border-gray-100 pb-3 mb-6">{title}</h1>
        <article className="prose prose-blue max-w-none text-xs sm:text-sm text-gray-600 leading-relaxed space-y-4">
          {children}
        </article>
      </div>
    </div>
  );
}

// PRIVACY POLICY
export function PrivacyPolicyPage() {
  return (
    <LegalLayout
      title="Privacy Policy | GDPR & CCPA Compliance"
      description="Review our comprehensive Privacy Policy detailing how we handle diagnostic log files, IP routing caches, and cookies."
      path="/privacy-policy"
    >
      <p>Last Modified: June 19, 2026</p>
      <h3 className="text-sm font-bold text-gray-900">1. Data Storage and Diagnostic Logs</h3>
      <p>
        At <strong>Is it Down or Up</strong>, we prioritize user security. When you perform synthetic diagnostics (HTTP headers check, IP Ping, DNS checks), our Express logging servers temporarily map query telemetry to compute and output responses. This telemetry cache does not gather personal identifier datasets and is routinely scrambled inside our memory layers every 24 hours.
      </p>
      <h3 className="text-sm font-bold text-gray-900">2. Cookie Consents & GDPR Rights</h3>
      <p>
        Under European GDPR mandates, European Union visitors must authorize analytical tracking. By deploying simple localStorage settings and cookies, we track interface preferences (such as previous searches directory log in our dashboard). You can purge your browser cache or toggle browser-level settings to wipe these settings anytime. We do not sell query data or logs to public data brokers.
      </p>
    </LegalLayout>
  );
}

// TERMS AND CONDITIONS
export function TermsPage() {
  return (
    <LegalLayout
      title="Terms and Conditions of Use"
      description="Read our platform terms of service. Guidelines for fair usage of diagnostic APIs and monitoring portals."
      path="/terms-and-conditions"
    >
      <p>Last Modified: June 19, 2026</p>
      <h3 className="text-sm font-bold text-gray-900">1. Allowable Fair Usage</h3>
      <p>
        Users are granted non-exclusive, temporary access to query our public diagnostic panels. Rapid automated scraping, sequential automated stress-checking, or malicious proxy DDoS routing targeting our central Express node checking ports is strictly forbidden.
      </p>
      <h3 className="text-sm font-bold text-gray-900">2. Disclaimer of Technical Liabilities</h3>
      <p>
        Diagnostic outputs are supplied on an &quot;AS IS&quot; basis, without implied warranties of operational accuracy. We are not liable for business revenue losses occurring due to server downtime or misconfigured system metrics listed inside our dashboard checkers.
      </p>
    </LegalLayout>
  );
}

// DISCLAIMER
export function DisclaimerPage() {
  return (
    <LegalLayout
      title="Disclaimer of Service & Endorsements"
      description="Review our service disclaimers regarding independent diagnostics and third-party trademarks."
      path="/disclaimer"
    >
      <p>Last Modified: June 19, 2026</p>
      <h3 className="text-sm font-bold text-gray-900">1. Independent Platform Disclosures</h3>
      <p>
        <strong>Is it Down or Up</strong> is an independent service analyzer and is in check status independent of the target domains listed (including Google, Amazon, Meta, Netflix, etc.). All logo names, trademark symbols, and corporate identifiers remain the exclusive assets of their respective registries.
      </p>
      <h3 className="text-sm font-bold text-gray-900">2. External References</h3>
      <p>
        Links provided to external web directories represent technical resources. We do not guarantee continuous safety, accuracy, compliance, or availability of external endpoints.
      </p>
    </LegalLayout>
  );
}

// COOKIE POLICY
export function CookiePolicyPage() {
  return (
    <LegalLayout
      title="Cookie Policy"
      description="How we utilize cookie files and caching to optimize local diagnostic dashboards and search history lists."
      path="/cookie-policy"
    >
      <p>Last Modified: June 19, 2026</p>
      <p>
        Our platform utilizes essential and analytical cookie files. Essential cookies process basic secure inputs. Analytical cookies aggregate browser statistics and coordinate with GA4 setups to log aggregate page visits without compiling user-specific secrets.
      </p>
    </LegalLayout>
  );
}

// DMCA POLICY
export function DmcaPage() {
  return (
    <LegalLayout
      title="Digital Millennium Copyright Act (DMCA) Policy"
      description="Learn how to report intellectual property infringements or copyright infringements on our diagnostics platform."
      path="/dmca"
    >
      <p>Last Modified: June 19, 2026</p>
      <p>
        If you identify any technical content, blog article, or visual asset on our platform that infringes upon your copyright under DMCA guidelines, submit a formal takedown request to our compliance officer at <strong>dmca@isitdownrightnow.info</strong>. Ensure your inquiry includes physical signatures, references to copyrighted URLs, and validation parameters.
      </p>
    </LegalLayout>
  );
}

// ACCEPTABLE USE POLICY
export function AcceptableUsePage() {
  return (
    <LegalLayout
      title="Acceptable Use Policy"
      description="Rules of conduct and scraping prevention policies protecting our diagnosis node servers."
      path="/acceptable-use-policy"
    >
      <p>Last Modified: June 19, 2026</p>
      <p>
        You are strictly forbidden from writing automated scraping scripts or headless crawlers targeting our public API paths (such as `api/check-status` or `api/ping`) at high frequencies. Such behavior saturates public queue threads, degrading diagnostics operations. Violators will face automatic rate-limits and IP firewall blocking.
      </p>
    </LegalLayout>
  );
}
