import { useState, useEffect } from "react";
import { Sparkles, Menu, X, TrendingUp, ChevronRight } from "lucide-react";

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export default function Header({ currentPath, onNavigate }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Permanently light mode
  useEffect(() => {
    document.documentElement.classList.remove("dark");
    localStorage.removeItem("preferred-theme");
  }, []);

  // Scroll shadow effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const navLinks = [
    { name: "Decision Engine", path: "/", tooltip: "AI-powered decision analysis" },
    { name: "Diagnostics Suite", path: "/status", tooltip: "Check website status, DNS, SSL & more" },
    { name: "Blog / Insights", path: "/blog", tooltip: "Expert guides & strategic advice" },
    { name: "About", path: "/about", tooltip: "Our mission & how it works" },
  ];

  const isActive = (path: string) =>
    currentPath === path ||
    (path === "/blog" && currentPath.startsWith("/blog")) ||
    (path === "/status" && (
      currentPath.startsWith("/status") ||
      currentPath.startsWith("/dns-lookup") ||
      currentPath.startsWith("/ip-lookup") ||
      currentPath.startsWith("/ssl-checker") ||
      currentPath.startsWith("/whois-lookup") ||
      currentPath.startsWith("/port-checker")
    ));

  const handleLinkClick = (path: string) => {
    onNavigate(path);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <header
        id="site-header"
        className={`fixed top-0 left-0 right-0 z-40 border-b border-gray-100 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-lg shadow-md"
            : "bg-white/80 backdrop-blur-lg shadow-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">

            {/* Logo */}
            <div
              className="flex items-center space-x-2.5 cursor-pointer select-none group"
              onClick={() => handleLinkClick("/")}
              id="logo-wrap"
            >
              <div className="h-9 w-9 bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-500 rounded-xl flex items-center justify-center shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-200">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
              <span className="font-black text-2xl tracking-tight text-gray-900">
                DownOrUp<span className="text-blue-600">.net</span>
              </span>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center space-x-1" id="desktop-nav">
              {navLinks.map((link) => {
                const active = isActive(link.path);
                return (
                  <div key={link.path} className="relative group/nav">
                    <button
                      onClick={() => handleLinkClick(link.path)}
                      className={`relative px-4 py-2 rounded-full text-sm transition-all duration-200 cursor-pointer ${
                        active
                          ? "bg-blue-50 text-blue-600 font-semibold"
                          : "text-gray-600 hover:bg-blue-50 hover:text-blue-600 font-medium"
                      }`}
                    >
                      {link.name}
                      {/* Animated blue dot indicator for active link */}
                      {active && (
                        <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse" />
                      )}
                    </button>
                    {/* Tooltip */}
                    {link.tooltip && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1.5 bg-gray-900 text-white text-[11px] font-medium rounded-lg whitespace-nowrap opacity-0 group-hover/nav:opacity-100 pointer-events-none transition-opacity duration-200 z-50 shadow-lg">
                        {link.tooltip}
                        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45" />
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* Controls */}
            <div className="flex items-center space-x-3">
              <button
                onClick={() => handleLinkClick("/")}
                className="hidden sm:flex items-center space-x-1.5 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-sm font-bold rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200 active:scale-95"
              >
                <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                <span>Evaluate Now</span>
              </button>

              <button
                onClick={() => setIsOpen(true)}
                className="p-2 rounded-xl md:hidden text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors cursor-pointer"
                aria-label="Open menu"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <div
        className={`fixed inset-0 z-50 md:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />

        {/* Drawer */}
        <div
          className={`absolute inset-y-0 right-0 w-72 bg-white shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Drawer header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <span className="flex items-center space-x-2">
              <div className="h-7 w-7 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-4 w-4 text-white" />
              </div>
              <span className="font-black text-lg text-gray-900">
                DownOrUp<span className="text-blue-600">.net</span>
              </span>
            </span>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Drawer links */}
          <div className="flex-1 overflow-y-auto px-4 py-5 space-y-1">
            <p className="text-[10px] font-mono tracking-widest uppercase text-gray-400 font-semibold px-2 mb-3">
              Navigation
            </p>
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <button
                  key={link.path}
                  onClick={() => handleLinkClick(link.path)}
                  className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm transition-all duration-150 ${
                    active
                      ? "bg-blue-50 text-blue-600 font-semibold"
                      : "text-gray-700 hover:bg-gray-50 hover:text-blue-600 font-medium"
                  }`}
                >
                  <span>{link.name}</span>
                  <ChevronRight className={`w-4 h-4 transition-colors ${active ? "text-blue-400" : "text-gray-300"}`} />
                </button>
              );
            })}

            <div className="mt-6 p-4 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100">
              <h4 className="text-xs font-bold text-gray-900 flex items-center gap-1.5 mb-1.5">
                <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                AI Decision Engine
              </h4>
              <p className="text-[11px] text-gray-500 leading-relaxed">
                Analyze side hustles, careers, investments, and purchases instantly with AI reports.
              </p>
              <button
                onClick={() => handleLinkClick("/")}
                className="mt-3 w-full py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold rounded-xl shadow-sm active:scale-95 transition-transform"
              >
                Try It Now →
              </button>
            </div>
          </div>

          {/* Drawer footer */}
          <div className="px-5 py-4 border-t border-gray-100 text-center">
            <p className="text-[10px] font-mono text-gray-400">© 2026 DownOrUp.net AI Studio</p>
          </div>
        </div>
      </div>

      {/* Spacer so content doesn't go under fixed header */}
      <div className="h-16" />
    </>
  );
}
