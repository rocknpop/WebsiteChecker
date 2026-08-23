import { useState, useRef, useEffect, type FormEvent } from "react";
import { Sparkles, Send, X, ArrowRight, Loader2 } from "lucide-react";

interface AssistantMessage {
  id: string;
  sender: "user" | "assistant";
  text: string;
  intent?: "diagnostic" | "decision" | "info";
  tool?: string;
  target?: string;
  decisionQuery?: string;
}

interface AiAssistantProps {
  onSuggestDiagnostic: (tool: string, target: string) => void;
  onSuggestDecision: (decisionQuery: string) => void;
}

const TOOL_LABELS: Record<string, string> = {
  status: "Website Status",
  dns: "DNS Lookup",
  ip: "IP Lookup",
  ssl: "SSL Checker",
  whois: "WHOIS Lookup",
  port: "Port Checker",
};

export default function AiAssistant({ onSuggestDiagnostic, onSuggestDecision }: AiAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<AssistantMessage[]>([
    {
      id: "welcome",
      sender: "assistant",
      text: 'Hi! I can route you to the right tool. Ask me things like:\n\n• "Is example.com down?"\n• "Check the SSL on my site"\n• "Should I start a YouTube channel?"\n\nI\'ll open the right diagnostic or verdict for you.',
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setIsOpen(false);
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen]);

  const handleSend = async (e: FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || loading) return;

    const userText = inputValue;
    setInputValue("");

    const userMsg: AssistantMessage = { id: `usr-${Date.now()}`, sender: "user", text: userText };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      const response = await fetch("/api/ai-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: userText }),
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const data = await response.json();

      const assistantMsg: AssistantMessage = {
        id: `ai-${Date.now()}`,
        sender: "assistant",
        text: data.answer || "I've noted that.",
        intent: data.intent,
        tool: data.tool,
        target: data.target,
        decisionQuery: data.decisionQuery,
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: any) {
      console.error("Failed to reach the assistant:", err);
      let errMsg = "Failed to connect to the AI server. Make sure you are connected.";
      try {
        const parsed = JSON.parse(err.message);
        if (parsed.error) errMsg = parsed.error;
      } catch (_) {}

      setMessages((prev) => [
        ...prev,
        { id: `err-${Date.now()}`, sender: "assistant", text: `Error: ${errMsg}` },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const renderAction = (msg: AssistantMessage) => {
    if (msg.sender !== "assistant" || msg.id === "welcome" || msg.id.startsWith("err-")) return null;

    if (msg.intent === "diagnostic" && msg.tool && msg.target) {
      return (
        <div className="mt-3 pt-2.5 border-t border-gray-100 flex flex-col gap-1.5">
          <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400">
            {TOOL_LABELS[msg.tool] || "Diagnostic"} detected
          </span>
          <button
            onClick={() => {
              onSuggestDiagnostic(msg.tool!, msg.target!);
              setIsOpen(false);
            }}
            className="inline-flex items-center justify-between gap-2 px-3 py-1.5 rounded-lg text-[11px] font-bold tracking-tight transition-all cursor-pointer border"
            style={{ background: "#eff6ff", color: "#2563eb", borderColor: "#dbeafe" }}
          >
            Check {msg.target} now
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      );
    }

    if (msg.intent === "decision" && msg.decisionQuery) {
      return (
        <div className="mt-3 pt-2.5 border-t border-gray-100 flex flex-col gap-1.5">
          <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400">
            Decision detected
          </span>
          <button
            onClick={() => {
              onSuggestDecision(msg.decisionQuery!);
              setIsOpen(false);
            }}
            className="inline-flex items-center justify-between gap-2 px-3 py-1.5 rounded-lg text-[11px] font-bold tracking-tight transition-all cursor-pointer border"
            style={{ background: "#eef2ff", color: "#4f46e5", borderColor: "#e0e7ff" }}
          >
            Get the verdict
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      );
    }

    return (
      <div className="mt-2 pt-2 border-t border-gray-100 text-[10px] text-gray-400">
        Just chatting — nothing to open for this one.
      </div>
    );
  };

  return (
    <>
      {!isOpen && (
        <button
          id="ai-assistant-fab"
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 text-white rounded-full p-4 shadow-2xl flex items-center gap-2 select-none cursor-pointer group transition-all duration-300 transform hover:scale-105 hover:-translate-y-0.5"
          style={{ background: "linear-gradient(135deg, #2563eb, #4f46e5)" }}
        >
          <Sparkles className="h-5 w-5 animate-pulse group-hover:rotate-12 transition-transform" />
          <span className="font-bold text-xs pr-1 tracking-wider uppercase">Ask DownOrUp AI</span>
        </button>
      )}

      {isOpen && (
        <div
          id="ai-assistant-drawer-panel"
          className="fixed bottom-6 right-6 z-50 w-full max-w-sm sm:max-w-md bg-white border border-gray-100 rounded-3xl flex flex-col overflow-hidden max-h-[580px] h-full transition-all duration-300"
          style={{ boxShadow: "0 25px 50px -12px rgba(79, 70, 229, 0.18)" }}
        >
          <div
            className="p-4 flex items-center justify-between text-white shrink-0"
            style={{ background: "linear-gradient(135deg, #2563eb, #4f46e5)" }}
          >
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-yellow-300" style={{ fill: "rgba(255,255,255,0.2)" }} />
              <div>
                <h3 className="font-display font-bold text-sm tracking-tight">DownOrUp AI Assistant</h3>
                <span className="text-[10px] text-white/80 font-mono tracking-wide">Powered by gemini-2.5-flash</span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer text-white"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}>
                <div
                  className="max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed shadow-sm whitespace-pre-wrap"
                  style={
                    msg.sender === "user"
                      ? { background: "#2563eb", color: "#ffffff", fontWeight: 600 }
                      : { background: "#ffffff", color: "#1f2937", border: "1px solid #f3f4f6" }
                  }
                >
                  {msg.text}
                  {renderAction(msg)}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2 text-gray-500 p-2 text-xs">
                <Loader2 className="h-4.5 w-4.5 animate-spin" style={{ color: "#2563eb" }} />
                Thinking...
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSend} className="p-3 border-t border-gray-200 bg-white flex gap-2 shrink-0">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about a site, or a decision..."
              disabled={loading}
              className="flex-1 px-3 py-2 border border-gray-200 rounded-xl bg-gray-50 text-gray-900 placeholder-gray-400 text-xs focus:outline-none focus:ring-2"
              style={{ ["--tw-ring-color" as any]: "rgba(37,99,235,0.2)" }}
            />
            <button
              type="submit"
              disabled={loading || !inputValue.trim()}
              className="p-2.5 text-white rounded-xl shadow-md cursor-pointer disabled:bg-gray-100 disabled:text-gray-400 transition-colors"
              style={!loading && inputValue.trim() ? { background: "#2563eb" } : undefined}
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
