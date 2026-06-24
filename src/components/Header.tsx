import { useState, useEffect } from "react";
import { Sparkles, Menu, X, TrendingUp, ChevronRight } from "lucide-react";

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export default function Header({ currentPath, onNavigate }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Permanently light mode — remove any persisted dark class
  useEffect(() => {
    document.documentElement.classList.remove("dark");
    localStorage.removeItem("preferred-theme");
  }, []);

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
      <header id="site-header" className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">

            {/* Logo */}
            <div
              className="flex items-center space-x-2.5 cursor-pointer select-none group"
              onClick={() => handleLinkClick("/")}
              id="logo-wrap"
            >
              <div className="h-9 w-9 bg-linear-to-tr from-blue-600 via-indigo-600 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-105 duration-200 transition-transform">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
              <div className="leading-tight">
                <span className="font-sans font-extrabold text-xl tracking-tight bg-linear-to-r from-blue-700 via-blue-500 to-indigo-600 bg-clip-text text-transparent">
                  DownOrUp<span className="text-blue-500">.net</span>
                </span>
                <span className="text-[10px] block font-mono text-gray-400 -mt-0.5 font-semibold tracking-wide">
                  SHOULD YOU DO IT?
                </span>
              </div>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center space-x-1" id="desktop-nav">
              {navLinks.map((link) => {
                const active =
                  currentPath === link.path ||
                  (link.path === "/blog" && currentPath.startsWith("/blog")) ||
                  (link.path === "/status" &&
                    (currentPath.startsWith("/status") ||
                      currentPath.startsWith("/dns-lookup") ||
                      currentPath.startsWith("/ip-lookup") ||
                      currentPath.startsWith("/ssl-checker") ||
                      currentPath.startsWith("/whois-lookup") ||
                      currentPath.startsWith("/port-checker")));
                return (
                  <button
                    key={link.path}
                    onClick={() => handleLinkClick(link.path)}
                    className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                      active
                        ? "bg-blue-50 text-blue-700 font-semibold"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    }`}
                  >
                    {link.name}
                  </button>
                );
              })}
            </nav>

            {/* Controls */}
            <div className="flex items-center space-x-3" id="controls">
              <button
                onClick={() => handleLinkClick("/")}
                className="hidden sm:flex items-center space-x-1.5 px-3.5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg transition-all shadow-sm shadow-blue-500/20"
              >
                <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                <span>Evaluate Now</span>
              </button>

              <button
                onClick={() => setIsOpen(true)}
                className="p-2 rounded-xl md:hidden text-gray-500 hover:text-gray-900 hover:bg-gray-100 cursor-pointer"
                aria-label="Open menu"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Slideout */}
        <div
          className={`fixed inset-0 z-50 md:hidden transition-all duration-300 ${
            isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        >
          <div className="absolute inset-0 bg-gray-900/30 backdrop-blur-xs" onClick={() => setIsOpen(false)} />
          <div
            className={`absolute inset-y-0 right-0 w-full max-w-xs bg-white border-l border-gray-200 shadow-2xl p-6 flex flex-col transform transition-transform duration-300 ease-in-out ${
              isOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
              <span className="font-sans font-extrabold text-lg text-gray-900">Navigation</span>
              <button onClick={() => setIsOpen(false)} className="p-1 rounded-lg text-gray-500 hover:bg-gray-100">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 space-y-5 overflow-y-auto pr-1">
              <div className="space-y-1">
                <span className="text-[10px] font-mono tracking-widest uppercase text-gray-400 block mb-2 font-semibold">
                  Decision Desk
                </span>
                {navLinks.map((link) => (
                  <button
                    key={link.path}
                    onClick={() => handleLinkClick(link.path)}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm text-gray-800 hover:bg-gray-100"
                  >
                    <span>{link.name}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                  </button>
                ))}
              </div>

              <div className="mt-8 p-4 rounded-xl bg-blue-50 border border-blue-100">
                <h4 className="text-xs font-bold text-gray-900 flex items-center gap-1.5 mb-1">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                  AI Decision Engine
                </h4>
                <p className="text-[11px] text-gray-500 leading-relaxed">
                  Analyze side hustles, careers, investments, and purchase questions instantly with AI evaluation reports.
                </p>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-100 text-center">
              <p className="text-[10px] font-mono text-gray-400">© 2026 DownOrUp.net AI Studio</p>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
