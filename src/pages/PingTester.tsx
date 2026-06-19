import React, { useState } from "react";
import { Network, Search, Award, BarChart3, Radio, RefreshCw, Layers, CheckCircle, ShieldAlert, ArrowRight, HelpCircle } from "lucide-react";
import SeoHead from "../components/SeoHead";
import { PingResult } from "../types";

export default function PingTester() {
  const [host, setHost] = useState("");
  const [result, setResult] = useState<PingResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePing = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!host.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const resp = await fetch(`/api/ping?host=${encodeURIComponent(host.trim())}`);
      if (resp.ok) {
        const json = await resp.json();
        setResult(json);
      } else {
        const errJson = await resp.json();
        setError(errJson.error || "Failed to query ping diagnostics.");
      }
    } catch (err) {
      setError("Failed to reach ping diagnostics server node. Verify network settings.");
    } finally {
      setLoading(false);
    }
  };

  const pingSchemas = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Network IP & TCP Ping Latency Tester",
      "url": `${window.location.origin}/ip-ping-tester`,
      "applicationCategory": "DeveloperApplication",
      "operatingSystem": "All",
      "browserRequirements": "HTML5 Ready",
      "description": "Perform dynamic TCP handshake ping checks to any domain or IP address globally to measure latency, minimum/maximum times, and connection health."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10" id="ping-view">
      <SeoHead
        title="Online IP Ping Tester | Measure Latency & Packet Loss"
        description="Check connection latency and packet loss with our free online IP Ping Tester. Enter any domain or IP to view real-time minimum, maximum, and average response times."
        canonicalPath="/ip-ping-tester"
        schemas={pingSchemas}
      />

      {/* Hero section */}
      <section className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-gray-950 tracking-tight mb-4">
          Online IP Ping Latency Tester
        </h1>
        <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
          Test network path accessibility and transport latency to any IP address or domain globally. Our server initiates sequential connection handshakes to measure exact responsiveness.
        </p>

        {/* Input Form */}
        <form onSubmit={handlePing} className="mt-8 max-w-xl mx-auto" id="ping-form">
          <div className="relative bg-white p-2 border border-gray-200 rounded-2xl shadow-xs focus-within:ring-2 focus-within:ring-brand-500 focus-within:border-brand-500 transition-all flex flex-col sm:flex-row gap-2">
            <div className="flex-1 flex items-center px-3 gap-2.5">
              <Network className="h-5 w-5 text-gray-400 shrink-0" />
              <input
                type="text"
                placeholder="Enter IP or Domain, e.g., 8.8.8.8, 1.1.1.1, google.com"
                value={host}
                onChange={(e) => setHost(e.target.value)}
                className="w-full bg-transparent border-none text-gray-800 focus:outline-hidden text-sm sm:text-base py-2 font-mono"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-brand-600 hover:bg-brand-500 text-white font-display font-medium text-sm px-6 py-3 rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  <span>Pinging...</span>
                </>
              ) : (
                <span>Test Ping Latency</span>
              )}
            </button>
          </div>
          <div className="flex items-center justify-center gap-3 mt-3 text-xs text-gray-400">
            <span>Examples:</span>
            <button type="button" onClick={() => setHost("8.8.8.8")} className="underline hover:text-brand-600">8.8.8.8 (Google DNS)</button>
            <span>•</span>
            <button type="button" onClick={() => setHost("1.1.1.1")} className="underline hover:text-brand-600">1.1.1.1 (Cloudflare)</button>
          </div>
        </form>
      </section>

      {/* Error or Loading Results section */}
      {error && (
        <div className="bg-rose-50 border border-rose-150 text-rose-700 text-sm p-4 rounded-xl max-w-xl mx-auto mb-10 text-center">
          {error}
        </div>
      )}

      {/* Ping Results Grid Display */}
      {result && (
        <div className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 max-w-4xl mx-auto shadow-xs mb-14 animate-fade-in" id="ping-results">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-5 mb-6">
            <div>
              <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest block">Ping Test Diagnostics</span>
              <h3 className="font-display font-bold text-xl text-gray-900">{result.host}</h3>
            </div>
            <div className="flex items-center gap-2">
              <span className={`inline-flex items-center gap-1 text-[11px] font-semibold uppercase px-2 py-1 rounded-sm ${
                result.success ? "text-emerald-700 bg-emerald-50" : "text-amber-700 bg-amber-50"
              }`}>
                {result.success ? "Reachable / Live" : "Loss Detected"}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            <div className="bg-gray-50 p-4 rounded-2xl text-center">
              <span className="text-[10px] font-mono text-gray-400 uppercase block mb-1">Minimum RTT</span>
              <span className="font-mono text-xl font-bold text-gray-800">{result.stats.min} ms</span>
            </div>
            <div className="bg-gray-50 p-4 rounded-2xl text-center">
              <span className="text-[10px] font-mono text-gray-400 uppercase block mb-1">Maximum RTT</span>
              <span className="font-mono text-xl font-bold text-gray-800">{result.stats.max} ms</span>
            </div>
            <div className="bg-gray-50 p-4 rounded-2xl text-center">
              <span className="text-[10px] font-mono text-gray-400 uppercase block mb-1">Average Latency</span>
              <span className="font-mono text-xl font-bold text-brand-600">{result.stats.avg} ms</span>
            </div>
            <div className="bg-gray-50 p-4 rounded-2xl text-center">
              <span className="text-[10px] font-mono text-gray-400 uppercase block mb-1">Packet Loss %</span>
              <span className={`font-mono text-xl font-bold ${result.stats.lossPercent > 0 ? "text-red-500" : "text-emerald-500"}`}>
                {result.stats.lossPercent} %
              </span>
            </div>
          </div>

          {/* Runs sequence details */}
          <h4 className="font-display font-bold text-sm text-gray-800 mb-3 uppercase tracking-tight">Sequence Probe Telemetry</h4>
          <div className="space-y-2">
            {result.runs.map((r) => (
              <div key={r.seq} className="flex items-center justify-between p-3 rounded-xl border border-gray-50 hover:bg-gray-50/50 transition-colors">
                <div className="flex items-center space-x-2.5">
                  <span className="w-5 h-5 rounded-md bg-brand-50 text-brand-700 text-xs font-mono font-bold flex items-center justify-center">
                    {r.seq}
                  </span>
                  <span className="text-xs text-gray-500">Node ICMP connection handshake seq={r.seq}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-mono text-sm font-semibold text-gray-700">{r.latency} ms</span>
                  <CheckCircle className="h-4 w-4 text-emerald-500" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SEO rich text (Minimum 1000 words) */}
      <section className="max-w-4xl mx-auto mt-16" id="ping-learning-literature">
        <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-xs">
          <article className="prose prose-blue max-w-none">
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-gray-900 border-b border-gray-100 pb-3 mb-6">
              Network Ping and Latency: A Technical Deep-Dive Handbook
            </h2>

            <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">1. What is a Network Ping?</h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              In computers and server networks, a <strong>ping</strong> is a standard administrative tool used to test the accessibility of a host device on an Internet Protocol (IP) network. It acts similarly to a virtual sonar pulse. The system originating the test dispatches an Echo Request packet to the destination address, then waits for a responsive Echo Reply payload. This exchange permits network administrators to diagnostic system states, evaluate routing paths, and index response metrics.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              Historically, pings rely on ICMP (Internet Control Message Protocol) packets operating at Layer 3 of the OSI model. However, on the modern internet, standard residential ICMP requests are heavily rate-limited or outright dropped by firewalls to prevent DDoS vectors. To guarantee highly accurate, realistic results, our <strong>Online IP Ping Tester</strong> employs TCP Handshake Latency measurements (Layer 4). By measuring the precise interval of a TCP three-way handshake on standard service ports (like 80 or 443), we capture realistic packet round-trip times (RTT) that align with true user experiences.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">2. Why Connection Latency Matters to End-Users</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              Latency refers to the duration required for a packet of data to travel from the sender's client browser to the database server and return. It is measured in milliseconds (ms). While bandwidth dictates how much data can pass simultaneously, latency determines the instantaneous speed or responsiveness of a system.
            </p>
            <ul className="list-disc list-inside space-y-3 text-gray-600 leading-relaxed mb-6">
              <li>
                <strong>Web Application Load Times:</strong> A browser must fetch dozens of HTML, CSS, JavaScript, and asset resources. If the average ping latency is high (e.g., 250ms), each asset request queue multiplies the delay, resulting in lagging rendering times.
              </li>
              <li>
                <strong>API and Real-Time Synchronization:</strong> In online gaming, trading, and live communications, high latency (often referred to as 'lag') causes synchronization delays, affecting usability and application outcomes.
              </li>
              <li>
                <strong>SEO Ranking Indicators:</strong> Search engines like Google integrate Core Web Vitals—specifically Interaction to Next Paint (INP) and Largest Contentful Paint (LCP)—directly into their organic rank architectures. High server latencies slow these benchmarks, bringing rank devaluations.
              </li>
            </ul>

            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">3. Understanding RTT, Min, Max, and Packet Loss Properties</h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              When analyzing ping logs, network engineers examine four crucial metrics to diagnostic line stability and transmission quality:
            </p>
            <ul className="list-disc list-inside space-y-4 text-gray-600 leading-relaxed mb-6">
              <li>
                <strong>Minimum RTT:</strong> The absolute fastest round-trip trip logged during the checking sequence. It represents the baseline capacity of the path under prime congestion-free conditions.
              </li>
              <li>
                <strong>Maximum RTT:</strong> The slowest round-trip trip registered. Sudden spikes in RTT can indicate buffer congestion, routing flips, or queue limits.
              </li>
              <li>
                <strong>Average Latency:</strong> The sum of all successful round-trip times divided by the run count. This acts as the key benchmark for typical performance.
              </li>
              <li>
                <strong>Packet Loss %:</strong> The percentage of requests that failed to return any reply before a timeout occurred. A connection can have fast ping speeds but suffer from 20% packet loss, indicating a degrading physical link, faulty switches, or severe buffer congestion.
              </li>
            </ul>

            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">4. Step-by-Step Latency Diagnostics: Troubleshooting High Ping Times</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              If your ping checks reveal abnormally long response times or packet loss, follow this sequence of diagnostic tests to isolate the issue:
            </p>
            <ol className="list-decimal list-inside space-y-3 text-gray-600 leading-normal mb-6">
              <li>
                <strong>Verify local interface queues:</strong> Ping your local residential router address (typically <code>192.168.1.1</code> or <code>192.168.0.1</code>). If RTT exceeds 5ms or has loss, your local router is clogged or Wi-Fi interference is degrading the link. Switch to a wired Ethernet connection.
              </li>
              <li>
                <strong>Test upstream DNS resolvers:</strong> Run ping tests targeting fast public DNS nodes such as <code>1.1.1.1</code> (Cloudflare) or <code>8.8.8.8</code> (Google). High latencies here point to problems with your local ISP's backbone.
              </li>
              <li>
                <strong>Perform a Traceroute:</strong> Traceroute maps the exact route and relays the IP address of every physical router node along the path. Sudden spikes in hop latency help isolate which network provider is experiencing bottlenecks.
              </li>
              <li>
                <strong>Disable background cloud syncing:</strong> High-bandwidth background file syncs (like OneDrive, iCloud, or Torrent engines) clog bandwidth, saturating router interfaces and degrading local latency metrics.
              </li>
            </ol>

            {/* Inbuilt FAQ Accordion */}
            <h3 className="text-xl font-extrabold text-gray-900 mt-10 mb-4 border-t border-gray-150 pt-6 flex items-center gap-1.5" id="ping-faq">
              <HelpCircle className="h-4.5 w-4.5 text-orange-500" />
              <span>Ping Diagnostic FAQ</span>
            </h3>
            <div className="space-y-4 shadow-xs">
              <div className="border border-gray-100 rounded-xl p-5 bg-gray-50/50">
                <h4 className="font-display font-bold text-sm text-gray-900 mb-1">Q: Can I ping a website if its host blocks standard ICMP protocols?</h4>
                <p className="text-xs text-gray-600">
                  Yes, using our TCP ping strategy. We establish connection handshakes on standard HTTP/HTTPS channels (Port 80/443), which firewalls must keep open to receive standard visitors. This reports accurate responsiveness even when standard ICMP queries get dropped.
                </p>
              </div>

              <div className="border border-gray-100 rounded-xl p-5 bg-gray-50/50">
                <h4 className="font-display font-bold text-sm text-gray-900 mb-1">Q: What is a typical healthy ping latency benchmark?</h4>
                <p className="text-xs text-gray-600">
                  Fibre connections achieve 1ms to 20ms to local server hubs. Cable links stand around 15ms to 50ms. Cellular 5G ranges from 30ms to 80ms. Anything below 100ms feels fast for Web pages, whereas real-time gaming models require speeds below 50ms.
                </p>
              </div>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}
