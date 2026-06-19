import React, { useState } from "react";
import { Search, Globe, ChevronRight, Activity, ArrowRight, Layers, HelpCircle, CheckCircle2, RefreshCw, Star } from "lucide-react";
import SeoHead from "../components/SeoHead";

interface PopularDomain {
  domain: string;
  name: string;
  category: string;
  description: string;
}

export const POPULAR_DOMAINS: PopularDomain[] = [
  // Search & Portals
  { domain: "google.com", name: "Google", category: "Search & Portals", description: "Global search engine, productivity suite, and localized map query portal." },
  { domain: "bing.com", name: "Microsoft Bing", category: "Search & Portals", description: "Standard artificial intelligence integrated web search directory from Microsoft." },
  { domain: "duckduckgo.com", name: "DuckDuckGo", category: "Search & Portals", description: "Privacy-focused web lookup checker that does not catalog search logs." },
  { domain: "yahoo.com", name: "Yahoo", category: "Search & Portals", description: "Major internet portal providing unified mail, news reels, and financial indexes." },
  { domain: "baidu.com", name: "Baidu", category: "Search & Portals", description: "The leading search engine platform catering to East Asian internet nodes." },
  { domain: "yandex.ru", name: "Yandex", category: "Search & Portals", description: "Comprehensive search engine and multi-channel internet services router." },

  // Social & Chat
  { domain: "facebook.com", name: "Facebook", category: "Social & Chat", description: "Worldwide social communication panel hosting billions of profiles." },
  { domain: "instagram.com", name: "Instagram", category: "Social & Chat", description: "Visual blogging and photographic publishing workspace." },
  { domain: "x.com", name: "X (Twitter)", category: "Social & Chat", description: "Micro-blogging channel housing real-time news feeds and social discussion loops." },
  { domain: "tiktok.com", name: "TikTok", category: "Social & Chat", description: "Short-form fluid dynamic mobile video sharing database." },
  { domain: "linkedin.com", name: "LinkedIn", category: "Social & Chat", description: "Professional recruitment grid and corporate association networks." },
  { domain: "reddit.com", name: "Reddit", category: "Social & Chat", description: "Subdivided community message boards for global discussion catalogs." },
  { domain: "pinterest.com", name: "Pinterest", category: "Social & Chat", description: "Visual bookmarking directory and project design idea board." },
  { domain: "discord.com", name: "Discord", category: "Social & Chat", description: "High-performance instant message, voice channel, and community server nodes." },
  { domain: "whatsapp.com", name: "WhatsApp", category: "Social & Chat", description: "Secure end-to-end encrypted messaging, voice, and group media suite." },
  { domain: "telegram.org", name: "Telegram", category: "Social & Chat", description: "Cloud-hosted high-frequency chat platform and telemetry feed loops." },
  { domain: "snapchat.com", name: "Snapchat", category: "Social & Chat", description: "Temporal photo-messaging application with micro-visual filters." },
  { domain: "threads.net", name: "Threads", category: "Social & Chat", description: "Visual text micro-blogging channel operated under Meta's core suite." },

  // Streaming & Media
  { domain: "youtube.com", name: "YouTube", category: "Streaming & Media", description: "The premier global video distribution and audio streaming archive." },
  { domain: "netflix.com", name: "Netflix", category: "Streaming & Media", description: "Premium subscription-based cinematic entertainment streaming." },
  { domain: "twitch.tv", name: "Twitch", category: "Streaming & Media", description: "High-speed interactive live-streaming server for creators and gamers." },
  { domain: "spotify.com", name: "Spotify", category: "Streaming & Media", description: "Global media, music licensing, and podcast distributions." },
  { domain: "disneyplus.com", name: "Disney+", category: "Streaming & Media", description: "Unified streaming engine cataloging Disney, Pixar, and Marvel cinema." },
  { domain: "primevideo.com", name: "Amazon Prime Video", category: "Streaming & Media", description: "Cinematic distribution channels available to Amazon Premium buyers." },
  { domain: "hulu.com", name: "Hulu", category: "Streaming & Media", description: "On-demand subscription television series and film archive." },
  { domain: "soundcloud.com", name: "SoundCloud", category: "Streaming & Media", description: "Independent musician database and playlist streaming workspace." },
  { domain: "vimeo.com", name: "Vimeo", category: "Streaming & Media", description: "Cinematographer streaming platform providing lossless high-definition video." },

  // Technology & Dev Tools
  { domain: "github.com", name: "GitHub", category: "Technology & Dev Tools", description: "Cloud-based git repositories and continuous integration pipelines." },
  { domain: "stackoverflow.com", name: "Stack Overflow", category: "Technology & Dev Tools", description: "Technical questions catalog and troubleshooting database for coders." },
  { domain: "npmjs.com", name: "NPM Registry", category: "Technology & Dev Tools", description: "Primary software packaging node for Node.js package distributions." },
  { domain: "openai.com", name: "OpenAI", category: "Technology & Dev Tools", description: "Artificial intelligence system model routers, hosting ChatGPT and developer APIs." },
  { domain: "microsoft.com", name: "Microsoft", category: "Technology & Dev Tools", description: "Consolidated enterprise download, operating systems support, and Azure links." },
  { domain: "apple.com", name: "Apple", category: "Technology & Dev Tools", description: "Firmware download caches, iCloud operations, and iOS cloud nodes." },
  { domain: "figma.com", name: "Figma", category: "Technology & Dev Tools", description: "Cloud-based collaborative design workspace and prototype builder." },
  { domain: "canva.com", name: "Canva", category: "Technology & Dev Tools", description: "Interactive desktop graphics rendering and publishing panel." },
  { domain: "vercel.com", name: "Vercel", category: "Technology & Dev Tools", description: "Edge-hosting console specialized in React frameworks and Next.js applications." },
  { domain: "netlify.com", name: "Netlify", category: "Technology & Dev Tools", description: "Core static site distribution platform and serverless functions router." },
  { domain: "digitalocean.com", name: "DigitalOcean", category: "Technology & Dev Tools", description: "Cloud hosting droplets, managed cluster databases, and Kubernetes." },
  { domain: "supabase.com", name: "Supabase", category: "Technology & Dev Tools", description: "Open-source Firebase alternative featuring managed PostgreSQL tables." },
  { domain: "aws.amazon.com", name: "Amazon Web Services", category: "Technology & Dev Tools", description: "Industry-leading cloud storage, compute servers, and database backbones." },
  { domain: "render.com", name: "Render", category: "Technology & Dev Tools", description: "Unified application runner for static nodes, web servers, and databases." },

  // Shopping & Finance
  { domain: "amazon.com", name: "Amazon US", category: "Shopping & Finance", description: "E-Commerce portal serving millions of retail shoppers daily." },
  { domain: "ebay.com", name: "eBay", category: "Shopping & Finance", description: "Global catalog auction and retail trading post matching buyers." },
  { domain: "shopify.com", name: "Shopify Merchant", category: "Shopping & Finance", description: "Independent merchant interface supporting millions of digital checkout shops." },
  { domain: "stripe.com", name: "Stripe", category: "Shopping & Finance", description: "Global financial infrastructure routing credit cards and transaction API keys." },
  { domain: "paypal.com", name: "PayPal", category: "Shopping & Finance", description: "Digital wallet network routing secure consumer funds and shopping checkouts." },
  { domain: "walmart.com", name: "Walmart", category: "Shopping & Finance", description: "Multinational retail catalog and fresh grocery order boards." },
  { domain: "target.com", name: "Target", category: "Shopping & Finance", description: "Department store merchant catalog and localized pickup routers." },
  { domain: "etsy.com", name: "Etsy", category: "Shopping & Finance", description: "Artisanal marketplace linking handcrafted creative developers to buyers." },
  { domain: "booking.com", name: "Booking.com", category: "Shopping & Finance", description: "Travel agency booking system aggregating flights and hotel room reservations." },
  { domain: "airbnb.com", name: "Airbnb", category: "Shopping & Finance", description: "Peer-to-peer lodging marketplace linking hosts with global travelers." },
  { domain: "aliexpress.com", name: "AliExpress", category: "Shopping & Finance", description: "Extensive wholesale consumer goods distribution channel out of East Asia." },
  { domain: "coinbase.com", name: "Coinbase", category: "Shopping & Finance", description: "Cryptocurrency transaction desk and digital ledger exchange panel." },
  { domain: "binance.com", name: "Binance", category: "Shopping & Finance", description: "Extensive digital token exchange routing blockchain logs worldwide." },

  // Information & Learning
  { domain: "wikipedia.org", name: "Wikipedia", category: "Information & Learning", description: "Free content encyclopedia compiled and moderated by volunteers worldwide." },
  { domain: "medium.com", name: "Medium", category: "Information & Learning", description: "Social publish deck for writers, designers, and software authorities." },
  { domain: "quora.com", name: "Quora", category: "Information & Learning", description: "Crowdsourced information board mapping questions to user testimonies." },
  { domain: "duolingo.com", name: "Duolingo", category: "Information & Learning", description: "Interactive gamified language studies and online examination panels." },
  { domain: "coursera.org", name: "Coursera", category: "Information & Learning", description: "University certification courses and academic seminar systems." },
  { domain: "udemy.com", name: "Udemy", category: "Information & Learning", description: "Independent video classroom catalog covering professional tech lessons." },
  { domain: "archive.org", name: "Internet Archive", category: "Information & Learning", description: "Historic global library index housing backup copies of webpage assets." },
  { domain: "britannica.com", name: "Encyclopedia Britannica", category: "Information & Learning", description: "Verified editorial reference, history, science, and scholarly definitions." },

  // Productivity & Cloud
  { domain: "slack.com", name: "Slack", category: "Productivity & Cloud", description: "Enterprise communication panels arranging work spaces into team channels." },
  { domain: "zoom.us", name: "Zoom", category: "Productivity & Cloud", description: "High-definition video conference and teleconferencing webinar rooms." },
  { domain: "notion.so", name: "Notion", category: "Productivity & Cloud", description: "Unified database workspace for taking notes, plans, and wikis." },
  { domain: "dropbox.com", name: "Dropbox", category: "Productivity & Cloud", description: "Shared cloud folder systems arranging automated sync paths for teams." },
  { domain: "trello.com", name: "Trello", category: "Productivity & Cloud", description: "Visual task-tracking Kanban card board operated by Atlassian." },
  { domain: "asana.com", name: "Asana", category: "Productivity & Cloud", description: "Task-based enterprise gantt charts and calendar scheduling tools." },
  { domain: "miro.com", name: "Miro", category: "Productivity & Cloud", description: "Vector-based digital whiteboard for collaborative brainstorming sessions." },

  // Gaming Platforms
  { domain: "steamcommunity.com", name: "Steam Community", category: "Gaming Platforms", description: "Primary gaming hub, item marketplaces, and profile portals for Valve's Steam." },
  { domain: "roblox.com", name: "Roblox", category: "Gaming Platforms", description: "Immersive multi-user game design environments for kids and developers." },
  { domain: "minecraft.net", name: "Minecraft Portal", category: "Gaming Platforms", description: "Standard authentication, server download, and security links for Minecraft." },
  { domain: "playstation.com", name: "PlayStation Network", category: "Gaming Platforms", description: "Sony profile catalogs, multiplayer check status, and game downloads." },
  { domain: "xbox.com", name: "Xbox Live", category: "Gaming Platforms", description: "Microsoft gaming network, profile servers, and cloud streaming status." },
  { domain: "epicgames.com", name: "Epic Games Store", category: "Gaming Platforms", description: "Standard distribution library and multiplayer servers for Fortnite." },
  { domain: "blizzard.com", name: "Battle.net (Blizzard)", category: "Gaming Platforms", description: "Multiplayer client login, server maps, and support queries for Blizzard titles." },
  { domain: "riotgames.com", name: "Riot Games Server", category: "Gaming Platforms", description: "Matchmaking network status, game clients, and log checkers for League of Legends." }
];

