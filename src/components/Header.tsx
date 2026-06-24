import { useState, useEffect, useRef } from "react";
import { Sparkles, Menu, X, TrendingUp, ChevronRight } from "lucide-react";

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

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      if (window.scrollY > 10) setIsOpen(false);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
      {/* ── Fixed navbar bar ── always visible on all screen sizes */}
      <header
        style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50 }}
        className={`border-b border-gray-100 bg-white ${scrolled ? "shadow-md" : "shadow-sm"}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* flex always — never hidden */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "64px" }}>

            {/* Logo — always visible */}
            <div
              style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}
              onClick={() => handleLinkClick("/")}
            >
              <div className="h-9 w-9 bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-500 rounded-xl flex items-center justify-center shadow-md">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
              <span className="font-black text-2xl tracking-tight text-gray-900">
                DownOrUp<span className="text-blue-600">.net</span>
              </span>
            </div>

            {/* Desktop nav — hidden below md */}
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

            {/* Right controls */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              {/* Evaluate Now — desktop only */}
              <button
                onClick={() => handleLinkClick("/")}
                className="hidden md:flex items-center space-x-1.5 px-5 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-sm font-bold rounded-full shadow-md transition-colors duration-150 active:scale-95"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Evaluate Now</span>
              </button>

              {/* Hamburger — mobile only, always rendered */}
              <button
                onClick={() => setIsOpen((v) => !v)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "8px",
                  borderRadius: "8px",
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                }}
                className="md:hidden"
                aria-label={isOpen ? "Close menu" : "Open menu"}
              >
                {isOpen
                  ? <X className="h-6 w-6" style={{ color: "#374151" }} />
                  : <Menu className="h-6 w-6" style={{ color: "#374151" }} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── Mobile slide-in drawer ── */}
      {isOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 60 }}>
          {/* Backdrop */}
          <div
            style={{ position: "absolute", inset: 0, background: "rgba(17,24,39,0.4)" }}
            onClick={() => setIsOpen(false)}
          />
          {/* Drawer panel */}
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              bottom: 0,
              width: "288px",
              background: "#fff",
              boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Drawer header */}
            <div className="flex items-center px-5 py-4 border-b border-gray-100">
              <div className="h-7 w-7 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center mr-2.5">
                <TrendingUp className="h-4 w-4 text-white" />
              </div>
              <span className="font-black text-lg text-gray-900">
                DownOrUp<span className="text-blue-600">.net</span>
              </span>
            </div>

            {/* Nav links */}
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
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm transition-colors duration-150 ${
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

              {/* Evaluate Now in mobile menu */}
              <button
                onClick={() => handleLinkClick("/")}
                className="mt-4 w-full flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-bold rounded-xl shadow-sm active:scale-95 transition-colors duration-150"
              >
                <Sparkles className="w-4 h-4" />
                <span>Evaluate Now</span>
              </button>
            </div>

            <div className="px-5 py-4 border-t border-gray-100 text-center">
              <p className="text-[10px] font-mono text-gray-400">© 2026 DownOrUp.net</p>
            </div>
          </div>
        </div>
      )}

      {/* Spacer so page content starts below the fixed bar */}
      <div style={{ height: "64px" }} />
    </div>
  );
}
