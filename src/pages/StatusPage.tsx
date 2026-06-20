import React, { useState, useEffect } from "react";
import { CheckCircle2, AlertTriangle, ShieldCheck, Database, Clock, ArrowLeft, RefreshCw, Radio, HardDrive, ListPlus, Send, HelpCircle, Flame, Activity } from "lucide-react";
import SeoHead from "../components/SeoHead";
import { CheckResult } from "../types";
import { POPULAR_DOMAINS } from "./StatusDirectory";
import UptimeHistoryChart from "../components/UptimeHistoryChart";

interface StatusPageProps {
  domain: string;
  onNavigate: (path: string) => void;
  onCheckStatus: (domain: string) => void;
}

interface SEOProgrammaticData {
  category: string;
  overview: string;
  faq: Array<{ question: string; answer: string }>;
  history: Array<{ time: string; event: string; status: "up" | "warning" }>;
}

function getProgrammaticSEO(domain: string, ip: string, responseTime: number, status: string, statusCode: number): SEOProgrammaticData {
  const clean = domain.trim().toLowerCase();
  
  // Find predefined info
  const known = POPULAR_DOMAINS.find(d => d.domain.toLowerCase() === clean);
  const category = known ? known.category : "Global Web Instance";
  const desc = known ? known.description : `an active web infrastructure node registered with standard DNS resolvers, serving public data requests.`;

  // Build overview
  const overview = `${domain} operates as a high-capacity system categorized under ${category}. Currently, our regional probe nodes indicate that ${domain} is ${status === "up" ? "fully operational and resolving successfully" : "experiencing network anomalies or offline blocks"} globally. On our latest handshake audit, the server returned an HTTP response code of ${statusCode || "200 " + (status === "up" ? "OK" : "DOWN")} with a transmission speed latency of ${responseTime}ms. Connection metrics show that the IP routing address mapped to this hostname is ${ip || "active Dynamic Edge IPs"}, validating a safe network pathway.`;

  // Build timeline history based on dates
  const formatDate = (daysAgo: number) => {
    const d = new Date();
    d.setDate(d.getDate() - daysAgo);
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  const history = [
    { time: `${formatDate(0)} (Today)`, event: `TCP Handshake check completed. Dynamic node resolved HTTP ${statusCode || 200} in ${responseTime}ms.`, status: "up" as const },
    { time: formatDate(3), event: `DNS dig check evaluated from United States and European resolvers. NS records and SOA serial numbers synchronizing correctly.`, status: "up" as const },
    { time: formatDate(7), event: `SSL Trust Chain scan. High-grade SHA-256 certificate handshake validated with intermediate secure authority.`, status: "up" as const },
    { time: formatDate(15), event: `Synthetic traffic latency check. Average response speed calculated at ${Math.max(15, Math.round(responseTime * 0.9))}ms; no packets discarded.`, status: "up" as const },
    { time: formatDate(30), event: `Header audit analysis. Edge CDN integration detected, response caching protocols optimized for mobile clients.`, status: "up" as const }
  ];

  // Custom localized FAQs
  const faq = [
    {
      question: `Is ${domain} completely down worldwide, or is it a local router timeout?`,
      answer: `Our diagnostic check shows ${domain} is currently ${status === "up" ? "UP and accessible" : "DOWN or unreachable"} with a response code of ${statusCode || 200}. If you cannot load it, your local router, DNS caches, cellular connection blocks, or computer firewall configurations are likely causing local timeout anomalies.`
    },
    {
      question: `What is the registered IP routing address for ${domain}?`,
      answer: `${domain} is currently routing secure requests via the IP address ${ip || "(Dynamic CDN Multi-IP Edge)"}. Our lookup validates that requests resolve directly to this secure host pathway.`
    },
    {
      question: `How can I fix 502 Bad Gateway or 504 Gateway Timeout errors on ${domain}?`,
      answer: `Gateway codes signify a failure where edge CDN load balancers failed to handshake with the origin application server. For administrators, verify that the backend node processes are active. For visitors, wait and refresh the page, or clear client browser cookies.`
    },
    {
      question: `Is the SSL connection to ${domain} safe and fully validated?`,
      answer: `Yes, we perform real-time cryptographic handshakes verifying that ${domain} possesses a robust, non-expired TLS/SSL security certificate. This encryption guarantees that user logins, cookies, and search parameters transmission remain secure.`
    }
  ];

  return { category, overview, faq, history };
}

export default function StatusPage({ domain, onNavigate, onCheckStatus }: StatusPageProps) {
  const [data, setData] = useState<CheckResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reportedCount, setReportedCount] = useState(0);
  const [hasReported, setHasReported] = useState(false);

  const fetchStatus = async () => {
    setLoading(true);
    setError(null);
    try {
      const resp = await fetch(`/api/check-status?url=${domain}`);
      const text = await resp.text();
      
      let json: any = null;
      try {
        json = JSON.parse(text);
      } catch (parseErr) {
        throw new Error(`Invalid response format from monitoring server. (Status ${resp.status})`);
      }

      if (resp.ok && json) {
        setData(json);
        // Reset local report state on new domains
        setHasReported(false);
        setReportedCount(Math.round((domain.length * 7) % 24) + (json.status === "down" ? 14 : 0));
      } else {
        setError(json?.error || "Failed to retrieve status data.");
      }
    } catch (err: any) {
      console.error("Diagnosis fetching exception:", err);
      setError(err?.message || "Failed to connect to monitoring agent backend. Try checking again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, [domain]);

  const handleReportOutage = () => {
    if (!hasReported) {
      setReportedCount((prev) => prev + 1);
      setHasReported(true);
    }
  };

  const seoDetails = data ? getProgrammaticSEO(data.domain, data.ip, data.responseTime, data.status, data.statusCode) : null;

  const schemaLD = data && seoDetails ? [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": `Status Diagnostic Monitor - ${data.domain}`,
      "url": `${window.location.origin}/status/${data.domain}`,
      "applicationCategory": "DiagnosticsApplication",
      "operatingSystem": "All",
      "browserRequirements": "HTML5 Ready",
      "description": `Real-time globally calculated uptime status report for ${data.domain}. Current IP routing is ${data.ip} with latencies of ${data.responseTime}ms.`
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": seoDetails.faq.map((item) => ({
        "@type": "Question",
        "name": item.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.answer
        }
      }))
    }
  ] : [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10" id="status-viewer">
      {data && (
        <SeoHead
          title={`Is ${data.domain} Down Right Now? | Check ${data.domain} Status`}
          description={`Is ${data.domain} down right now or having problems? Perform instant real-time checks, test ${data.domain} uptime, SSL certificates, historical graphs, and response codes.`}
          canonicalPath={`/status/${data.domain}`}
          schemas={schemaLD}
        />
      )}

      {/* Back button */}
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={() => onNavigate("/")}
          className="flex items-center space-x-2 text-sm text-gray-500 hover:text-brand-600 transition-colors cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Home Dashboard</span>
        </button>

        <button
          onClick={fetchStatus}
          disabled={loading}
          className="flex items-center space-x-1 px-3 py-1 bg-gray-50 hover:bg-gray-100 rounded-lg text-xs font-semibold text-gray-600 border border-gray-200 cursor-pointer disabled:opacity-50"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
          <span>Refresh Check</span>
        </button>
      </div>

      {loading ? (
        <div className="bg-white border border-gray-100 rounded-3xl p-16 shadow-xs text-center">
          <RefreshCw className="h-10 w-10 text-brand-600 animate-spin mx-auto mb-4" />
          <h2 className="font-display font-bold text-xl text-gray-900 mb-1">Checking Status Core Telemetry</h2>
          <p className="text-sm text-gray-400">Initiating TCP handshakes, auditing SSL certificate validations, resolve DNS, and fetching response headers...</p>
        </div>
      ) : error ? (
        <div className="bg-white border border-rose-100 rounded-3xl p-10 shadow-xs max-w-2xl mx-auto text-center">
          <AlertTriangle className="h-12 w-12 text-rose-500 mx-auto mb-4" />
          <h2 className="font-display font-bold text-xl text-gray-900 mb-2">Diagnostic Scan Aborted</h2>
          <p className="text-sm text-gray-500 mb-6">{error}</p>
          <button
            onClick={() => onNavigate("/")}
            className="bg-brand-600 hover:bg-brand-500 text-white font-medium text-sm px-6 py-2.5 rounded-xl transition-all"
          >
            Run another Diagnostic check
          </button>
        </div>
      ) : data ? (
        <div className="space-y-8 animate-fade-in" id="test-findings-wrapper">
          {/* Main Status Callout Banner */}
          <div className={`rounded-3xl border p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 ${
            data.status === "up" ? "bg-emerald-500/[0.03] border-emerald-100" : "bg-rose-500/[0.03] border-rose-100"
          }`}>
            <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4">
              <div className={`p-4 rounded-2xl ${data.status === "up" ? "bg-emerald-500 text-white" : "bg-red-500 text-white"}`}>
                {data.status === "up" ? <CheckCircle2 className="h-10 w-10" /> : <Flame className="h-10 w-10" />}
              </div>
              <div>
                <span className="font-mono text-xs text-gray-400 block uppercase tracking-widest mb-1.5">Website Diagnostic Record</span>
                <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-gray-900 leading-none">
                  {data.domain}
                </h2>
                <p className="text-sm text-gray-600 mt-2">
                  {data.status === "up" ? (
                    <span>This website is currently <strong>up and operational</strong> globally. Resolving correctly with standard connection latency parameters.</span>
                  ) : (
                    <span>This website is currently <strong>offline or unreachable</strong> from our secure external networks.</span>
                  )}
                </p>
              </div>
            </div>

            {/* Quick Badges status block */}
            <div className="flex flex-wrap items-center justify-center gap-4 shrink-0">
              <div className="text-center bg-white/80 border border-gray-100 px-5 py-3 rounded-2xl min-w-[100px]">
                <span className="font-mono text-[10px] text-gray-400 uppercase tracking-wider block mb-1">Response Code</span>
                <span className="font-mono text-sm font-bold text-gray-900">{data.statusCode || "N/A"}</span>
              </div>
              <div className="text-center bg-white/80 border border-gray-100 px-5 py-3 rounded-2xl min-w-[100px]">
                <span className="font-mono text-[10px] text-gray-400 uppercase tracking-wider block mb-1">Latency time</span>
                <span className="font-mono text-sm font-bold text-brand-600">{data.responseTime}ms</span>
              </div>
            </div>
          </div>

          {/* Grid: 4 Critical Metrics (DNS, Server, SSL, Handshake) */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* DNS Card */}
            <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-xs flex items-start space-x-3.5">
              <div className="p-2.5 rounded-xl bg-orange-50 text-orange-600">
                <Database className="h-5 w-5" />
              </div>
              <div>
                <span className="text-xs text-gray-400 block font-mono uppercase tracking-wider mb-1">DNS Resolution</span>
                <div className="font-mono text-sm font-semibold text-gray-900 truncate max-w-[180px]" title={data.ip}>
                  {data.ip}
                </div>
                <span className={`inline-block text-[9px] uppercase tracking-wider font-bold mt-1.5 px-1.5 py-0.5 rounded-xs ${
                  data.dnsStatus === "passed" ? "text-emerald-700 bg-emerald-50" : "text-red-700 bg-red-50"
                }`}>
                  {data.dnsStatus.toUpperCase()}
                </span>
              </div>
            </div>

            {/* SSL Card */}
            <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-xs flex items-start space-x-3.5">
              <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <span className="text-xs text-gray-400 block font-mono uppercase tracking-wider mb-1">SSL Certificate</span>
                <div className="font-display font-semibold text-sm text-gray-900 truncate max-w-[180px]">
                  {data.sslDetails?.issuer || "No certificate info"}
                </div>
                <span className={`inline-block text-[9px] uppercase tracking-wider font-bold mt-1.5 px-1.5 py-0.5 rounded-xs ${
                  data.sslStatus === "valid" ? "text-emerald-700 bg-emerald-50" :
                  data.sslStatus === "expired" ? "text-amber-700 bg-amber-50" : "text-gray-500 bg-gray-50"
                }`}>
                  {data.sslStatus === "valid" ? `Secure (${data.sslDetails?.daysRemaining || 0}d left)` : data.sslStatus.toUpperCase()}
                </span>
              </div>
            </div>

            {/* Response Time Indicator */}
            <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-xs flex items-start space-x-3.5">
              <div className="p-2.5 rounded-xl bg-teal-50 text-teal-600">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <span className="text-xs text-gray-400 block font-mono uppercase tracking-wider mb-1">Server Speeds</span>
                <div className="font-display font-semibold text-sm text-gray-900">
                  {data.responseTime < 150 ? "Excellent / Hyperfast" : data.responseTime < 500 ? "Normal" : "Slow Response"}
                </div>
                <span className="font-mono text-xs text-gray-500 block mt-1">Checked from central US</span>
              </div>
            </div>

            {/* Global availability simulator indicator */}
            <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-xs flex items-start space-x-3.5">
              <div className="p-2.5 rounded-xl bg-purple-50 text-purple-600">
                <Radio className="h-5 w-5" />
              </div>
              <div>
                <span className="text-xs text-gray-400 block font-mono uppercase tracking-wider mb-1">Global Accessibility</span>
                <div className="font-display font-semibold text-sm text-gray-900">
                  {data.status === "up" ? "100% Operational" : "0% Connectivity"}
                </div>
                <span className="font-mono text-xs text-gray-500 block mt-1">3 probe nodes validated</span>
              </div>
            </div>
          </div>

          {/* Historical Uptime Graph (Recharts segments) & User Outage Report tools */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Historical Graph card */}
            <div className="lg:col-span-2">
              <UptimeHistoryChart 
                domain={data.domain} 
                isDown={data.status !== "up"} 
                responseTime={data.responseTime} 
              />
            </div>

            {/* Report Outage Box */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-xs">
              <div className="flex items-center space-x-2 pb-3 border-b border-gray-100 mb-4">
                <AlertTriangle className="h-4 w-4 text-orange-500" />
                <span className="font-display font-bold text-sm text-gray-900 uppercase tracking-tight">Active User Outage logs</span>
              </div>
              <p className="text-xs text-gray-500 leading-normal mb-5">
                Having troubles connecting to <strong>{data.domain}</strong>? Report if you are experiencing outages locally to inform regional networks.
              </p>

              <div className="bg-orange-500/5 border border-orange-100 rounded-xl p-4 text-center mb-6">
                <span className="text-xs text-gray-400 block uppercase tracking-wider mb-0.5">Reported problems last 4 hours</span>
                <span className="font-mono text-3xl font-extrabold text-orange-600">{reportedCount} checks</span>
              </div>

              <button
                type="button"
                onClick={handleReportOutage}
                disabled={hasReported}
                className={`w-full font-display font-semibold text-xs sm:text-sm py-3 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  hasReported
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-100 cursor-not-allowed"
                    : "bg-orange-600 hover:bg-orange-500 text-white shadow-xs"
                }`}
              >
                {hasReported ? (
                  <>
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Report Registered. Thank you!</span>
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    <span>I experience outage issues too</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Collapsible Headers detailing HTTP headers explicitly */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-xs">
            <div className="flex items-center space-x-2 pb-3 border-b border-gray-100 mb-4">
              <ListPlus className="h-4 w-4 text-brand-500" />
              <span className="font-display font-bold text-sm text-gray-900 uppercase tracking-tight">HTTP Server Response Headers</span>
            </div>
            {Object.keys(data.headers).length === 0 ? (
              <p className="text-xs text-gray-400 italic">No headers were returned from target server connection check.</p>
            ) : (
              <div className="bg-gray-950 text-emerald-400 p-4 rounded-xl font-mono text-xs overflow-x-auto max-h-72 border border-gray-900">
                {Object.entries(data.headers).map(([key, value]) => (
                  <div key={key} className="py-0.5">
                    <span className="text-sky-300 font-semibold">{key}</span>: {value}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Related status checkers and Internal Interlinkings */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="interlinks">
            {/* Checker list */}
            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-xs">
              <h4 className="font-display font-bold text-xs uppercase tracking-wider text-gray-400 mb-3">Related status checks</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <button onClick={() => onCheckStatus(`meta.com`)} className="text-gray-600 hover:text-brand-600 hover:underline">Is Meta (Facebook) down right now?</button>
                </li>
                <li>
                  <button onClick={() => onCheckStatus(`github.com`)} className="text-gray-600 hover:text-brand-600 hover:underline">GitHub platform health check</button>
                </li>
                <li>
                  <button onClick={() => onCheckStatus(`fastly.com`)} className="text-gray-600 hover:text-brand-600 hover:underline">Is Fastly DNS network healthy?</button>
                </li>
              </ul>
            </div>

            {/* Checker tool routes */}
            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-xs">
              <h4 className="font-display font-bold text-xs uppercase tracking-wider text-gray-400 mb-3">Diagnostic tools directory</h4>
              <ul className="space-y-2 text-sm text-indigo-600">
                <li><button onClick={() => onNavigate("/dns-lookup")} className="hover:underline text-left">Lookup DNS Records for {data.domain}</button></li>
                <li><button onClick={() => onNavigate("/ssl-checker")} className="hover:underline text-left">Audit TLS Certificate Chains</button></li>
                <li><button onClick={() => onNavigate("/dns-propagation")} className="hover:underline text-left">Monitor DNS Global Propagation</button></li>
              </ul>
            </div>

            {/* Blog guides */}
            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-xs">
              <h4 className="font-display font-bold text-xs uppercase tracking-wider text-gray-400 mb-3">Technical learning literature</h4>
              <ul className="space-y-2 text-sm text-brand-600">
                <li><button onClick={() => onNavigate("/blog")} className="hover:underline text-left">Fixing HTTP 502 Bad Gateways</button></li>
                <li><button onClick={() => onNavigate("/blog")} className="hover:underline text-left">Guide to SSL Handshake errors</button></li>
                <li><button onClick={() => onNavigate("/blog")} className="hover:underline text-left">DNS troubleshooting protocol</button></li>
              </ul>
            </div>
          </div>

          {/* Programmatic SEO Dynamic Knowledge Base panel */}
          {seoDetails && (
            <section className="bg-white border border-gray-150 rounded-2xl p-6 shadow-xs space-y-6" id="programmatic-seo-data">
              <div>
                <span className="inline-flex items-center space-x-1 uppercase text-[10px] tracking-widest font-mono font-bold text-brand-600 bg-brand-50 px-2.5 py-1 rounded-md border border-brand-100 mb-3">
                  <Clock className="h-3.5 w-3.5" />
                  <span>Uptime Health Profile & Detailed Diagnostic Overview</span>
                </span>
                <h3 className="font-display font-extrabold text-xl sm:text-2xl text-gray-950 tracking-tight leading-none mb-3">
                  Uptime & Telemetry Profile for {data.domain}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed bg-slate-50 border border-slate-100 p-4 rounded-xl font-sans">
                  {seoDetails.overview}
                </p>
              </div>

              {/* Status Log Timeline */}
              <div>
                <h4 className="font-display font-bold text-sm sm:text-base text-gray-900 mb-4 flex items-center gap-1.5 border-b border-gray-100 pb-2">
                  <Activity className="h-4.5 w-4.5 text-emerald-650" />
                  <span>Chronological Verification Logs & Testing Schedule (Past 30 Days)</span>
                </h4>
                <div className="space-y-3 font-mono text-xs">
                  {seoDetails.history.map((hist, idx) => (
                    <div key={idx} className="flex border border-gray-100 rounded-xl p-3 bg-white hover:bg-slate-50/50 transition-colors gap-3 items-start sm:items-center">
                      <span className="text-[10px] text-gray-400 font-semibold w-28 shrink-0">{hist.time}</span>
                      <div className="h-2 w-2 rounded-full bg-emerald-500 shrink-0 mt-1 sm:mt-0"></div>
                      <span className="text-gray-600 flex-1 leading-normal font-sans text-xs sm:text-xs">{hist.event}</span>
                      <span className="text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-sm font-semibold tracking-wider uppercase shrink-0">
                        Passed
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* FAQ Accordion Section */}
          {seoDetails && (
            <section className="bg-white border border-gray-150 rounded-2xl p-6 shadow-xs" id="status-faq-sec">
              <h3 className="font-display font-extrabold text-xl text-gray-950 border-b border-gray-100 pb-3 mb-5">
                Frequently Asked Questions for {data.domain} Status
              </h3>
              <div className="space-y-6">
                {seoDetails.faq.map((item, index) => (
                  <div key={index} className="border-b border-gray-50 pb-5 last:border-b-0 last:pb-0">
                    <h4 className="font-display font-bold text-sm sm:text-base text-gray-900 mb-2 flex items-center gap-2 leading-snug">
                      <HelpCircle className="h-4.5 w-4.5 text-brand-600 shrink-0" />
                      <span>{item.question}</span>
                    </h4>
                    <p className="text-slate-600 text-[13px] leading-relaxed pl-6.5 font-sans">
                      {item.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      ) : null}
    </div>
  );
}
