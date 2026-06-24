import { TrendingUp } from "lucide-react";

interface Decision {
  query: string;
  verdict: "UP" | "NEUTRAL" | "DOWN";
  timestamp: string;
}

interface Props {
  decisions: Decision[];
  onChipClick: (query: string) => void;
}

export default function RecentDecisionsSection({ decisions, onChipClick }: Props) {
  if (!decisions.length) return null;
  return (
    <div className="mt-12 pt-8 border-t border-slate-200/40 space-y-4">
      <div className="flex items-center space-x-2">
        <TrendingUp className="w-5 h-5 text-indigo-500" />
        <h4 className="font-extrabold text-lg text-gray-900">Recent Decisions Evaluated</h4>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {decisions.map((dec, idx) => (
          <button
            key={idx}
            onClick={() => onChipClick(dec.query)}
            className="p-3 bg-white border border-gray-100 rounded-2xl flex flex-col justify-between items-start text-left cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:shadow-md hover:border-blue-200 active:scale-95 group"
          >
            <p className="text-xs font-semibold text-slate-800 group-hover:text-blue-600 transition-colors leading-snug line-clamp-2 mb-2">
              {dec.query}
            </p>
            <div className="flex items-center justify-between w-full">
              <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                dec.verdict === "UP" ? "bg-emerald-500/10 text-emerald-500" :
                dec.verdict === "DOWN" ? "bg-red-500/10 text-red-500" : "bg-amber-500/10 text-amber-500"
              }`}>
                {dec.verdict}
              </span>
              <span className="text-[9px] text-gray-500 font-mono">2026</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
