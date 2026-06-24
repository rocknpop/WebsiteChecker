import { useState, useEffect } from "react";
import { Sparkles, Menu, X, TrendingUp, ChevronRight } from "lucide-react";

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export default function Header({ currentPath, onNavigate }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setWidth(window.innerWidth);
    const handler = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  const isMobile = width < 768;
  const isReady = width > 0;

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
      <header style={{position:"fixed",top:0,left:0,right:0,zIndex:9999,background:"rgba(255,255,255,0.98)",backdropFilter:"blur(12px)",borderBottom:"1px solid #e5e7eb",boxShadow:"0 1px 3px rgba(0,0,0,0.1)"}}>
        <div style={{maxWidth:"1280px",margin:"0 auto",padding:"0 16px",height:"64px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>

          {/* Logo - left */}
          <div style={{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer",flexShrink:0}} onClick={() => handleLinkClick("/")}>
            <div style={{height:"32px",width:"32px",flexShrink:0,background:"linear-gradient(135deg,#2563eb,#4f46e5)",borderRadius:"10px",display:"flex",alignItems:"center",justifyContent:"center"}}>
              <TrendingUp style={{height:"18px",width:"18px",color:"white"}} />
            </div>
            <span style={{fontWeight:"900",fontSize:"18px",color:"#111827",whiteSpace:"nowrap"}}>
              DownOrUp<span style={{color:"#2563eb"}}>.net</span>
            </span>
          </div>

          {/* Center - desktop nav OR empty spacer on mobile */}
          <div style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center"}}>
            {isReady && !isMobile && (
              <nav style={{display:"flex",alignItems:"center",gap:"4px"}}>
                {navLinks.map((link) => (
                  <button
                    key={link.path}
                    onClick={() => handleLinkClick(link.path)}
                    style={{padding:"8px 16px",borderRadius:"999px",border:"none",background:currentPath===link.path?"#eff6ff":"transparent",color:currentPath===link.path?"#2563eb":"#4b5563",fontWeight:currentPath===link.path?"600":"500",fontSize:"14px",cursor:"pointer"}}
                  >
                    {link.name}
                  </button>
                ))}
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
              {navLinks.map((link) => (
                <button
                  key={link.path}
                  onClick={() => handleLinkClick(link.path)}
                  style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 16px",borderRadius:"12px",border:"none",background:currentPath===link.path?"#eff6ff":"transparent",color:currentPath===link.path?"#2563eb":"#374151",fontWeight:"500",fontSize:"14px",cursor:"pointer",textAlign:"left"}}
                >
                  <span>{link.name}</span>
                  <ChevronRight style={{height:"16px",width:"16px",color:"#d1d5db"}} />
                </button>
              ))}
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
