import { useState, useEffect } from "react";
import { Sparkles, Menu, X, Sun, Moon, TrendingUp, HelpCircle, BookOpen, ChevronRight } from "lucide-react";

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export default function Header({ currentPath, onNavigate }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

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

  const navLinks = [
    { name: "Decision Engine", path: "/" },
    { name: "Diagnostics Suite", path: "/status" },
    { name: "Blog / Insights", path: "/blog" },
    { name: "About", path: "/about" },
  ];

  const handleLinkClick = (path: string) => {
    onNavigate(path);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <header id="site-header" className="sticky top-0 z-40 bg-white/85 dark:bg-slate-900/85 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-800/80 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Logo Section */}
            <div 
              className="flex items-center space-x-2.5 cursor-pointer select-none group" 
              onClick={() => handleLinkClick("/")} 
              id="logo-wrap"
            >
              <div className="h-9 w-9 bg-linear-to-tr from-blue-600 via-indigo-600 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/10 group-hover:scale-105 duration-200 transition-transform">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
              <div className="leading-tight">
                <span className="font-sans font-extrabold text-xl tracking-tight bg-linear-to-r from-blue-600 via-indigo-500 to-amber-500 dark:from-blue-400 dark:via-cyan-400 dark:to-amber-300 bg-clip-text text-transparent">
                  DownOrUp<span className="text-blue-500 dark:text-cyan-400">.net</span>
                </span>
                <span className="text-[10px] block font-mono text-gray-400 dark:text-gray-500 -mt-0.5 font-semibold tracking-wide">
                  SHOULD YOU DO IT?
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1" id="desktop-nav">
              {navLinks.map((link) => {
                const active = currentPath === link.path || 
                  (link.path === "/blog" && currentPath.startsWith("/blog")) ||
                  (link.path === "/status" && (
                    currentPath.startsWith("/status") ||
                    currentPath.startsWith("/dns-lookup") ||
                    currentPath.startsWith("/ip-lookup") ||
                    currentPath.startsWith("/ssl-checker") ||
                    currentPath.startsWith("/whois-lookup") ||
                    currentPath.startsWith("/port-checker")
                  ));
                return (
                  <button
                    key={link.path}
                    onClick={() => handleLinkClick(link.path)}
                    className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                      active
                        ? "bg-slate-100 text-slate-900 dark:bg-slate-800/80 dark:text-white"
                        : "text-slate-600 dark:text-slate-350 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/30"
                    }`}
                  >
                    {link.name}
                  </button>
                );
              })}
            </nav>

            {/* Icons & Controls Block */}
            <div className="flex items-center space-x-3" id="controls">
              
              {/* Highlight CTA */}
              <button
                onClick={() => handleLinkClick("/")}
                className="hidden sm:flex items-center space-x-1.5 px-3.5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white dark:bg-blue-600/10 dark:text-blue-400 dark:border dark:border-blue-500/20 dark:hover:bg-blue-600/20 text-xs font-semibold rounded-lg transition-all"
              >
                <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                <span>Evaluate Now</span>
              </button>

              {/* Light/Dark Toggle */}
              <button
                onClick={() => setIsDark(!isDark)}
                className="p-2 rounded-xl text-slate-500 dark:text-slate-450 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900 transition-all cursor-pointer"
                title="Toggle visual mode"
                aria-label="Toggle theme"
              >
                {isDark ? (
                  <Sun className="h-4.5 w-4.5 text-amber-500" />
                ) : (
                  <Moon className="h-4.5 w-4.5 text-indigo-600" />
                )}
              </button>

              {/* Mobile Drawer trigger */}
              <button
                onClick={() => setIsOpen(true)}
                className="p-2 rounded-xl md:hidden text-slate-500 dark:text-slate-450 hover:text-slate-900 dark:hover:text-white cursor-pointer"
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
          <div className={`absolute inset-y-0 right-0 w-full max-w-xs bg-white dark:bg-slate-900 border-l dark:border-slate-800 shadow-2xl p-6 flex flex-col transform transition-transform duration-300 ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-6">
              <span className="font-sans font-extrabold text-lg text-slate-950 dark:text-white">Navigation Menu</span>
              <button onClick={() => setIsOpen(false)} className="p-1 rounded-lg text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 space-y-5 overflow-y-auto pr-1">
              {/* Primary Pages */}
              <div className="space-y-1">
                <span className="text-[10px] font-mono tracking-widest uppercase text-slate-400 dark:text-slate-500 block mb-2 font-semibold">Decision Desk</span>
                {navLinks.map(link => (
                  <button
                    key={link.path}
                    onClick={() => handleLinkClick(link.path)}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    <span>{link.name}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                  </button>
                ))}
              </div>

              {/* Tagline Box */}
              <div className="mt-8 p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700/65">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5 mb-1">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                  AI Decision Engine
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-350 leading-relaxed">
                  Analyze side hustles, careers, investments, and purchase questions instantly with state-of-the-art AI evaluation reports.
                </p>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-150 dark:border-slate-800 text-center">
              <p className="text-[10px] font-mono text-slate-400">© 2026 DownOrUp.net AI Studio</p>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
