import { useState, useEffect, useRef } from "react";
import { Sparkles, Menu, X, TrendingUp, ChevronRight, ChevronDown, MapPin, Globe, Search, Lock, FileText, Zap } from "lucide-react";

const ITEM_ICONS: Record<string, typeof MapPin> = {
  "What is my IP?": MapPin,
  "Website Status": Globe,
  "DNS Lookup": Search,
  "SSL Checker": Lock,
  "WHOIS Lookup": FileText,
  "Port Checker": Zap,
  "Should You Do It?": Sparkles,
};

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export default function Header({ currentPath, onNavigate }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [width, setWidth] = useState(0);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleDropdownEnter = (name: string) => {
    if (dropdownTimer.current) clearTimeout(dropdownTimer.current);
    setOpenDropdown(name);
  };

  const handleDropdownLeave = () => {
    dropdownTimer.current = setTimeout(() => setOpenDropdown(null), 150);
  };

  useEffect(() => {
    setWidth(window.innerWidth);
    const handler = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  const isMobile = width < 768;
  const isReady = width > 0;

  const navLinks = [
    { name: "Diagnostics Suite", path: "/status" },
    { name: "Decision Engine", path: "/" },
    { name: "Blog / Insights", path: "/blog" },
    { name: "About", path: "/about" },
  ];

  const dropdownItems: Record<string, {name: string, path: string, description: string}[]> = {
    "Diagnostics Suite": [
      { name: "What is my IP?", path: "/ip-lookup", description: "Detect your public IP & location" },
      { name: "Website Status", path: "/status", description: "Check if any site is up or down" },
      { name: "DNS Lookup", path: "/dns-lookup", description: "Query A, MX, CNAME, TXT records" },
      { name: "SSL Checker", path: "/ssl-checker", description: "Validate SSL certificates" },
      { name: "WHOIS Lookup", path: "/whois-lookup", description: "Find domain owner & registration" },
      { name: "Port Checker", path: "/port-checker", description: "Scan common network ports" },
    ],
    "Decision Engine": [
      { name: "Should You Do It?", path: "/", description: "AI verdict on any decision" },
    ],
  };

  const handleLinkClick = (path: string) => {
    onNavigate(path);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <style>{`
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateX(-50%) translateY(-8px); }
          to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>
      <header style={{position:"fixed",top:0,left:0,right:0,zIndex:9999,background:"rgba(255,255,255,0.98)",backdropFilter:isMobile?"none":"blur(12px)",borderBottom:"1px solid #e5e7eb",boxShadow:"0 1px 3px rgba(0,0,0,0.1)",overflowX:"hidden",maxWidth:"100vw"}}>
        <div style={{maxWidth:"1280px",margin:"0 auto",padding:"0 16px",height:"64px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>

          {/* Logo - left */}
          <div style={{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer",flexShrink:0}} onClick={() => handleLinkClick("/")}>
            <div style={{height:"32px",width:"32px",flexShrink:0,background:"linear-gradient(135deg,#2563eb,#4f46e5)",borderRadius:"10px",display:"flex",alignItems:"center",justifyContent:"center"}}>
              <TrendingUp style={{height:"18px",width:"18px",color:"white"}} />
            </div>
            <span style={{fontWeight:"900",fontSize:"18px",whiteSpace:"nowrap",background:"linear-gradient(135deg,#06b6d4,#3b82f6,#6366f1)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>
              DownOrUp.net
            </span>
          </div>

          {/* Center - desktop nav OR empty spacer on mobile */}
          <div style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center"}}>
            {isReady && !isMobile && (
              <nav style={{display:"flex",alignItems:"center",gap:"4px"}}>
                {navLinks.map((link) => {
                  const items = dropdownItems[link.name];
                  const isActive = currentPath === link.path;
                  const isOpenNow = items && openDropdown === link.name;
                  return (
                    <div
                      key={link.path}
                      style={{position:"relative"}}
                      onMouseEnter={() => items && handleDropdownEnter(link.name)}
                      onMouseLeave={() => items && handleDropdownLeave()}
                    >
                      <button
                        onClick={() => handleLinkClick(link.path)}
                        style={{padding:"8px 16px",borderRadius:"999px",border:"none",background:isActive?"#eff6ff":"transparent",color:isActive?"#2563eb":"#4b5563",fontWeight:isActive?"600":"500",fontSize:"14px",cursor:"pointer",display:"flex",alignItems:"center",gap:"4px",position:"relative"}}
                      >
                        <span>{link.name}</span>
                        {items && <ChevronDown style={{height:"14px",width:"14px",transition:"transform 0.15s",transform:isOpenNow?"rotate(180deg)":"rotate(0deg)"}} />}
                        {isActive && (
                          <span style={{position:"absolute",bottom:"-2px",left:"50%",transform:"translateX(-50%)",width:"20px",height:"2px",borderRadius:"999px",background:"#2563eb"}} />
                        )}
                      </button>

                      {isOpenNow && (
                        <div
                          onMouseEnter={() => handleDropdownEnter(link.name)}
                          onMouseLeave={handleDropdownLeave}
                          style={{
                            position: "absolute",
                            top: "calc(100% + 8px)",
                            left: "50%",
                            transform: "translateX(-50%)",
                            background: "white",
                            borderRadius: "16px",
                            boxShadow: "0 20px 60px rgba(0,0,0,0.12), 0 4px 20px rgba(0,0,0,0.08)",
                            border: "1px solid #f0f0f0",
                            padding: "8px",
                            minWidth: "260px",
                            zIndex: 9999,
                            animation: "fadeInDown 0.15s ease"
                          }}
                        >
                          <div style={{
                            position: "absolute",
                            top: "-6px",
                            left: "50%",
                            width: "12px",
                            height: "12px",
                            background: "white",
                            border: "1px solid #f0f0f0",
                            borderBottom: "none",
                            borderRight: "none",
                            transform: "translateX(-50%) rotate(45deg)"
                          }} />
                          {items.map((item) => {
                            const Icon = ITEM_ICONS[item.name];
                            return (
                              <button
                                key={item.path}
                                onClick={() => handleLinkClick(item.path)}
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "12px",
                                  padding: "10px 14px",
                                  borderRadius: "12px",
                                  cursor: "pointer",
                                  transition: "background 0.15s",
                                  border: "none",
                                  background: "transparent",
                                  width: "100%",
                                  textAlign: "left"
                                }}
                                onMouseEnter={(e) => (e.currentTarget.style.background = "#f0f7ff")}
                                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                              >
                                <div style={{
                                  width: "32px",
                                  height: "32px",
                                  borderRadius: "8px",
                                  background: "#eff6ff",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  flexShrink: 0
                                }}>
                                  {Icon && <Icon style={{height:"16px",width:"16px",color:"#2563eb"}} />}
                                </div>
                                <div>
                                  <div style={{fontSize:"14px",fontWeight:600,color:"#1f2937"}}>{item.name}</div>
                                  <div style={{fontSize:"12px",color:"#6b7280",marginTop:"2px"}}>{item.description}</div>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </nav>
            )}
          </div>

          {/* Right side */}
          <div style={{display:"flex",alignItems:"center",gap:"8px",flexShrink:0}}>
            {isReady && !isMobile && (
              <button
                onClick={() => handleLinkClick("/")}
                style={{display:"flex",alignItems:"center",gap:"6px",padding:"8px 20px",background:"linear-gradient(135deg,#2563eb,#4f46e5)",color:"white",border:"none",borderRadius:"999px",fontWeight:"700",fontSize:"14px",cursor:"pointer"}}
              >
                <Sparkles style={{height:"14px",width:"14px"}} />
                Evaluate Now
              </button>
            )}

            {isReady && isMobile && (
              <button
                onClick={() => setIsOpen((v) => !v)}
                aria-label={isOpen ? "Close menu" : "Open menu"}
                style={{display:"flex",alignItems:"center",justifyContent:"center",padding:"8px",border:"none",background:"transparent",cursor:"pointer",borderRadius:"8px"}}
              >
                {isOpen ? <X style={{height:"24px",width:"24px",color:"#374151"}} /> : <Menu style={{height:"24px",width:"24px",color:"#374151"}} />}
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      {isMobile && isOpen && (
        <div style={{position:"fixed",inset:0,zIndex:9998}}>
          <div style={{position:"absolute",inset:0,background:"rgba(0,0,0,0.4)"}} onClick={() => setIsOpen(false)} />
          <div style={{position:"absolute",top:0,right:0,bottom:0,width:"280px",background:"white",boxShadow:"-4px 0 20px rgba(0,0,0,0.15)",display:"flex",flexDirection:"column",zIndex:9999}}>
            <div style={{padding:"20px",borderBottom:"1px solid #f3f4f6",display:"flex",alignItems:"center",gap:"8px"}}>
              <div style={{height:"28px",width:"28px",background:"linear-gradient(135deg,#2563eb,#4f46e5)",borderRadius:"8px",display:"flex",alignItems:"center",justifyContent:"center"}}>
                <TrendingUp style={{height:"16px",width:"16px",color:"white"}} />
              </div>
              <span style={{fontWeight:"900",fontSize:"18px",color:"#111827"}}>
                DownOrUp<span style={{color:"#2563eb"}}>.net</span>
              </span>
            </div>
            <div style={{flex:1,overflowY:"auto",padding:"16px",display:"flex",flexDirection:"column",gap:"4px"}}>
              {navLinks.map((link) => {
                const items = dropdownItems[link.name];
                return (
                  <div key={link.path}>
                    <button
                      onClick={() => handleLinkClick(link.path)}
                      style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 16px",borderRadius:"12px",border:"none",background:currentPath===link.path?"#eff6ff":"transparent",color:currentPath===link.path?"#2563eb":"#374151",fontWeight:"500",fontSize:"14px",cursor:"pointer",textAlign:"left"}}
                    >
                      <span>{link.name}</span>
                      <ChevronRight style={{height:"16px",width:"16px",color:"#d1d5db"}} />
                    </button>
                    {items && (
                      <div className="pl-4" style={{display:"flex",flexDirection:"column",gap:"2px",marginTop:"2px"}}>
                        {items.map((item) => (
                          <button
                            key={item.path}
                            onClick={() => handleLinkClick(item.path)}
                            style={{width:"100%",display:"flex",alignItems:"center",padding:"10px 16px",borderRadius:"10px",border:"none",background:currentPath===item.path?"#eff6ff":"transparent",color:currentPath===item.path?"#2563eb":"#6b7280",fontWeight:"500",fontSize:"13px",cursor:"pointer",textAlign:"left"}}
                          >
                            {item.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
              <button
                onClick={() => handleLinkClick("/")}
                style={{marginTop:"12px",width:"100%",display:"flex",alignItems:"center",justifyContent:"center",gap:"8px",padding:"12px",background:"linear-gradient(135deg,#2563eb,#4f46e5)",color:"white",border:"none",borderRadius:"12px",fontWeight:"700",fontSize:"14px",cursor:"pointer"}}
              >
                <Sparkles style={{height:"16px",width:"16px"}} />
                Evaluate Now
              </button>
            </div>
            <div style={{padding:"16px 20px",borderTop:"1px solid #f3f4f6",textAlign:"center"}}>
              <p style={{fontSize:"11px",fontFamily:"monospace",color:"#9ca3af"}}>© 2026 DownOrUp.net</p>
            </div>
          </div>
        </div>
      )}

      <div style={{height:"64px"}} />
    </>
  );
}
