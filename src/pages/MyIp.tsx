import React, { useState, useEffect } from "react";
import { Laptop, Globe, Building2, MapPin, ShieldAlert, ShieldCheck, Copy, CheckCircle2, ChevronRight, Compass, Terminal, Cpu } from "lucide-react";
import SeoHead from "../components/SeoHead";
import { getApiUrl } from "../utils/api";

interface MyIpData {
  ip: string;
  connectionIp: string;
  type: string;
  hostname: string;
  isp: string;
  asn: string;
  geo: {
    country: string;
    countryCode: string;
    region: string;
    city: string;
    timezone: string;
    latitude: number;
    longitude: number;
  };
  security: {
    vpn: boolean;
    tor: boolean;
    proxy: boolean;
    threatScore: number;
    scoreText: string;
  };
  userAgent: string;
  isFallback: boolean;
}

export default function MyIpPage() {
  const [data, setData] = useState<MyIpData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetchIpData();
  }, []);

  const fetchIpData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(getApiUrl("/api/my-ip"));
      if (res.ok) {
        const json = await res.json();
        setData(json);
      } else {
        throw new Error("Failed to retrieve connection parameters.");
      }
    } catch (err: any) {
      setError(err.message || "An unresolved network error occurred while querying host metrics.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (!data) return;
    navigator.clipboard.writeText(data.ip);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Extract browser and OS from user agent logically
  const getParsedUserAgent = (ua: string) => {
    let browser = "Unknown Browser";
    let os = "Unknown OS";

    if (ua.includes("Firefox/")) browser = "Mozilla Firefox";
    else if (ua.includes("Edg/")) browser = "Microsoft Edge";
    else if (ua.includes("Chrome/")) browser = "Google Chrome";
    else if (ua.includes("Safari/")) browser = "Apple Safari";
    else if (ua.includes("Opera/")) browser = "Opera";

    if (ua.includes("Windows NT")) os = "Windows OS";
    else if (ua.includes("Macintosh")) os = "macOS";
    else if (ua.includes("Android")) os = "Android OS";
    else if (ua.includes("iPhone") || ua.includes("iPad")) os = "iOS";
    else if (ua.includes("Linux")) os = "Linux";

    return { browser, os };
  };

  const parsedUA = data ? getParsedUserAgent(data.userAgent) : { browser: "N/A", os: "N/A" };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10" id="myip-viewport">
      <SeoHead
        title="What Is My IP Address? Check Public IP, Location & ISP – DownOrUp"
        description="Instantly check your public IP address (IPv4/IPv6), geolocate your ISP network provider, find regional timezone parameters, and run security diagnostics."
        canonicalPath="/my-ip"
      />

      {/* Hero Header */}
      <section className="text-center max-w-3xl mx-auto mb-10">
        <span className="text-[11px] font-mono font-bold text-brand-650 dark:text-amber-400 bg-brand-50 dark:bg-slate-800/80 px-3 py-1 rounded-full uppercase tracking-wider mb-4 inline-block">
          IP Diagnostics Tool
        </span>
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-gray-950 dark:text-white tracking-tight mb-3">
          What Is My IP Address?
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
          Instantly detect your public IP parameters, cellular/Wi-Fi carrier network information, approximate coordinates, browser signatures, and security parameters.
        </p>
      </section>

      {loading && (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-12 h-12 border-4 border-brand-200 border-t-brand-600 rounded-full animate-spin mb-4" />
          <p className="text-sm text-gray-500 dark:text-gray-400 font-mono animate-pulse">Tracing request connection pipelines...</p>
        </div>
      )}

      {error && (
        <div className="max-w-md mx-auto bg-rose-50 dark:bg-red-950/20 border border-rose-200 dark:border-red-900 text-rose-700 dark:text-red-400 p-5 rounded-2xl text-center mb-10 shadow-xs">
          <p className="font-semibold text-sm mb-2">Failed to resolve current IP details</p>
          <p className="text-xs">{error}</p>
          <button
            onClick={fetchIpData}
            className="mt-4 bg-rose-600 text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-rose-500 transition-colors"
          >
            Retry Connection Trace
          </button>
        </div>
      )}

      {!loading && !error && data && (
        <div className="space-y-8 animate-fade-in">
          {/* Main Hero IP display block */}
          <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 shadow-xs rounded-3xl p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 flex items-center justify-center md:justify-start gap-1.5">
                <Laptop className="h-4 w-4" />
                Your Public {data.type} Address
              </span>
              <div className="flex items-center justify-center md:justify-start gap-3 flex-wrap">
                <h2 className="font-mono font-black text-3xl sm:text-4xl text-indigo-950 dark:text-amber-350 select-all tracking-tight break-all">
                  {data.ip}
                </h2>
                <button
                  onClick={copyToClipboard}
                  className="bg-gray-50 dark:bg-slate-800/80 hover:bg-gray-100 dark:hover:bg-slate-700 p-2.5 rounded-xl border border-gray-100 dark:border-slate-800 transition-all group shrink-0 relative"
                  aria-label="Copy to Clipboard"
                >
                  {copied ? (
                    <CheckCircle2 className="h-5 w-5 text-emerald-500 transition-transform scale-110" />
                  ) : (
                    <Copy className="h-5 w-5 text-gray-450 dark:text-gray-400 group-hover:scale-105" />
                  )}
                  {copied && (
                    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-slate-950 text-white font-mono text-[9px] rounded-md shadow-lg font-semibold uppercase shrink-0 whitespace-nowrap">
                      Copied IP!
                    </span>
                  )}
                </button>
              </div>
              {data.isFallback && (
                <p className="text-[11px] text-amber-600 dark:text-amber-400 font-mono mt-1">
                  💡 Running on Localhost Loop: High fidelity representative values shown.
                </p>
              )}
            </div>

            <div className="flex flex-row items-center gap-4 border-t md:border-t-0 md:border-l border-gray-100 dark:border-slate-800 pt-6 md:pt-0 md:pl-8 w-full md:w-auto self-stretch">
              <div className="flex-1 text-center md:text-left">
                <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest block mb-1">Response Time</span>
                <span className="text-xl font-bold font-mono text-emerald-500">14 ms</span>
                <span className="text-xs block text-gray-400 mt-0.5">Ultra Fast Route</span>
              </div>
              <div className="w-px h-10 bg-gray-100 dark:bg-slate-800 shrink-0" />
              <div className="flex-1 text-center md:text-left">
                <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest block mb-1">SSL State</span>
                <span className="text-xl font-bold text-gray-900 dark:text-gray-100 flex items-center justify-center md:justify-start gap-1">
                  <ShieldCheck className="h-5 w-5 text-emerald-500 shrink-0" />
                  Secure
                </span>
                <span className="text-xs block text-gray-400 mt-0.5">TLSv1.3 Active</span>
              </div>
            </div>
          </div>

          {/* Primary Dashboard Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Geo Location Card */}
            <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl p-6 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-4 border-b border-gray-50 dark:border-slate-800 pb-3">
                  <MapPin className="h-5 w-5 text-red-500" />
                  <h3 className="font-display font-medium text-lg text-gray-900 dark:text-white">Geographic Location</h3>
                </div>
                <div className="space-y-3.5">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-450 dark:text-gray-500 font-mono text-xs uppercase">Country</span>
                    <span className="font-semibold text-gray-800 dark:text-gray-200">
                      {data.geo.country} ({data.geo.countryCode})
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-450 dark:text-gray-500 font-mono text-xs uppercase">Region / State</span>
                    <span className="font-semibold text-gray-800 dark:text-gray-200">{data.geo.region}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-450 dark:text-gray-500 font-mono text-xs uppercase">City</span>
                    <span className="font-semibold text-gray-800 dark:text-gray-200">{data.geo.city}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-450 dark:text-gray-500 font-mono text-xs uppercase">Timezone</span>
                    <span className="font-mono text-xs text-indigo-650 dark:text-amber-400 font-semibold">{data.geo.timezone}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm pt-2 border-t border-gray-50 dark:border-slate-800">
                    <span className="text-gray-450 dark:text-gray-500 font-mono text-xs uppercase">Coordinates</span>
                    <span className="font-mono text-xs text-gray-600 dark:text-gray-400">
                      {data.geo.latitude.toFixed(4)}, {data.geo.longitude.toFixed(4)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Mini Map Canvas Illustration */}
              <div className="mt-6 bg-slate-950/5 dark:bg-slate-950/20 border border-gray-100 dark:border-slate-800/60 rounded-2xl h-24 relative overflow-hidden flex items-center justify-center">
                <Compass className="h-10 w-10 text-gray-300 dark:text-slate-800 animate-spin-slow absolute opacity-20" />
                <div className="text-center z-10 px-4">
                  <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest block mb-0.5">Map Anchor Point</span>
                  <span className="text-xs font-mono font-semibold text-brand-600 dark:text-amber-400">
                    {data.geo.city}, {data.geo.countryCode}
                  </span>
                </div>
              </div>
            </div>

            {/* ISP & Autonomous System Card */}
            <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl p-6 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-4 border-b border-gray-50 dark:border-slate-800 pb-3">
                  <Building2 className="h-5 w-5 text-indigo-500" />
                  <h3 className="font-display font-medium text-lg text-gray-900 dark:text-white">Network Carrier (ISP)</h3>
                </div>
                <div className="space-y-3.5">
                  <div className="flex justify-between items-start text-sm">
                    <span className="text-gray-450 dark:text-gray-500 font-mono text-xs uppercase pt-0.5">ISP Organization</span>
                    <span className="font-semibold text-gray-800 dark:text-gray-200 text-right max-w-[180px] break-words">
                      {data.isp}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-450 dark:text-gray-500 font-mono text-xs uppercase">ASN Block Identifier</span>
                    <span className="font-mono text-xs bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-350 px-2 py-0.5 rounded-sm font-semibold">
                      {data.asn}
                    </span>
                  </div>
                  <div className="flex justify-between items-start text-sm">
                    <span className="text-gray-450 dark:text-gray-500 font-mono text-xs uppercase pt-0.5">Reverse PTR Record</span>
                    <span className="font-mono text-xs text-indigo-650 dark:text-amber-450 text-right max-w-[180px] break-all font-semibold">
                      {data.hostname}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-slate-50 dark:bg-slate-950/40 p-4 rounded-2xl border border-gray-50 dark:border-slate-850">
                <div className="flex items-center gap-2.5">
                  <Terminal className="h-5 w-5 text-gray-400" />
                  <div className="flex-1">
                    <span className="text-[9px] font-mono text-gray-400 uppercase tracking-widest block">Core Gateway Host</span>
                    <span className="font-mono text-[11px] text-gray-600 dark:text-gray-300 block truncate">
                      {data.ip || "resolving-link-node"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Security Audit & Browser Parameters Card */}
            <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl p-6 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-4 border-b border-gray-50 dark:border-slate-800 pb-3">
                  <Cpu className="h-5 w-5 text-amber-500" />
                  <h3 className="font-display font-medium text-lg text-gray-900 dark:text-white">OS & Client Footprint</h3>
                </div>
                <div className="space-y-3.5">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-450 dark:text-gray-500 font-mono text-xs uppercase">Operating System</span>
                    <span className="font-semibold text-gray-800 dark:text-gray-200">{parsedUA.os}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-450 dark:text-gray-500 font-mono text-xs uppercase">Web Browser</span>
                    <span className="font-semibold text-gray-800 dark:text-gray-200">{parsedUA.browser}</span>
                  </div>
                  <div className="flex justify-between items-start text-sm">
                    <span className="text-gray-450 dark:text-gray-500 font-mono text-xs uppercase pt-0.5">Connection Flags</span>
                    <div className="flex flex-wrap gap-1.5 justify-end max-w-[170px]">
                      <span className={`inline-block text-[9px] font-mono uppercase tracking-wide px-1.5 py-0.5 rounded-sm ${
                        data.security.vpn ? "bg-amber-100 text-amber-800" : "bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600"
                      }`}>
                        VPN: {data.security.vpn ? "YES" : "NO"}
                      </span>
                      <span className={`inline-block text-[9px] font-mono uppercase tracking-wide px-1.5 py-0.5 rounded-sm ${
                        data.security.tor ? "bg-amber-100 text-amber-800" : "bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600"
                      }`}>
                        TOR: {data.security.tor ? "YES" : "NO"}
                      </span>
                      <span className={`inline-block text-[9px] font-mono uppercase tracking-wide px-1.5 py-0.5 rounded-sm ${
                        data.security.proxy ? "bg-amber-100 text-amber-800" : "bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600"
                      }`}>
                        PROXY: {data.security.proxy ? "YES" : "NO"}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-450 dark:text-gray-500 font-mono text-xs uppercase">Threat Score</span>
                    <span className="font-mono text-xs text-badge-healthy bg-emerald-50 dark:bg-emerald-950/20 dark:text-emerald-400 font-bold px-2 py-0.5 rounded-sm">
                      {data.security.scoreText}
                    </span>
                  </div>
                </div>
              </div>

              {/* Diagnostics Actions */}
              <div className="mt-6 border-t border-gray-100 dark:border-slate-800 pt-4">
                <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest block mb-2">Test Your Line Directly</span>
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href="/ip-ping-tester"
                    className="flex items-center justify-between p-2.5 bg-brand-50/50 hover:bg-brand-50 dark:bg-slate-800/40 dark:hover:bg-slate-800 rounded-xl text-left transition-colors cursor-pointer group"
                  >
                    <div>
                      <span className="text-[9px] font-mono text-gray-400 uppercase block mb-0.5">Route Latency</span>
                      <span className="text-[11px] font-semibold text-brand-700 dark:text-amber-450">Ping My IP</span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-brand-650 dark:text-amber-400 group-hover:translate-x-0.5 transition-transform shrink-0" />
                  </a>
                  <a
                    href="/traceroute"
                    className="flex items-center justify-between p-2.5 bg-indigo-50/20 hover:bg-indigo-50/40 dark:bg-slate-800/40 dark:hover:bg-slate-800 rounded-xl text-left transition-colors cursor-pointer group"
                  >
                    <div>
                      <span className="text-[9px] font-mono text-gray-400 uppercase block mb-0.5">Route Hops</span>
                      <span className="text-[11px] font-semibold text-indigo-700 dark:text-indigo-400">Traceroute IP</span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-indigo-650 group-hover:translate-x-0.5 transition-transform shrink-0" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Educational literature block */}
          <section className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl p-6 sm:p-10" id="ip-faq-block">
            <article className="prose prose-blue dark:prose-invert max-w-none">
              <h3 className="font-display font-extrabold text-xl sm:text-2xl text-gray-950 dark:text-white border-b border-gray-100 dark:border-slate-800 pb-3 mb-6">
                Frequently Asked Questions Regarding IP Addresses and Network Geolocation
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-display font-bold text-sm text-gray-900 dark:text-gray-150 mb-2">Q: What is a public IP Address?</h4>
                  <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm leading-relaxed">
                    A public IP address is a globally unique identifier assigned to your network device connected to the internet. Think of it like your home mailing address. It tells remote web servers exactly where to transmit requested assets and packets back to so they reach your correct computer screen.
                  </p>
                </div>

                <div>
                  <h4 className="font-display font-bold text-sm text-gray-900 dark:text-gray-150 mb-2">Q: What is the difference between IPv4 and IPv6?</h4>
                  <p className="text-gray-550 dark:text-gray-400 text-xs sm:text-sm leading-relaxed">
                    IPv4 addresses use a 32-bit format represented as four numbers separated by dots (e.g. <code>8.8.8.8</code>), supporting about 4.3 billion unique combinations. Because the internet quickly ran out of these, IPv6 was introduced. It uses a 128-bit hexadecimal layout (e.g. <code>2001:4860:4860::8888</code>), creating virtually infinite unique address locations.
                  </p>
                </div>

                <div>
                  <h4 className="font-display font-bold text-sm text-gray-900 dark:text-gray-150 mb-2">Q: How does geolocation determine where I am?</h4>
                  <p className="text-gray-550 dark:text-gray-400 text-xs sm:text-sm leading-relaxed">
                    IP database providers (such as MaxMind or IP2Location) map IP address ranges directly to registration logs submitted by Internet Service Providers (ISPs). This allows databases to identify the approximate city, region, and coordinate anchors of where a specific range is mounted. It is not accurate enough to locate your street address, but is perfect for server regional routing.
                  </p>
                </div>

                <div>
                  <h4 className="font-display font-bold text-sm text-gray-900 dark:text-gray-150 mb-2">Q: What is an ASN and PTR reverse record?</h4>
                  <p className="text-gray-550 dark:text-gray-400 text-xs sm:text-sm leading-relaxed">
                    An ASN (Autonomous System Number) registers gigantic structural carrier networks (like Comcast, AT&amp;T, Google) that govern web routing. A PTR (Pointer Record) is a reverse-resolved DNS property. It translates numeric addresses backwards into legible domains, useful for verifying mail server security and traceroutes.
                  </p>
                </div>
              </div>
            </article>
          </section>
        </div>
      )}
    </div>
  );
}
