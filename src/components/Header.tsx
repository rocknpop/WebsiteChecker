import { useState, useEffect } from "react";
import { Activity, ShieldCheck, HelpCircle, Network, Menu, X, ChevronDown, ListPlus, Rss, Globe, Sun, Moon, Laptop } from "lucide-react";

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export default function Header({ currentPath, onNavigate }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Initialize dark mode from localStorage or device preference
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      const persisted = localStorage.getItem("preferred-theme");
      if (persisted) {
        return persisted === "dark";
      }
      return true; // Default to dark mode when site is opened
    }
    return true; // Default to dark mode when site is opened
  });

  // Sync dark mode class on document element
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("preferred-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("preferred-theme", "light");
    }
  }, [isDark]);

  // Close menus on path changes or clicks outside
  useEffect(() => {
    setIsOpen(false);
    setDropdownOpen(false);
  }, [currentPath]);

  const mainLinks = [
    { name: "Website Status", path: "/", icon: Activity },
    { name: "My IP", path: "/my-ip", icon: Laptop },
  ];

  const isActive = (path: string) => {
    if (path === "/") {
      return currentPath === "/" || currentPath.startsWith("/website-status");
    }
    return currentPath === path;
  };

  return (
    <header id="site-header" className="sticky top-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-gray-100 dark:border-slate-800 shadow-xs transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3 cursor-pointer select-none" onClick={() => onNavigate("/")} id="logo-container">
            <div className="bg-brand-600 text-white p-2 rounded-xl flex items-center justify-center shadow-sm">
              <Activity className="h-6 w-6" />
            </div>
            <div>
              <span className="font-display font-extrabold text-xl tracking-tight bg-gradient-to-r from-brand-600 via-indigo-600 to-emerald-500 dark:from-brand-400 dark:via-cyan-400 dark:to-amber-300 bg-clip-text text-transparent">
                DownOrUp<span className="text-brand-600 dark:text-amber-400">.net</span>
              </span>
              <div className="flex items-center space-x-1.5 leading-none mt-0.5 animate-fade-in">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-[9px] font-mono uppercase tracking-wider text-gray-400 dark:text-gray-500 font-semibold">Know What's Up. Know What's Down.</span>
              </div>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-1" id="desktop-nav">
            {mainLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <button
                  key={link.name}
                  onClick={() => onNavigate(link.path)}
                  className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    active
                      ? "bg-brand-50 text-brand-700 dark:bg-slate-800/80 dark:text-amber-400"
                      : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-slate-800/60"
                  }`}
                >
                  <link.icon className={`h-4 w-4 transition-colors ${active ? "text-brand-600 dark:text-amber-400" : ""}`} />
                  <span className={active ? "dark:bg-gradient-to-r dark:from-amber-300 dark:to-yellow-400 dark:bg-clip-text dark:text-transparent dark:font-semibold" : ""}>
                    {link.name}
                  </span>
                </button>
              );
            })}

          </nav>

          {/* Action section for Toggle and Side Navigation Options */}
          <div className="flex items-center space-x-2" id="header-actions">
            {/* Global Dark Mode Switch Toggle button */}
            <button
              onClick={() => setIsDark(!isDark)}
              className="text-gray-500 dark:text-gray-400 hover:text-gray-950 dark:hover:text-white p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-800 transition-all focus:outline-hidden"
              aria-label={isDark ? "Enable light mode" : "Enable dark mode"}
              title={isDark ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDark ? (
                <Sun className="h-5 w-5 text-amber-500 hover:scale-110 active:scale-95 transition-transform" />
              ) : (
                <Moon className="h-5 w-5 text-indigo-600 hover:scale-110 active:scale-95 transition-transform" />
              )}
            </button>

            {/* Mobile menu button */}
            <div className="md:hidden mobile-nav-menu" id="mobile-menu-trigger-container">
              <button
                onClick={() => setIsOpen(true)}
                className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white p-2 rounded-lg focus:outline-hidden"
                aria-label="Open navigation menu"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Slide-out Navigation Drawer and Overlay */}
      <div 
        className={`fixed inset-0 z-50 md:hidden transition-all duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        } mobile-nav-menu`}
        id="mobile-drawer-root"
      >
        {/* Backdrop overlay */}
        <div 
          className={`absolute inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity duration-300 ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsOpen(false)}
        />

        {/* Dynamic sliding panel */}
        <div 
          className={`absolute inset-y-0 right-0 w-full max-w-sm bg-white dark:bg-slate-900 border-l border-gray-100 dark:border-slate-800 shadow-2xl flex flex-col z-50 transition-all duration-300 ease-in-out transform ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Drawer Title & Close Hook */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 dark:border-slate-800">
            <div className="flex items-center space-x-2">
              <div className="bg-brand-600 text-white p-1.5 rounded-lg animate-pulse">
                <Activity className="h-5 w-5" />
              </div>
              <span className="font-display font-bold text-lg text-gray-900 dark:text-white">DownOrUp Tools</span>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-2 rounded-md hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
              aria-label="Close navigation menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation Links List (Scrollable) */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
            {/* Primary Navigation Options */}
            <div>
              <div className="text-xs font-semibold text-gray-400 dark:text-gray-550 uppercase tracking-wider mb-2 px-1">
                Primary Features
              </div>
              <div className="space-y-1">
                {mainLinks.map((link) => {
                  const active = isActive(link.path);
                  return (
                    <button
                      key={link.name}
                      onClick={() => {
                        onNavigate(link.path);
                        setIsOpen(false);
                      }}
                      className={`w-full text-left flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                        active
                          ? "bg-brand-50 text-brand-700 dark:bg-slate-800 dark:text-amber-400 font-semibold"
                          : "text-gray-600 dark:text-gray-300 hover:text-gray-950 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-slate-800/50"
                      }`}
                    >
                      <link.icon className={`h-5 w-5 ${active ? "text-brand-600 dark:text-amber-400" : "text-gray-400 dark:text-gray-500"}`} />
                      <span>{link.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Drawer footer layout */}
          <div className="p-6 bg-gray-50 dark:bg-slate-950 border-t border-gray-100 dark:border-slate-800 flex items-center justify-between">
            <span className="text-xs font-mono text-gray-400 dark:text-gray-500">STATUS MONITOR V1.1.0</span>
            <div className="flex items-center space-x-1 text-emerald-600 dark:text-emerald-450">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-xs font-medium dark:text-emerald-400">All Nodes Online</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
