import React, { useState } from "react";
import { Search, Globe, Shield, RefreshCw, Key, ArrowRight, Server, CheckCircle2, AlertCircle, HelpCircle, Activity, Play, Info, MapPin } from "lucide-react";
import SeoHead from "../components/SeoHead";

// Helper for schema generators
const makeBreadcrumbSchema = (toolName: string, path: string) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Diagnostics Center", "item": window.location.origin },
    { "@type": "ListItem", "position": 2, "name": toolName, "item": `${window.location.origin}${path}` }
  ]
});

// ==========================================
// 1. DNS RECORD LOOKUP
// ==========================================
export function DnsLookupPage({ onNavigate }: { onNavigate: (path: string) => void }) {
  const [domain, setDomain] = useState("");
  const [result, setResult] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!domain.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const resp = await fetch(`/api/dns-lookup?domain=${encodeURIComponent(domain.trim())}`);
      if (resp.ok) {
        setResult(await resp.json());
      } else {
        const errJson = await resp.json();
        setError(errJson.error || "Failed resolving records.");
      }
    } catch (err) {
      setError("Failed to query DNS resolver backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-fade-in">
      <SeoHead
        title="DNS Lookup Tool | Resolve A, AAAA, MX, TXT Records"
        description="Lookup current DNS records for any domain globally. Instantly extract A, MX, TXT, NS, and CNAME zone mapping data."
        canonicalPath="/dns-lookup"
        schemas={[makeBreadcrumbSchema("DNS Lookup", "/dns-lookup")]}
      />

      <div className="text-center mb-8">
        <h1 className="text-3xl font-display font-extrabold text-gray-900 tracking-tight">DNS Record Lookup Utility</h1>
        <p className="text-sm text-gray-500 mt-2">Extract dynamic zone files and resolved routing records from authoritative global resolvers.</p>
      </div>

      <form onSubmit={handleLookup} className="bg-white p-2 rounded-2xl border border-gray-200 shadow-xs flex flex-col sm:flex-row gap-2 mb-8">
        <input
          type="text"
          placeholder="Enter website domain, e.g., cloudflare.com"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          className="flex-1 px-4 py-3 bg-transparent border-none text-gray-800 focus:outline-hidden font-mono"
        />
        <button type="submit" className="bg-brand-600 hover:bg-brand-500 text-white font-medium px-6 py-3 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer">
          {loading ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4" />}
          <span>Resolve Domain dns</span>
        </button>
      </form>

      {error && <div className="bg-red-50 text-red-700 p-4 rounded-xl border border-red-100 text-sm text-center mb-8">{error}</div>}

      {result && (
        <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-xs space-y-6 mb-12">
          <h3 className="font-display font-bold text-lg text-gray-900 border-b border-gray-50 pb-2">Record listings for: {result.domain}</h3>

          {/* Record cards */}
          {["A", "AAAA", "MX", "TXT", "NS", "CNAME"].map((type) => {
            const records = result[type];
            return (
              <div key={type} className="border-b border-gray-50 pb-4 last:border-none">
                <span className="font-mono text-xs font-bold text-gray-400 block mb-2">{type} Records</span>
                {!records || records.length === 0 ? (
                  <span className="text-xs text-gray-400 italic">No {type} records resolved for this domain.</span>
                ) : (
                  <div className="space-y-1">
                    {records.map((rec: any, i: number) => (
                      <div key={i} className="font-mono text-xs bg-gray-50 p-2.5 rounded-lg text-gray-700">
                        {type === "MX" ? `Priority: ${rec.priority} | Exchange: ${rec.exchange}` :
                         type === "TXT" ? rec.join(" ") : String(rec)}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Unique Prose Content & FAQs */}
      <div className="bg-white border border-gray-100 rounded-2xl p-6 mt-12 shadow-xs prose max-w-none">
        <h3 className="text-lg font-bold text-gray-900 mb-2">What is a DNS Record?</h3>
        <p className="text-sm text-gray-600 leading-relaxed mb-6">
          A Domain Name System (DNS) zone record acts as a pointer guiding web queries to matching destination servers. A A-Record corresponds to IPv4 hosting addresses. A MX-Record indexes mail servers handling custom domain emails, and TXT-records catalog verification identifiers like SPF, preventing server email spoofing.
        </p>

        <h4 className="text-md font-bold text-gray-800 mb-3">Lookup FAQ</h4>
        <div className="space-y-4">
          <div>
            <span className="font-bold text-xs text-gray-700 block">Q: How fast do DNS updates takes effect globally?</span>
            <span className="text-xs text-gray-500 block mt-1">Updates propagation can take in-between 1 minute and 48 hours depending on your Time-To-Live (TTL) configuration configurations.</span>
          </div>
          <div>
            <span className="font-bold text-xs text-gray-700 block">Q: Why did my TXT or MX check report zero records?</span>
            <span className="text-xs text-gray-500 block mt-1">Only domains equipped with mail exchange configurations or verification hashes will return TXT/MX records.</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 2. IP & GEOLOCATION RESOLVER
// ==========================================
export function IpLookupPage() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const resp = await fetch(`/api/ip-lookup?query=${encodeURIComponent(query.trim())}`);
      if (resp.ok) {
        setResult(await resp.json());
      } else {
        const errorJson = await resp.json();
        setError(errorJson.error || "Failed query.");
      }
    } catch (err) {
      setError("Endpoint connection bottleneck.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-fade-in">
      <SeoHead
        title="Whois IP Lookup Tool | Geo Mapping Reverse Resolver"
        description="Verify public IP address geo mappings, host providers, and reverse-resolved pointer records globally."
        canonicalPath="/ip-lookup"
        schemas={[makeBreadcrumbSchema("IP Lookup", "/ip-lookup")]}
      />

      <div className="text-center mb-8">
        <h1 className="text-3xl font-display font-extrabold text-gray-900 tracking-tight">IP Address & Location Resolver</h1>
        <p className="text-sm text-gray-500 mt-2">Deduce physical server hosting regions, networks, autonomous systems (ASN) and hostnames.</p>
      </div>

      <form onSubmit={handleLookup} className="bg-white p-2 rounded-2xl border border-gray-200 shadow-xs flex flex-col sm:flex-row gap-2 mb-8">
        <input
          type="text"
          placeholder="Enter IP or Domain (e.g., 8.8.8.8, amazon.com)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 px-4 py-3 bg-transparent border-none text-gray-800 focus:outline-hidden font-mono"
        />
        <button type="submit" className="bg-brand-600 hover:bg-brand-500 text-white font-medium px-6 py-3 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer">
          {loading ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
          <span>Resolve Geo IP</span>
        </button>
      </form>

      {error && <div className="bg-red-50 text-red-700 p-4 rounded-xl text-sm text-center mb-8">{error}</div>}

      {result && (
        <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-xs mb-12 space-y-6">
          <div className="flex items-center space-x-2 pb-3 border-b border-gray-100">
            <MapPin className="h-5 w-5 text-red-500" />
            <h3 className="font-display font-bold text-lg text-gray-900">Resolved Mapping Core Facts</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-xl">
              <span className="font-mono text-[10px] text-gray-400 block uppercase">Query Target</span>
              <span className="font-mono text-sm font-bold text-gray-800">{result.input}</span>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl">
              <span className="font-mono text-[10px] text-gray-400 block uppercase">Calculated IP</span>
              <span className="font-mono text-sm font-bold text-brand-600">{result.ip}</span>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl col-span-2">
              <span className="font-mono text-[10px] text-gray-400 block uppercase">PTR Hostname / Domain</span>
              <span className="font-mono text-sm font-semibold text-gray-700">{result.domain || "N/A"}</span>
            </div>
          </div>
        </div>
      )}

      {/* SEO prose */}
      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-xs prose max-w-none">
        <h3 className="text-lg font-bold text-gray-900 mb-2">Why IP Geolocation Is Critical</h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          Behind every dynamic endpoint lies a Physical Server Rack routed across geographical Coordinate Zones. When optimizing server speed, locating origin servers physically helps CDN nodes optimize cached routes.
        </p>
      </div>
    </div>
  );
}

// ==========================================
// 3. SSL VERIFY SUITE
// ==========================================
export function SslCheckerPage() {
  const [domain, setDomain] = useState("");
  const [result, setResult] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSsl = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!domain.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const resp = await fetch(`/api/ssl-checker?domain=${encodeURIComponent(domain.trim())}`);
      if (resp.ok) {
        setResult(await resp.json());
      } else {
        const errorJson = await resp.json();
        setError(errorJson.error || "No TLS connection could be made.");
      }
    } catch (err) {
      setError("Failed connecting to secure SSL checker module.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-fade-in">
      <SeoHead
        title="SSL Checker | Test Certificate Chain Validity"
        description="Run deep cryptographic handshakes to test SSL certificates. Verify expires, registration issues, signatures, common names, and trust chains."
        canonicalPath="/ssl-checker"
        schemas={[makeBreadcrumbSchema("SSL Checker", "/ssl-checker")]}
      />

      <div className="text-center mb-8">
        <h1 className="text-3xl font-display font-extrabold text-gray-900 tracking-tight">SSL TLS Certificate Auditor</h1>
        <p className="text-sm text-gray-500 mt-2">Audit SSL/TLS handshake chains, expiration limits, hashing fingerprints, and cryptographic issuers.</p>
      </div>

      <form onSubmit={handleSsl} className="bg-white p-2 rounded-2xl border border-gray-200 shadow-xs flex flex-col sm:flex-row gap-2 mb-8">
        <input
          type="text"
          placeholder="Enter SSL domain (e.g., github.com)"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          className="flex-1 px-4 py-3 bg-transparent border-none text-gray-800 focus:outline-hidden font-mono"
        />
        <button type="submit" className="bg-brand-600 hover:bg-brand-500 text-white font-medium px-6 py-3 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer">
          {loading ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Key className="h-4 w-4" />}
          <span>Verify SSL Certificate</span>
        </button>
      </form>

      {error && <div className="bg-red-50 text-red-700 p-4 rounded-xl text-sm text-center mb-8">{error}</div>}

      {result && (
        <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-xs mb-12 space-y-6">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <div>
              <span className="text-[10px] font-mono text-gray-400 block uppercase">SSL Certificate details for:</span>
              <span className="font-display font-bold text-lg text-gray-900">{result.domain}</span>
            </div>
            <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
              result.isValid ? "text-emerald-700 bg-emerald-50" : "text-red-700 bg-red-50"
            }`}>
              {result.isValid ? "Certificate is Valid" : "Chain expired / Mismatched"}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-xl">
              <span className="text-[10px] font-mono text-gray-400 block uppercase">Issuer Organization</span>
              <span className="text-sm font-semibold text-gray-800">{result.issuer.organization || result.issuer.commonName}</span>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl">
              <span className="text-[10px] font-mono text-gray-400 block uppercase">Issuer Common Name</span>
              <span className="text-sm font-semibold text-gray-700">{result.issuer.commonName}</span>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl">
              <span className="text-[10px] font-mono text-gray-400 block uppercase">Subject Common Name</span>
              <span className="text-sm font-semibold text-gray-800">{result.subject.commonName}</span>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl">
              <span className="text-[10px] font-mono text-gray-400 block uppercase">Days Remaining</span>
              <span className={`text-sm font-mono font-bold ${result.daysRemaining < 15 ? "text-red-600 animate-pulse" : "text-brand-600"}`}>
                {result.daysRemaining} days remaining
              </span>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl">
              <span className="text-[10px] font-mono text-gray-400 block uppercase">Activation Date</span>
              <span className="text-xs font-mono text-gray-600">{new Date(result.validFrom).toLocaleDateString()}</span>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl">
              <span className="text-[10px] font-mono text-gray-400 block uppercase">Expiration Date</span>
              <span className="text-xs font-mono text-gray-600">{new Date(result.validTo).toLocaleDateString()}</span>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl col-span-2">
              <span className="text-[10px] font-mono text-gray-400 block uppercase">SHA-256 Fingerprint</span>
              <span className="text-[10px] font-mono text-gray-500 break-all">{result.fingerprint256}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 4. HTTP RESPONSES HEADER CHECKER
// ==========================================
export function HttpHeaderCheckerPage() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFetch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const resp = await fetch(`/api/check-status?url=${encodeURIComponent(url.trim())}`);
      if (resp.ok) {
        setResult(await resp.json());
      } else {
        const errorJson = await resp.json();
        setError(errorJson.error || "Unable to retrieve HTTP response.");
      }
    } catch (err) {
      setError("Error connecting to diagnostic crawler nodes.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-fade-in">
      <SeoHead
        title="HTTP Header Checker | Analyze Response Headers"
        description="Analyze HTTP headers returned from target servers. Verify security rules, encoding wrappers, cache commands, and browser CSP."
        canonicalPath="/http-header-checker"
        schemas={[makeBreadcrumbSchema("HTTP Header Checker", "/http-header-checker")]}
      />

      <div className="text-center mb-8">
        <h1 className="text-3xl font-display font-extrabold text-gray-900 tracking-tight font-sans">HTTP Response Header Auditor</h1>
        <p className="text-sm text-gray-500 mt-2">Check server configurations, security headers (CSP, HSTS), server platforms, and cache control arrays.</p>
      </div>

      <form onSubmit={handleFetch} className="bg-white p-2 rounded-2xl border border-gray-200 shadow-xs flex flex-col sm:flex-row gap-2 mb-8">
        <input
          type="text"
          placeholder="Enter website URL (e.g., https://amazon.com)"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="flex-1 px-4 py-3 bg-transparent border-none text-gray-800 focus:outline-hidden font-mono"
        />
        <button type="submit" className="bg-brand-600 hover:bg-brand-500 text-white font-medium px-6 py-3 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer">
          {loading ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Server className="h-4 w-4" />}
          <span>Extract Response Headers</span>
        </button>
      </form>

      {error && <div className="bg-red-50 text-red-700 p-4 rounded-xl text-sm text-center mb-8">{error}</div>}

      {result && (
        <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-xs mb-12 space-y-6">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <div>
              <span className="font-mono text-xs text-gray-400 block">HTTP Request target URL</span>
              <span className="font-mono text-sm font-semibold text-gray-800">{result.fullUrl}</span>
            </div>
            <div className="text-right">
              <span className="font-mono text-xs text-gray-400 block">Response Code</span>
              <span className="font-mono text-sm font-bold text-brand-600">{result.statusCode} {result.statusText}</span>
            </div>
          </div>

          <h4 className="font-display font-bold text-sm text-gray-800 uppercase tracking-wider">Returned Header keypairs</h4>
          <div className="bg-slate-950 text-emerald-400 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-slate-900">
            {Object.entries(result.headers).map(([key, val]: any) => (
              <div key={key} className="py-1 border-b border-emerald-950 last:border-none">
                <span className="text-sky-300 font-semibold">{key}:</span> <span className="text-white">{val}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 5. DNS PROPAGATION CHECKER
// ==========================================
export function DnsPropagationPage() {
  const [host, setHost] = useState("");
  const [recordType, setRecordType] = useState("A");
  const [result, setResult] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!host.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const resp = await fetch(`/api/dns-propagation?host=${encodeURIComponent(host.trim())}&type=${recordType}`);
      if (resp.ok) {
        setResult(await resp.json());
      } else {
        const errorJson = await resp.json();
        setError(errorJson.error || "Connection timed out checking nodes.");
      }
    } catch (err) {
      setError("Failed contacting DNS propagation telemetry node.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-fade-in">
      <SeoHead
        title="DNS Propagation Checker | Global DNS Resolution Monitor"
        description="Monitor current DNS propagation across multiple geographic nodes globally. Audit resolved IP consistency."
        canonicalPath="/dns-propagation"
        schemas={[makeBreadcrumbSchema("DNS Propagation Checker", "/dns-propagation")]}
      />

      <div className="text-center mb-8">
        <h1 className="text-3xl font-display font-extrabold text-gray-900 tracking-tight">DNS Propagation Telemetry</h1>
        <p className="text-sm text-gray-500 mt-2">Deduce record sync states globally. Scan parallel queries across three distinct geographical/network DNS nodes.</p>
      </div>

      <form onSubmit={handleTest} className="bg-white p-2 rounded-2xl border border-gray-200 shadow-xs flex flex-col sm:flex-row gap-2 mb-8">
        <div className="flex-1 flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            placeholder="Enter website hostname, e.g., google.com"
            value={host}
            onChange={(e) => setHost(e.target.value)}
            className="flex-1 px-4 py-3 bg-transparent border-none text-gray-800 focus:outline-hidden font-mono"
          />
          <select
            value={recordType}
            onChange={(e) => setRecordType(e.target.value)}
            className="bg-gray-50 border border-gray-200 font-mono text-sm font-semibold rounded-xl px-4 py-3 text-gray-700 outline-none"
          >
            <option value="A">A (IPv4)</option>
            <option value="AAAA">AAAA (IPv6)</option>
            <option value="MX">MX (Mail resolver)</option>
            <option value="TXT">TXT (Text entries)</option>
            <option value="NS">NS (Nameservers)</option>
          </select>
        </div>
        <button type="submit" className="bg-brand-600 hover:bg-brand-500 text-white font-medium px-6 py-3 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer">
          {loading ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Globe className="h-4 w-4" />}
          <span>Check Propagation</span>
        </button>
      </form>

      {error && <div className="bg-red-50 text-red-700 p-4 rounded-xl text-sm text-center mb-8">{error}</div>}

      {result && (
        <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-xs mb-12 space-y-6">
          <h4 className="font-display font-bold text-lg text-gray-900 border-b border-gray-50 pb-2">
            Propagation logs for {result.host} on record type <strong>{result.recordType}</strong>
          </h4>

          <div className="space-y-4">
            {result.nodes.map((node: any, idx: number) => (
              <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl border border-gray-50 bg-gray-50/20 gap-3">
                <div className="flex items-center space-x-2.5">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                  <div>
                    <span className="font-display font-bold text-sm text-gray-800">{node.location}</span>
                  </div>
                </div>

                <div className="space-y-1 text-left sm:text-right font-mono text-xs">
                  {node.ips.map((ip: string, i: number) => (
                    <span key={i} className="block text-gray-650 bg-white border border-gray-100 px-2 py-1 rounded-sm shadow-xs truncate max-w-sm">
                      {ip}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 6. WHOIS DATABASE LOOKUP
// ==========================================
export function WhoisLookupPage() {
  const [domain, setDomain] = useState("");
  const [result, setResult] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleWhois = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!domain.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const resp = await fetch(`/api/whois-lookup?domain=${encodeURIComponent(domain.trim())}`);
      if (resp.ok) {
        setResult(await resp.json());
      } else {
        const errorJson = await resp.json();
        setError(errorJson.error || "Database was unreachable.");
      }
    } catch (err) {
      setError("Connection to Whois crawler aborted.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-fade-in">
      <SeoHead
        title="Whois Domain Lookup | Search Registrar & Expiration"
        description="Search active Whois registry databases for registrar listings, domain update epochs, registration creations, name servers, and owner hashes."
        canonicalPath="/whois-lookup"
        schemas={[makeBreadcrumbSchema("Whois Lookup", "/whois-lookup")]}
      />

      <div className="text-center mb-8">
        <h1 className="text-3xl font-display font-extrabold text-gray-900 tracking-tight">Whois Database Lookup</h1>
        <p className="text-sm text-gray-500 mt-2">Crawl registrars directories dynamically to retrieve creation epochs, expiration guidelines and name server bindings.</p>
      </div>

      <form onSubmit={handleWhois} className="bg-white p-2 rounded-2xl border border-gray-200 shadow-xs flex flex-col sm:flex-row gap-2 mb-8">
        <input
          type="text"
          placeholder="Enter website domain name (e.g., example.org)"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          className="flex-1 px-4 py-3 bg-transparent border-none text-gray-800 focus:outline-hidden font-mono"
        />
        <button type="submit" className="bg-brand-600 hover:bg-brand-500 text-white font-medium px-6 py-3 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer">
          {loading ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Globe className="h-4 w-4" />}
          <span>Query Whois Database</span>
        </button>
      </form>

      {error && <div className="bg-red-50 text-red-700 p-4 rounded-xl text-sm text-center mb-8">{error}</div>}

      {result && (
        <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-xs mb-12 space-y-6">
          <div className="border-b border-gray-100 pb-3 flex items-center justify-between">
            <span className="font-display font-extrabold text-sm text-gray-900">Database source: {result.source}</span>
            <span className="text-[10px] font-mono text-gray-400">SAFE FALLBACK NODE READY</span>
          </div>

          {result.parsed && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b border-gray-100 pb-4">
              <div className="bg-gray-50 p-3 rounded-lg"><span className="text-[10px] block text-gray-400">Registrar</span><span className="text-xs font-semibold">{result.parsed.registrar}</span></div>
              <div className="bg-gray-50 p-3 rounded-lg"><span className="text-[10px] block text-gray-400">Creation Date</span><span className="text-xs font-semibold">{result.parsed.creationDate}</span></div>
              <div className="bg-gray-50 p-3 rounded-lg"><span className="text-[10px] block text-gray-400">Expiry Date</span><span className="text-xs font-semibold">{result.parsed.expiryDate}</span></div>
              <div className="bg-gray-50 p-3 rounded-lg"><span className="text-[10px] block text-gray-400">Nameservers</span><span className="text-xs font-semibold">{result.parsed.nameServers.join(", ")}</span></div>
            </div>
          )}

          <div className="bg-slate-950 text-emerald-400 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-slate-900 leading-relaxed max-h-96">
            <pre className="whitespace-pre-wrap">{result.raw}</pre>
          </div>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 7. NETWORK SERVICE PORT CHECKER
// ==========================================
export function PortCheckerPage() {
  const [host, setHost] = useState("");
  const [port, setPort] = useState("443");
  const [result, setResult] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const commonPorts = [
    { num: "80", label: "HTTP" },
    { num: "443", label: "HTTPS" },
    { num: "22", label: "SSH" },
    { num: "21", label: "FTP" },
    { num: "25", label: "SMTP" },
    { num: "3306", label: "MySQL" },
    { num: "5432", label: "Postgres" }
  ];

  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!host.trim() || !port.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const resp = await fetch(`/api/port-checker?host=${encodeURIComponent(host.trim())}&port=${port}`);
      if (resp.ok) {
        setResult(await resp.json());
      } else {
        const errJson = await resp.json();
        setError(errJson.error || "Port audit error.");
      }
    } catch (err) {
      setError("Endpoint check bottleneck.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-fade-in">
      <SeoHead
        title="Port Checker | Verify Custom Port Accessibility"
        description="Verify custom network open gateway ports on public domains or servers. Audit connectivity variables."
        canonicalPath="/port-checker"
        schemas={[makeBreadcrumbSchema("Port Checker", "/port-checker")]}
      />

      <div className="text-center mb-8">
        <h1 className="text-3xl font-display font-extrabold text-gray-900 tracking-tight">Public Port Gateway Auditor</h1>
        <p className="text-sm text-gray-500 mt-2">Test service reachability across public gateway firewall borders on targeted port numbers.</p>
      </div>

      <form onSubmit={handleCheck} className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs space-y-4 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block mb-1.5 font-bold">Domain Address or Host IP</label>
            <input
              type="text"
              placeholder="e.g., github.com, 8.8.8.8"
              value={host}
              onChange={(e) => setHost(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-250 focus:border-brand-500 focus:outline-hidden rounded-xl font-mono text-sm inline-block"
            />
          </div>

          <div>
            <label className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block mb-1.5 font-bold">Port Number</label>
            <input
              type="text"
              placeholder="e.g., 443"
              value={port}
              onChange={(e) => setPort(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-250 focus:border-brand-500 focus:outline-hidden rounded-xl font-mono text-sm inline-block"
            />
          </div>
        </div>

        <div className="flex border-t border-gray-50 pt-3 flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-gray-400">
            <span>Quick Presets:</span>
            {commonPorts.map((cp) => (
              <button
                type="button"
                key={cp.num}
                onClick={() => setPort(cp.num)}
                className="underline hover:text-brand-600 bg-gray-50 px-2 py-0.5 rounded-sm"
              >
                {cp.label} ({cp.num})
              </button>
            ))}
          </div>

          <button type="submit" className="bg-brand-600 hover:bg-brand-500 text-white font-medium px-6 py-2.5 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer">
            {loading ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Activity className="h-4 w-4" />}
            <span>Test Port Readiness</span>
          </button>
        </div>
      </form>

      {error && <div className="bg-red-50 text-red-700 p-4 rounded-xl text-sm text-center mb-8">{error}</div>}

      {result && (
        <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-xs mb-12 space-y-6">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <div>
              <span className="text-[10px] font-mono text-gray-400 block uppercase">Test audit findings:</span>
              <span className="font-display font-bold text-lg text-gray-900">{result.host}:{result.port}</span>
            </div>
            <span className={`px-3 py-1 text-xs font-semibold rounded-full uppercase tracking-wider ${
              result.open ? "text-emerald-700 bg-emerald-50" : "text-amber-700 bg-amber-50"
            }`}>
              {result.status}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-xl">
              <span className="text-[10px] block font-mono text-gray-400 uppercase">Gateway Port Purpose</span>
              <span className="text-sm font-semibold text-gray-800">{result.description}</span>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl">
              <span className="text-[10px] block font-mono text-gray-400 uppercase">Handshake Delay Time</span>
              <span className="text-sm font-semibold text-gray-700">{result.latency ? `${result.latency} ms` : "No Response (Filtered)"}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
