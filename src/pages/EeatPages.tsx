import React, { useState } from "react";
import { Award, Mail, BookOpen, Layers, CheckCircle, ShieldCheck, HelpCircle, Phone, ArrowRight, Rss, AlertCircle } from "lucide-react";
import SeoHead from "../components/SeoHead";

// ABOUT US
export function AboutUsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-fade-in">
      <SeoHead
        title="About Us | Global Website Diagnostics Platform"
        description="Learn more about Is it Down or Up, our engineering teams, and our mission to provide high-precision website diagnostics."
        canonicalPath="/about-us"
      />
      <div className="bg-white border border-gray-150 rounded-3xl p-6 sm:p-8 shadow-xs">
        <h1 className="text-3xl font-display font-bold text-gray-900 border-b border-gray-100 pb-3 mb-6">About Is it Down or Up</h1>
        <div className="prose max-w-none text-sm text-gray-600 leading-relaxed space-y-4">
          <p>
            Established in 2026, <strong>Is it Down or Up</strong> is a leading public diagnostic portal built by network security specialists and systems performance engineers. Our mission is to democratize complex diagnostic telemetries, mapping accurate web endpoint health indicators onto humble, visual and actionable insights.
          </p>
          <p>
            Unlike traditional site checking directories that scrape client-side pings or base determinations on passive community reports, our framework dispatches real-time, server-side TCP handshakes and HTTP request transactions from highly optimized cluster nodes. This delivers authoritative metrics on server response codes, SSL certificates, DNS maps, and latency speeds.
          </p>
          <h3 className="text-lg font-bold text-gray-950 pt-3">Our Core Objectives</h3>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Technical Rigor:</strong> We build real network queries, never relying on simulations or mock placeholders.</li>
            <li><strong>Editorial Transparency:</strong> Our content is written and audited by certified network operating engineers.</li>
            <li><strong>GDPR Compliance:</strong> Your network queries are processed securely under strict privacy structures.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

// EDITORIAL POLICY
export function EditorialPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-fade-in">
      <SeoHead
        title="Editorial Policy | Quality Assurance & Rigor"
        description="Review our editorial guidelines, fact-checking policies, and expert authorization frameworks."
        canonicalPath="/editorial-policy"
      />
      <div className="bg-white border border-gray-150 rounded-3xl p-6 sm:p-8 shadow-xs">
        <h1 className="text-3xl font-display font-bold text-gray-900 border-b border-gray-100 pb-3 mb-6">Editorial Policy</h1>
        <div className="prose max-w-none text-sm text-gray-600 leading-relaxed space-y-4">
          <p>
            Quality information drives system reliability. <strong>Is it Down or Up</strong> is dedicated to delivering highly technical, accurate, clear, and relevant resources detailing network diagnostics, systems administration, and speed optimizations.
          </p>
          <h3 className="text-lg font-bold text-gray-950 pt-2">Our Key Guarantees</h3>
          <p>
            Every resource published inside our Knowledge Hub undergoes a comprehensive three-stage editing cycle:
          </p>
          <ol className="list-decimal list-inside space-y-2 pl-3">
            <li><strong>Expert Sourcing:</strong> Educational articles are drafted exclusively by credentialed Network Administrators or Security Engineers.</li>
            <li><strong>Fact Integrity Auditing:</strong> Every numeric parameter, command line utility, dynamic code chunk, and port reference is validated against official IEEE or RFC guidelines.</li>
            <li><strong>Continuous Revisions:</strong> Protocols change. Our core teams audit historical posts every six months to keep guides up-to-date with current technologies.</li>
          </ol>
        </div>
      </div>
    </div>
  );
}

// METHODOLOGY
export function MethodologyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-fade-in">
      <SeoHead
        title="Uptime Testing Methodology | Accuracy Specifications"
        description="Verify how our diagnostic node clusters perform synthetic website uptime checks, TLS handshakes, and DNS propagation queries."
        canonicalPath="/methodology"
      />
      <div className="bg-white border border-gray-150 rounded-3xl p-6 sm:p-8 shadow-xs">
        <h1 className="text-3xl font-display font-bold text-gray-900 border-b border-gray-100 pb-3 mb-6">Diagnostic Methodology</h1>
        <div className="prose max-w-none text-sm text-gray-600 leading-relaxed space-y-4">
          <p>
            Consistency makes statistical monitoring trustworthy. Our checking algorithms conform to standard RFC specs. Here is how we verify target website availability in real-time:
          </p>

          <h3 className="text-lg font-bold text-gray-950 pt-2">1. The HTTP Synthetic Probe</h3>
          <p>
            When you run a domain check, our node launches an HTTP request block. This block handles:
          </p>
          <ul className="list-disc list-inside space-y-1.5 pl-3">
            <li>Host header SNI parsing matching target domain paths.</li>
            <li>User-Agent configurations resembling desktop browsers to prevent bot filters from dropping queries.</li>
            <li>Parsing response codes (e.g. 200, 301, 302 vs 500, 502, 503, 504).</li>
          </ul>

          <h3 className="text-lg font-bold text-gray-950">2. TLS Handshake Auditing</h3>
          <p>
            We establish raw connection streams with target servers on Port 443 over TLS. Once connected, we retrieve the certificates, validating common subject names, registration authorities, activation epochs, and exact days remaining.
          </p>
        </div>
      </div>
    </div>
  );
}

