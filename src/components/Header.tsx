import { useState, useEffect, useRef } from "react";
import { Sparkles, Menu, TrendingUp, ChevronRight } from "lucide-react";

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export default function Header({ currentPath, onNavigate }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const mouseLeaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    document.documentElement.classList.remove("dark");
    localStorage.removeItem("preferred-theme");
  }, []);

  // Scroll: shadow + auto-close menu after 10px
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      if (window.scrollY > 10) setIsOpen(false);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Click outside to close
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const handleMouseLeave = () => {
    mouseLeaveTimer.current = setTimeout(() => setIsOpen(false), 300);
  };

  const handleMouseEnter = () => {
    if (mouseLeaveTimer.current) clearTimeout(mouseLeaveTimer.current);
  };

  const navLinks = [
    { name: "Decision Engine",   path: "/" },
    { name: "Diagnostics Suite", path: "/status" },
    { name: "Blog / Insights",   path: "/blog" },
    { name: "About",             path: "/about" },
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
    <div ref={navRef} onMouseLeave={handleMouseLeave} onMouseEnter={handleMouseEnter}>
      <header
        id="site-header"
        className={`fixed top-0 left-0 right-0 z-50 border-b border-gray-100 transition-shadow duration-200 ${
          scrolled ? "bg-white shadow-md" : "bg-white shadow-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">

            {/* Logo */}
            <div
              className="flex items-center space-x-2.5 cursor-pointer select-none"
              onClick={() => handleLinkClick("/")}
            >
              <div className="h-9 w-9 bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-500 rounded-xl flex items-center justify-center shadow-md">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
              <span className="font-black text-2xl tracking-tight text-gray-900">
                DownOrUp<span className="text-blue-600">.net</span>
              </span>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => {
                const active = isActive(link.path);
                return (
                  <button
                    key={link.path}
                    onClick={() => handleLinkClick(link.path)}
                    className={`relative px-4 py-2 rounded-full text-sm transition-colors duration-150 cursor-pointer ${
                      active
                        ? "bg-blue-50 text-blue-600 font-semibold"
                        : "text-gray-600 hover:text-blue-600 font-medium"
                    }`}
                  >
                    {link.name}
                    {active && (
                      <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-blue-600 rounded-full" />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Controls */}
            <div className="flex items-center space-x-3">
              <button
                onClick={() => handleLinkClick("/")}
                className="hidden sm:flex items-center space-x-1.5 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-sm font-bold rounded-full shadow-md transition-colors duration-150 active:scale-95"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Evaluate Now</span>
              </button>

              <button
                onClick={() => setIsOpen(true)}
                className="p-2 rounded-xl md:hidden text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-150 cursor-pointer"
                aria-label="Open menu"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer — only mounted when open */}
      {isOpen && (
        <div className="fixed inset-0 z-[60]">
          <div
            className="absolute inset-0 bg-gray-900/40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute inset-y-0 right-0 w-72 bg-white shadow-2xl flex flex-col">
            <div className="flex items-center px-5 py-4 border-b border-gray-100">
              <div className="h-7 w-7 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center mr-2">
                <TrendingUp className="h-4 w-4 text-white" />
              </div>
              <span className="font-black text-lg text-gray-900">
                DownOrUp<span className="text-blue-600">.net</span>
              </span>
            </div>

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
                    className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm transition-colors duration-150 ${
                      active
                        ? "bg-blue-50 text-blue-600 font-semibold"
                        : "text-gray-700 hover:bg-gray-50 hover:text-blue-600 font-medium"
                    }`}
                  >
                    <span>{link.name}</span>
                    <ChevronRight className={`w-4 h-4 ${active ? "text-blue-400" : "text-gray-300"}`} />
                  </button>
                );
              })}

              <button
                onClick={() => handleLinkClick("/")}
                className="mt-4 w-full flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-bold rounded-xl shadow-sm active:scale-95"
              >
                <Sparkles className="w-4 h-4" />
                <span>Evaluate Now</span>
              </button>

              <div className="mt-4 p-4 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100">
                <h4 className="text-xs font-bold text-gray-900 flex items-center gap-1.5 mb-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                  AI Decision Engine
                </h4>
                <p className="text-[11px] text-gray-500 leading-relaxed">
                  Analyze side hustles, careers, investments, and purchases instantly with AI reports.
                </p>
                <button
                  onClick={() => handleLinkClick("/")}
                  className="mt-3 w-full py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold rounded-xl shadow-sm active:scale-95"
                >
                  Try It Now →
                </button>
              </div>
            </div>

            <div className="px-5 py-4 border-t border-gray-100 text-center">
              <p className="text-[10px] font-mono text-gray-400">© 2026 DownOrUp.net AI Studio</p>
            </div>
          </div>
        </div>
      )}

      <div className="h-16" />
    </div>
  );
}
