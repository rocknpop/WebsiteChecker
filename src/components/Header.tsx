import { useState, useEffect } from "react";
import { Activity, ShieldCheck, HelpCircle, Network, Menu, X, ChevronDown, ListPlus, Rss, Globe } from "lucide-react";

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export default function Header({ currentPath, onNavigate }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Close menus on path changes or clicks outside
  useEffect(() => {
    setIsOpen(false);
    setDropdownOpen(false);
  }, [currentPath]);

  const mainLinks = [
    { name: "Website Status", path: "/", icon: Activity },
    { name: "Uptime Directory", path: "/status", icon: Globe },
    { name: "IP Ping Tester", path: "/ip-ping-tester", icon: Network },
    { name: "DNS Lookup", path: "/dns-lookup", icon: ListPlus },
    { name: "SSL Checker", path: "/ssl-checker", icon: ShieldCheck },
    { name: "Blog", path: "/blog", icon: Rss },
  ];

  const additionalTools = [
    { name: "IP Lookup", path: "/ip-lookup" },
    { name: "HTTP Header Checker", path: "/http-header-checker" },
    { name: "DNS Propagation", path: "/dns-propagation" },
    { name: "Whois Lookup", path: "/whois-lookup" },
    { name: "Port Checker", path: "/port-checker" },
    { name: "Website Speed Test", path: "/speed-test" },
    { name: "Traceroute Tool", path: "/traceroute" },
    { name: "Redirect Checker", path: "/redirect-checker" },
    { name: "Screenshot Tool", path: "/screenshot-tool" },
    { name: "Email Security Audit", path: "/email-security" },
    { name: "Blacklist Scanner", path: "/blacklist-scanner" },
    { name: "Domain Age Checker", path: "/domain-age" },
  ];

  const isActive = (path: string) => {
    if (path === "/") {
      return currentPath === "/" || currentPath.startsWith("/website-status");
    }
    return currentPath === path;
  };

  return (
    <header id="site-header" className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3 cursor-pointer select-none" onClick={() => onNavigate("/")} id="logo-container">
            <div className="bg-brand-600 text-white p-2 rounded-xl flex items-center justify-center shadow-sm">
              <Activity className="h-6 w-6" />
            </div>
            <div>
              <span className="font-display font-bold text-xl tracking-tight bg-gradient-to-r from-brand-600 via-indigo-600 to-emerald-500 bg-clip-text text-transparent">
                Is it Down or Up
              </span>
              <div className="flex items-center space-x-1.5 leading-none mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-[10px] font-mono uppercase tracking-wider text-gray-500">Live Global Diagnostics</span>
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
                      ? "bg-brand-50 text-brand-700"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  <link.icon className="h-4 w-4" />
                  <span>{link.name}</span>
                </button>
              );
            })}

            {/* Additional Tools Dropdown */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-1.5 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all"
              >
                <span>Diagnostic Tools</span>
                <ChevronDown className="h-4 w-4" />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-xl bg-white border border-gray-100 shadow-lg py-1 z-50 animate-fade-in">
                  <div className="px-3 py-1.5 text-xs font-semibold text-gray-400 uppercase tracking-wider border-b border-gray-100">
                    Network Utilities
                  </div>
                  {additionalTools.map((tool) => (
                    <button
                      key={tool.name}
                      onClick={() => {
                        onNavigate(tool.path);
                        setDropdownOpen(false);
                      }}
                      className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-brand-50 hover:text-brand-700 transition-colors"
                    >
                      {tool.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-500 hover:text-gray-900 p-2 rounded-lg"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white/98 backdrop-blur-md px-4 pt-2 pb-4 space-y-1 block">
          {mainLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => onNavigate(link.path)}
              className={`w-full text-left flex items-center space-x-3 px-3 py-2.5 rounded-lg text-base font-medium ${
                isActive(link.path)
                  ? "bg-brand-50 text-brand-700"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <link.icon className="h-5 w-5" />
              <span>{link.name}</span>
            </button>
          ))}

          <div className="pt-2 border-t border-gray-100">
            <div className="px-3 py-1 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Diagnostic Utilities
            </div>
            {additionalTools.map((tool) => (
              <button
                key={tool.name}
                onClick={() => onNavigate(tool.path)}
                className={`w-full text-left block px-3 py-2.5 rounded-lg text-base font-medium ${
                  currentPath === tool.path
                    ? "text-brand-700 bg-brand-50"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                {tool.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