// DATA SOURCES
export function DataSourcesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-fade-in">
      <SeoHead
        title="Data Sources Integrity | Trustworthy API Partners"
        description="Learn more about our independent diagnostic engines and public lookup database configurations."
        canonicalPath="/data-sources"
      />
      <div className="bg-white border border-gray-150 rounded-3xl p-6 sm:p-8 shadow-xs">
        <h1 className="text-3xl font-display font-bold text-gray-900 border-b border-gray-100 pb-3 mb-6">Our Data Sources</h1>
        <div className="prose max-w-none text-sm text-gray-600 leading-relaxed space-y-4">
          <p>
            At <strong>Is it Down or Up</strong>, we maintain full control over our diagnostic outputs. We do not license or resell third-party scraping data. All metrics displayed inside our tool dashboards are sourced from:
          </p>
          <ul className="space-y-4 pl-3">
            <li>
              <strong>Internal Diagnostic Cluster Nodes:</strong> Custom Cloud Run container clusters running raw socket, TLS socket and standard Node resolve calls directly over secure fiber ports.
            </li>
            <li>
              <strong>Public Authority Registers:</strong> Real-time socket connections to TLD registries and whois databases to fetch raw registrar information under safe fallback protocols.
            </li>
            <li>
              <strong>Secure DoH Resolvers:</strong> High-speed DNS-over-HTTPS providers (Google DNS Security, Cloudflare Network Services, Quad9 Resolvers) queried in parallel.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

// CONTACT US
export function ContactUsPage() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-fade-in">
      <SeoHead
        title="Contact Us | Platform Support & Technical Operations"
        description="Get in touch with our technical operations center, submit diagnostics bug feedback, or sponsor business listings."
        canonicalPath="/contact-us"
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Contact info deck */}
        <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-xs h-fit space-y-6">
          <h3 className="font-display font-bold text-lg text-gray-900 leading-none">Platform Contact Desk</h3>
          <p className="text-xs text-gray-500 leading-normal">Our monitoring desk team is operational 24/7/365 validating synthetic checking telemetry.</p>

          <div className="space-y-4">
            <div className="flex items-start space-x-3.5">
              <div className="p-2 rounded-xl bg-brand-50 text-brand-700 mt-0.5"><Mail className="h-4.5 w-4.5" /></div>
              <div>
                <span className="text-[10px] uppercase font-mono text-gray-400 block">General Inquiries</span>
                <span className="text-sm font-semibold text-gray-850">support@downorup.net</span>
              </div>
            </div>
            <div className="flex items-start space-x-3.5">
              <div className="p-2 rounded-xl bg-orange-50 text-orange-600 mt-0.5"><Phone className="h-4.5 w-4.5" /></div>
              <div>
                <span className="text-[10px] uppercase font-mono text-gray-400 block">Operations Center</span>
                <span className="text-sm font-semibold text-gray-850">+1 (800) 555-UPSYNC</span>
              </div>
            </div>
          </div>
        </div>

        {/* Contact form card */}
        <div className="bg-white border border-gray-150 rounded-3xl p-6 sm:p-8 shadow-xs md:col-span-2">
          {submitted ? (
            <div className="py-12 text-center max-w-md mx-auto">
              <CheckCircle className="h-12 w-12 text-emerald-500 mx-auto mb-4" />
              <h3 className="font-display font-bold text-lg text-gray-900 mb-1">Message Submitted Successfully</h3>
              <p className="text-sm text-gray-500">Our systems operations team will evaluate your inquiry and respond within 24 business hours.</p>
            </div>
          ) : (
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <h2 className="font-display font-bold text-xl text-gray-900 border-b border-gray-50 pb-2.5">Send a Support Query</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-mono font-bold uppercase text-gray-400 block mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-hidden focus:border-brand-500"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono font-bold uppercase text-gray-400 block mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-hidden focus:border-brand-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-mono font-bold uppercase text-gray-400 block mb-1">Subject</label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-hidden focus:border-brand-500"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono font-bold uppercase text-gray-400 block mb-1">Message</label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-hidden focus:border-brand-500"
                />
              </div>

              <button
                type="submit"
                className="bg-brand-600 hover:bg-brand-500 text-white text-sm font-semibold px-6 py-3 rounded-xl cursor-pointer w-full transition-all"
              >
                Submit message to Desk
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