export default function StatusDirectory({ onCheckStatus, onNavigate }: { onCheckStatus: (domain: string) => void; onNavigate: (path: string) => void }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", ...Array.from(new Set(POPULAR_DOMAINS.map((d) => d.category)))];

  // Alphabetical list of initials for Indexing
  const alphabet = ["All", ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")];
  const [selectedLetter, setSelectedLetter] = useState<string>("All");

  // Filtering Logic
  const filteredDomains = POPULAR_DOMAINS.filter((d) => {
    const matchesSearch = d.domain.toLowerCase().includes(searchQuery.toLowerCase()) || d.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || d.category === selectedCategory;
    const matchesLetter = selectedLetter === "All" || d.domain.toLowerCase().startsWith(selectedLetter.toLowerCase()) || d.name.toLowerCase().startsWith(selectedLetter.toLowerCase());
    return matchesSearch && matchesCategory && matchesLetter;
  });

  // Render schema list containing links to all status checking
  const directorySchemaPrerender = [
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Global Internet Infrastructure Status Index",
      "numberOfItems": POPULAR_DOMAINS.length,
      "itemListElement": POPULAR_DOMAINS.slice(0, 30).map((dom, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "url": `${window.location.origin}/status/${dom.domain}`,
        "name": `Is ${dom.name} (${dom.domain}) Down Right Now?`
      }))
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10" id="status-dir-viewport">
      <SeoHead
        title="Uptime Status Directory | Thousands of Checked Platforms"
        description="Browse our comprehensive global internet service availability indexes. Track real-time TCP connection checks, server status histories, and schemas for over 100+ major companies."
        canonicalPath="/status"
        schemas={directorySchemaPrerender}
      />

      {/* Header and Callout */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="inline-flex items-center space-x-1 capitalize text-[11px] font-semibold text-brand-600 bg-brand-50 px-2.5 py-1 rounded-md border border-brand-100 mb-4">
          <Layers className="h-3.5 w-3.5" />
          <span>Structural SEO Indexing Directory</span>
        </span>
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-gray-950 tracking-tight">System Status Directory</h1>
        <p className="text-gray-500 text-sm sm:text-base mt-2">
          Consolidated crawling index providing continuous, instant diagnostic metrics, historical availability percentages, FAQs, and schema structures for popular global domains.
        </p>
      </div>

      {/* Control Board: Search & Categories */}
      <div className="bg-white border border-gray-150 rounded-3xl p-5 sm:p-6 shadow-xs mb-8 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search bar */}
          <div className="relative md:col-span-2">
            <Search className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search popular websites index, e.g., Netflix, Git, Google..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-hidden focus:border-brand-500 font-mono"
            />
          </div>

          {/* Quick Stats Banner inside */}
          <div className="bg-brand-50/50 border border-brand-100/50 rounded-xl px-4 py-3 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase text-gray-400 block tracking-wider leading-none">Cataloged nodes</span>
              <span className="text-lg font-extrabold text-brand-700 leading-none mt-1 inline-block">{POPULAR_DOMAINS.length} Platforms</span>
            </div>
            <span className="text-xs font-mono text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md font-semibold flex items-center gap-1 leading-none">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              99.9% Monitored
            </span>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-gray-50">
          <span className="text-[10px] uppercase font-mono font-bold text-gray-400 mr-2">Quick Category:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setSelectedLetter("All"); // Reset letter on category shift
              }}
              className={`text-xs px-3 py-1.5 rounded-lg cursor-pointer transition-all ${
                selectedCategory === cat
                  ? "bg-brand-600 font-semibold text-white"
                  : "bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-150"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Alphabet Index filter bar */}
        <div className="flex flex-wrap items-center gap-1 pt-2 border-t border-gray-50">
          <span className="text-[10px] uppercase font-mono font-bold text-gray-400 mr-2">Alphabetical Lookup:</span>
          {alphabet.map((lettr) => (
            <button
              key={lettr}
              onClick={() => setSelectedLetter(lettr)}
              className={`h-7 w-7 text-xs font-mono rounded-md flex items-center justify-center cursor-pointer transition-all ${
                selectedLetter === lettr
                  ? "bg-indigo-600 text-white font-bold"
                  : "bg-gray-50 text-gray-505 hover:bg-gray-100 font-medium"
              }`}
            >
              {lettr}
            </button>
          ))}
        </div>
      </div>

      {/* Directory Grid */}
      {filteredDomains.length === 0 ? (
        <div className="bg-white border border-gray-100 rounded-3xl p-16 text-center max-w-lg mx-auto shadow-xs">
          <Globe className="h-10 w-10 text-gray-300 mx-auto mb-3" />
          <h3 className="font-display font-medium text-gray-900 text-lg">No directory pages match your filter criteria</h3>
          <p className="text-sm text-gray-400 mt-1 mb-6">You can check any customized URL or domain directly using our dynamic check status engine on the main console.</p>
          <button
            onClick={() => onNavigate("/")}
            className="bg-brand-600 hover:bg-brand-500 text-white font-semibold text-xs px-6 py-2.5 rounded-lg transition-all"
          >
            Go to Check Status console
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="directory-grid-list">
          {filteredDomains.map((dom) => (
            <div
              key={dom.domain}
              onClick={() => onCheckStatus(dom.domain)}
              className="bg-white border border-gray-150 rounded-2xl p-5 hover:shadow-md hover:border-brand-100 hover:scale-[1.01] transition-all cursor-pointer flex flex-col justify-between h-48 group"
            >
              <div>
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-gray-50">
                  <span className="text-[9px] uppercase font-mono font-bold text-gray-400 tracking-wider">
                    {dom.category}
                  </span>
                  <span className="bg-emerald-50 text-emerald-600 text-[9px] font-bold px-1.5 py-0.5 rounded-xs flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-emerald-500 animate-ping"></span>
                    MONITORED
                  </span>
                </div>

                <h3 className="font-display font-bold text-base text-gray-950 group-hover:text-brand-600 transition-colors">
                  {dom.name} Status
                </h3>
                <span className="font-mono text-xs text-brand-600 group-hover:underline block mt-0.5 mb-2">
                  {dom.domain}
                </span>

                <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                  {dom.description}
                </p>
              </div>

              <div className="pt-2 border-t border-gray-50 flex items-center justify-between text-xs font-semibold text-brand-600 group-hover:text-brand-700 mt-2">
                <span className="text-[9px] text-gray-400 font-mono tracking-widest uppercase">Inspect metrics</span>
                <div className="flex items-center gap-0.5">
                  <span>View Status</span>
                  <ChevronRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Directory Interlink Breadcrumb Block */}
      <section className="bg-slate-50 border border-slate-100 rounded-3xl p-6 sm:p-8 mt-12 grid grid-cols-1 md:grid-cols-2 gap-8" id="indexing-footer">
        <div>
          <h4 className="font-display font-bold text-lg text-gray-900 border-b border-gray-200 pb-2 mb-3">
            Why We Catalog Major Hostnames
          </h4>
          <p className="text-sm text-gray-600 leading-relaxed">
            By cataloging over 100+ critical global nodes, we maintain a live regional baseline metric of the internet's stability. These index directories serve as crawl tunnels, mapping safe HTTP requests across geographic regions to capture outages, server-side gateway timeouts, and local DNS issues immediately.
          </p>
        </div>

        <div className="space-y-4">
          <h4 className="font-display font-bold text-lg text-gray-900 border-b border-gray-200 pb-2 mb-3">
            Quick System Navigation
          </h4>
          <div className="grid grid-cols-2 gap-3 text-xs text-brand-600 font-semibold font-mono">
            <button onClick={() => onNavigate("/ip-ping-tester")} className="hover:underline text-left">→ Live TCP Latency</button>
            <button onClick={() => onNavigate("/ssl-checker")} className="hover:underline text-left">→ SSL Cert Chain Validator</button>
            <button onClick={() => onNavigate("/dns-lookup")} className="hover:underline text-left">→ DNS Dig Resolver</button>
            <button onClick={() => onNavigate("/dns-propagation")} className="hover:underline text-left">→ Global Propagation maps</button>
            <button onClick={() => onNavigate("/whois-lookup")} className="hover:underline text-left">→ Domain WHOIS Registrars</button>
            <button onClick={() => onNavigate("/port-checker")} className="hover:underline text-left">→ Open Port handshaker</button>
          </div>
        </div>
      </section>
    </div>
  );
}
