import { useState, useEffect } from "react";
import { Sparkles, Menu, X, ChevronDown, ListPlus, Sun, Moon, CheckSquare, Search, Layers, Bookmark, Trash2, Copy, Check } from "lucide-react";

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export default function Header({ currentPath, onNavigate }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [platformDropdown, setPlatformDropdown] = useState(false);
  const [categoryDropdown, setCategoryDropdown] = useState(false);
  const [savedDrawerOpen, setSavedDrawerOpen] = useState(false);
  const [savedUsernames, setSavedUsernames] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  // Initialize theme mode
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      const persisted = localStorage.getItem("preferred-theme");
      if (persisted) {
        return persisted === "dark";
      }
      return true; // Default to sleek dark mode
    }
    return true;
  });

  // Sync dark class on documentElement
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("preferred-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("preferred-theme", "light");
    }
  }, [isDark]);

  // Read saved names from localStorage
  const loadSaved = () => {
    const raw = localStorage.getItem("hh-saved-usernames");
    if (raw) {
      try {
        setSavedUsernames(JSON.parse(raw));
      } catch (e) {
        setSavedUsernames([]);
      }
    } else {
      setSavedUsernames([]);
    }
  };

  useEffect(() => {
    loadSaved();
    // Poll saved storage to sync nicely
    const interval = setInterval(loadSaved, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleRemoveSaved = (username: string) => {
    const updated = savedUsernames.filter(u => u !== username);
    localStorage.setItem("hh-saved-usernames", JSON.stringify(updated));
    setSavedUsernames(updated);
  };

  const handleCopySaved = (username: string, idx: number) => {
    navigator.clipboard.writeText(username);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  const platformCheckers = [
    { name: "Instagram Checker", path: "/instagram-username-checker" },
    { name: "TikTok Checker", path: "/tiktok-username-checker" },
    { name: "YouTube Checker", path: "/youtube-username-checker" },
    { name: "X / Twitter Checker", path: "/x-username-checker" },
    { name: "GitHub Checker", path: "/github-username-checker" },
    { name: "Reddit Checker", path: "/reddit-username-checker" },
  ];

  const categories = [
    { name: "Gamer Usernames", path: "/gamer-usernames" },
    { name: "Creator Usernames", path: "/creator-usernames" },
    { name: "Business Usernames", path: "/business-usernames" },
    { name: "Startup Usernames", path: "/startup-usernames" },
    { name: "Influencer Usernames", path: "/influencer-usernames" },
  ];

  const primaryLinks = [
    { name: "Check Username", path: "/" },
    { name: "My IP Lookup", path: "/my-ip" },
  ];

  return (
    <>
      <header id="site-header" className="sticky top-0 z-40 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-gray-200/50 dark:border-slate-800/80 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Logo Section */}
            <div 
              className="flex items-center space-x-2.5 cursor-pointer select-none group" 
              onClick={() => onNavigate("/")} 
              id="logo-wrap"
            >
              <div className="h-9 w-9 bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/10 group-hover:scale-105 duration-200 transition-transform">
                <Sparkles className="h-5 w-5 text-white animate-pulse" />
              </div>
              <div className="leading-tight">
                <span className="font-display font-extrabold text-xl tracking-tight bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
                  HandleHunt
                </span>
                <span className="text-xs block font-mono text-gray-400 dark:text-gray-550 -mt-0.5 font-medium tracking-wide">
                  AI IDENTITY PLATFORM
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1" id="desktop-nav">
              {primaryLinks.map((link) => {
                const active = currentPath === link.path;
                return (
                  <button
                    key={link.path}
                    onClick={() => onNavigate(link.path)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      active
                        ? "bg-gray-100 text-gray-900 dark:bg-slate-800/60 dark:text-white"
                        : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-slate-800/30"
                    }`}
                  >
                    {link.name}
                  </button>
                );
              })}

              {/* Platform Checker Dropdown */}
              <div className="relative">
                <button
                  onMouseEnter={() => setPlatformDropdown(true)}
                  onClick={() => setPlatformDropdown(!platformDropdown)}
                  className="flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-slate-800/30"
                >
                  <span>Platforms</span>
                  <ChevronDown className="h-3.5 w-3.5" />
                </button>
                {platformDropdown && (
                  <div 
                    onMouseLeave={() => setPlatformDropdown(false)}
                    className="absolute left-0 mt-1 w-56 bg-white dark:bg-slate-900 rounded-xl border border-gray-200/60 dark:border-slate-800 shadow-xl p-1.5 z-55"
                  >
                    {platformCheckers.map((item) => (
                      <button
                        key={item.path}
                        onClick={() => {
                          onNavigate(item.path);
                          setPlatformDropdown(false);
                        }}
                        className="w-full text-left px-3 py-2 text-xs rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-800/60 duration-150 transition-colors"
                      >
                        {item.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Categories Dropdown */}
              <div className="relative">
                <button
                  onMouseEnter={() => setCategoryDropdown(true)}
                  onClick={() => setCategoryDropdown(!categoryDropdown)}
                  className="flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-slate-800/30"
                >
                  <span>Ideas & Nicknames</span>
                  <ChevronDown className="h-3.5 w-3.5" />
                </button>
                {categoryDropdown && (
                  <div 
                    onMouseLeave={() => setCategoryDropdown(false)}
                    className="absolute left-0 mt-1 w-56 bg-white dark:bg-slate-900 rounded-xl border border-gray-200/60 dark:border-slate-800 shadow-xl p-1.5 z-55"
                  >
                    {categories.map((item) => (
                      <button
                        key={item.path}
                        onClick={() => {
                          onNavigate(item.path);
                          setCategoryDropdown(false);
                        }}
                        className="w-full text-left px-3 py-2 text-xs rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-800/60 duration-150 transition-colors"
                      >
                        {item.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </nav>

            {/* Icons & Controls Block */}
            <div className="flex items-center space-x-2" id="controls">
              
              {/* Favorites Drawer Toggle */}
              <button
                onClick={() => setSavedDrawerOpen(true)}
                className="relative p-2 rounded-xl text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-slate-800/80 transition-all"
                title="Saved Handles"
              >
                <Bookmark className="h-5 w-5" />
                {savedUsernames.length > 0 && (
                  <span className="absolute top-0.5 right-0.5 bg-purple-600 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-scale-in">
                    {savedUsernames.length}
                  </span>
                )}
              </button>

              {/* Light/Dark Toggle */}
              <button
                onClick={() => setIsDark(!isDark)}
                className="p-2 rounded-xl text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-slate-800/80 transition-all font-medium"
                title="Toggle Mode"
                aria-label="Toggle theme"
              >
                {isDark ? (
                  <Sun className="h-5 w-5 text-amber-500 animate-spin-slow" />
                ) : (
                  <Moon className="h-5 w-5 text-indigo-600" />
                )}
              </button>

              {/* Mobile Drawer trigger */}
              <button
                onClick={() => setIsOpen(true)}
                className="p-2 rounded-xl md:hidden text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                aria-label="Open menu"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Slideout Navigation */}
        <div 
          className={`fixed inset-0 z-50 md:hidden transition-all duration-300 ${
            isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        >
          <div className="absolute inset-0 bg-slate-950/50 backdrop-blur-xs" onClick={() => setIsOpen(false)} />
          <div className={`absolute inset-y-0 right-0 w-full max-w-xs bg-white dark:bg-slate-900 shadow-2xl p-6 flex flex-col transform transition-transform duration-300 ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}>
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-slate-800 mb-6">
              <span className="font-display font-black text-lg text-gray-900 dark:text-white">Menu Navigation</span>
              <button onClick={() => setIsOpen(false)} className="p-1 rounded-lg text-gray-500 hover:bg-gray-50 dark:hover:bg-slate-850">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 space-y-5 overflow-y-auto pr-1">
              {/* Primary */}
              <div className="space-y-1">
                <span className="text-[10px] font-mono tracking-widest uppercase text-gray-400 dark:text-gray-500 block mb-1">Utilities</span>
                {primaryLinks.map(link => (
                  <button
                    key={link.path}
                    onClick={() => {
                      onNavigate(link.path);
                      setIsOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800"
                  >
                    {link.name}
                  </button>
                ))}
              </div>

              {/* Platforms */}
              <div className="space-y-1">
                <span className="text-[10px] font-mono tracking-widest uppercase text-gray-400 dark:text-gray-500 block mb-1">Platforms Checkers</span>
                {platformCheckers.map(link => (
                  <button
                    key={link.path}
                    onClick={() => {
                      onNavigate(link.path);
                      setIsOpen(false);
                    }}
                    className="w-full text-left px-3 py-1.5 rounded-lg text-xs text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800"
                  >
                    {link.name}
                  </button>
                ))}
              </div>

              {/* Ideas */}
              <div className="space-y-1">
                <span className="text-[10px] font-mono tracking-widest uppercase text-gray-400 dark:text-gray-500 block mb-1">Nicknames & Lists</span>
                {categories.map(link => (
                  <button
                    key={link.path}
                    onClick={() => {
                      onNavigate(link.path);
                      setIsOpen(false);
                    }}
                    className="w-full text-left px-3 py-1.5 rounded-lg text-xs text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800"
                  >
                    {link.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-gray-100 dark:border-slate-800 text-center">
              <p className="text-[10px] font-mono text-gray-400">© HandleHunt AI Studio</p>
            </div>
          </div>
        </div>
      </header>

      {/* SAVED HANDLES DRAWER SECTION */}
      {savedDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden" id="saved-drawer">
          <div className="absolute inset-0 bg-slate-950/65 backdrop-blur-xs transition-opacity" onClick={() => setSavedDrawerOpen(false)} />
          <div className="absolute inset-y-0 right-0 max-w-md w-full bg-white dark:bg-slate-950 shadow-2xl flex flex-col">
            <div className="p-6 border-b border-gray-100 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Bookmark className="h-5 w-5 text-purple-600 animate-bounce" />
                <h3 className="font-display font-bold text-lg text-gray-900 dark:text-white">Saved Identity Catalog</h3>
              </div>
              <button 
                onClick={() => setSavedDrawerOpen(false)} 
                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-900 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* List Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {savedUsernames.length === 0 ? (
                <div className="text-center py-16 px-4">
                  <div className="h-12 w-12 rounded-2xl bg-gray-100 dark:bg-slate-900 flex items-center justify-center mx-auto mb-4 text-gray-400">
                    <Bookmark className="h-6 w-6" />
                  </div>
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200">No saved handles yet</h4>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1 max-w-xs mx-auto">
                    Search and click the bookmark star button next to any generated handle in the search results or suggestions to save it here.
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  <span className="text-[10px] font-mono tracking-widest text-gray-400 dark:text-gray-500 uppercase block mb-3">
                    Collected handles ({savedUsernames.length})
                  </span>
                  {savedUsernames.map((username, index) => (
                    <div 
                      key={username} 
                      className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-slate-900 border border-gray-200/50 dark:border-slate-800/80 hover:bg-gray-100/50 dark:hover:bg-slate-850 duration-150"
                    >
                      <div className="flex flex-col">
                        <span className="font-mono text-sm font-semibold text-purple-600 dark:text-purple-400">
                          @{username}
                        </span>
                        <span className="text-[9px] text-gray-400">
                          Click to copy or search
                        </span>
                      </div>
                      <div className="flex items-center space-x-1.5">
                        <button
                          onClick={() => handleCopySaved(username, index)}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-200/50 dark:hover:bg-slate-800"
                          title="Copy Username"
                        >
                          {copiedIndex === index ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
                        </button>
                        <button
                          onClick={() => {
                            setSavedDrawerOpen(false);
                            onNavigate(`/?username=${username}`);
                          }}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-200/50 dark:hover:bg-slate-800"
                          title="Query now"
                        >
                          <Search className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleRemoveSaved(username)}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-gray-200/50 dark:hover:bg-slate-800"
                          title="Remove item"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="p-6 border-t border-gray-100 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-950">
              <button
                onClick={() => {
                  if (confirm("Clear all gathered items?")) {
                    localStorage.removeItem("hh-saved-usernames");
                    setSavedUsernames([]);
                  }
                }}
                disabled={savedUsernames.length === 0}
                className="w-full text-center py-2.5 rounded-xl border border-gray-200 dark:border-slate-800 text-xs font-semibold text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all disabled:opacity-50 disabled:pointer-events-none"
              >
                Flush Collection
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
