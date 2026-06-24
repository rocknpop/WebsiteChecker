import { useState } from "react";
import { Sparkles, Menu, X, TrendingUp, ChevronRight } from "lucide-react";

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export default function Header({ currentPath, onNavigate }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

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
      <header style={{position:"fixed",top:0,left:0,right:0,zIndex:9999,background:"white",borderBottom:"1px solid #e5e7eb",boxShadow:"0 1px 3px rgba(0,0,0,0.1)"}}>
        <div style={{maxWidth:"1280px",margin:"0 auto",padding:"0 12px",height:"64px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>

          {/* Logo - left side */}
          <div style={{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer",flexShrink:0}} onClick={() => handleLinkClick("/")}>
            <div style={{height:"32px",width:"32px",background:"linear-gradient(135deg,#2563eb,#4f46e5)",borderRadius:"10px",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
              <TrendingUp style={{height:"18px",width:"18px",color:"white"}} />
            </div>
            <span style={{fontWeight:"900",fontSize:"18px",color:"#111827",whiteSpace:"nowrap"}}>
              DownOrUp<span style={{color:"#2563eb"}}>.net</span>
            </span>
          </div>

          {/* Desktop nav - hidden on mobile via style tag */}
          <nav className="desktop-nav" style={{display:"none",alignItems:"center",gap:"4px"}}>
            {navLinks.map((link) => (
              <button key={link.path} onClick={() => handleLinkClick(link.path)}
                style={{padding:"8px 16px",borderRadius:"999px",border:"none",background:currentPath===link.path?"#eff6ff":"transparent",color:currentPath===link.path?"#2563eb":"#4b5563",fontWeight:currentPath===link.path?"600":"500",fontSize:"14px",cursor:"pointer"}}>
                {link.name}
              </button>
            ))}
            <button onClick={() => handleLinkClick("/")}
              style={{display:"flex",alignItems:"center",gap:"6px",padding:"8px 20px",background:"linear-gradient(135deg,#2563eb,#4f46e5)",color:"white",border:"none",borderRadius:"999px",fontWeight:"700",fontSize:"14px",cursor:"pointer",marginLeft:"8px"}}>
              <Sparkles style={{width:"14px",height:"14px"}} />
              Evaluate Now
            </button>
          </nav>

          {/* Hamburger - mobile only */}
          <button className="mobile-btn"
            onClick={() => setIsOpen(!isOpen)}
            style={{display:"flex",alignItems:"center",justifyContent:"center",padding:"8px",background:"transparent",border:"none",cursor:"pointer",borderRadius:"8px",flexShrink:0}}>
            {isOpen ? <X style={{width:"24px",height:"24px",color:"#374151"}} /> : <Menu style={{width:"24px",height:"24px",color:"#374151"}} />}
          </button>

        </div>
      </header>

      {isOpen && (
        <div style={{position:"fixed",inset:0,zIndex:9998}}>
          <div style={{position:"absolute",inset:0,background:"rgba(0,0,0,0.4)"}} onClick={() => setIsOpen(false)} />
          <div style={{position:"fixed",top:0,right:0,bottom:0,width:"280px",background:"white",zIndex:10000,boxShadow:"-4px 0 20px rgba(0,0,0,0.15)",display:"flex",flexDirection:"column"}}>
            <div style={{padding:"20px 20px 16px",borderBottom:"1px solid #f3f4f6",display:"flex",alignItems:"center",gap:"8px"}}>
              <div style={{height:"28px",width:"28px",background:"linear-gradient(135deg,#2563eb,#4f46e5)",borderRadius:"8px",display:"flex",alignItems:"center",justifyContent:"center"}}>
                <TrendingUp style={{height:"16px",width:"16px",color:"white"}} />
              </div>
              <span style={{fontWeight:"900",fontSize:"18px",color:"#111827"}}>
                DownOrUp<span style={{color:"#2563eb"}}>.net</span>
              </span>
            </div>

            <div style={{flex:1,overflowY:"auto",padding:"20px 16px",display:"flex",flexDirection:"column",gap:"4px"}}>
              <p style={{fontSize:"10px",fontFamily:"monospace",letterSpacing:"0.1em",textTransform:"uppercase",color:"#9ca3af",fontWeight:"600",padding:"0 8px",marginBottom:"8px"}}>
                Navigation
              </p>
              {navLinks.map((link) => (
                <button
                  key={link.path}
                  onClick={() => handleLinkClick(link.path)}
                  style={{
                    width:"100%",
                    display:"flex",
                    alignItems:"center",
                    justifyContent:"space-between",
                    padding:"12px 16px",
                    borderRadius:"12px",
                    border:"none",
                    background: currentPath === link.path ? "#eff6ff" : "transparent",
                    color: currentPath === link.path ? "#2563eb" : "#374151",
                    fontWeight: currentPath === link.path ? "600" : "500",
                    fontSize:"14px",
                    cursor:"pointer",
                    textAlign:"left",
                  }}
                >
                  <span>{link.name}</span>
                  <ChevronRight style={{height:"16px",width:"16px",color: currentPath === link.path ? "#93c5fd" : "#d1d5db"}} />
                </button>
              ))}

              <button
                onClick={() => handleLinkClick("/")}
                style={{
                  marginTop:"16px",
                  width:"100%",
                  display:"flex",
                  alignItems:"center",
                  justifyContent:"center",
                  gap:"8px",
                  padding:"12px 24px",
                  background:"linear-gradient(135deg,#2563eb,#4f46e5)",
                  color:"white",
                  border:"none",
                  borderRadius:"12px",
                  fontWeight:"700",
                  fontSize:"14px",
                  cursor:"pointer",
                  boxShadow:"0 2px 8px rgba(37,99,235,0.4)",
                }}
              >
                <Sparkles style={{height:"16px",width:"16px"}} />
                Evaluate Now
              </button>
            </div>

            <div style={{padding:"16px 20px",borderTop:"1px solid #f3f4f6",textAlign:"center"}}>
              <p style={{fontSize:"10px",fontFamily:"monospace",color:"#9ca3af"}}>© 2026 DownOrUp.net</p>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .desktop-nav { display: none !important; }
        .mobile-btn  { display: flex !important; }
        @media (min-width: 768px) {
          .desktop-nav { display: flex !important; }
          .mobile-btn  { display: none !important; }
        }
      `}</style>

      <div style={{height:"64px"}} />
    </>
  );
}
