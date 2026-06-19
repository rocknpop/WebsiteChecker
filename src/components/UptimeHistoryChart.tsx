import React from "react";
import { BarChart, Bar, Cell, ResponsiveContainer, Tooltip, XAxis } from "recharts";

interface UptimeHistoryChartProps {
  domain: string;
  isDown: boolean;
  responseTime: number;
}

interface DayData {
  date: string;
  status: "up" | "warning" | "down";
  uptime: number;
  responseTime: number;
  value: number;
}

// Generate deterministic historical data for the last 30 days based on domain name
const generate30DaysData = (domain: string, isDown: boolean, currentResponseTime: number): DayData[] => {
  const data: DayData[] = [];
  const domainHash = domain.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);

  for (let i = 29; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    
    // Create a seeded random value between 0 and 1
    const seed = (domainHash + i * 43) % 1000;
    const rand = seed / 1000;
    
    let status: "up" | "warning" | "down" = "up";
    let uptime = 100;
    let respTime = Math.max(15, Math.round(currentResponseTime * (0.8 + rand * 0.4)));

    if (isDown) {
      if (i < 2) {
        status = "down";
        uptime = 0;
        respTime = 0;
      } else if (rand > 0.6) {
        status = "down";
        uptime = 0;
        respTime = 0;
      } else if (rand > 0.4) {
        status = "warning";
        uptime = 85;
        respTime = Math.round(respTime * 2.8);
      }
    } else {
      // Normal site stats - rarely warnings or outages
      if (rand > 0.95) {
        status = "warning";
        uptime = 97.4;
        respTime = Math.round(respTime * 2.2);
      } else if (rand > 0.985) {
        status = "down";
        uptime = 0;
        respTime = 0;
      }
    }

    data.push({
      date: dateStr,
      status,
      uptime,
      responseTime: respTime,
      value: 100, // Fixed height for visual bar block
    });
  }
  return data;
};

export default function UptimeHistoryChart({ domain, isDown, responseTime }: UptimeHistoryChartProps) {
  const data = generate30DaysData(domain, isDown, responseTime);

  // Calculate overall uptime percentage
  const totalDays = data.length;
  const soundDays = data.filter(d => d.status === "up").length;
  const warningDays = data.filter(d => d.status === "warning").length;
  const overallAvgUptime = (((soundDays * 1 + warningDays * 0.9) / totalDays) * 100).toFixed(2);

  // Hex colors match Tailwind theme for Dark/Light state smoothly
  const getColor = (status: "up" | "warning" | "down") => {
    switch (status) {
      case "up":
        return "#10b981"; // emerald-500
      case "warning":
        return "#f59e0b"; // amber-500
      case "down":
        return "#ef4444"; // red-500
    }
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const item: DayData = payload[0].payload;
      
      const statusLabel = {
        up: "Operational",
        warning: "Degraded Performance",
        down: "Major Outage"
      }[item.status];

      const statusColorClass = {
        up: "text-emerald-500 font-bold",
        warning: "text-amber-500 font-bold",
        down: "text-red-500 font-bold"
      }[item.status];

      return (
        <div className="bg-slate-900 border border-slate-800 text-slate-100 rounded-xl p-3.5 shadow-xl text-left font-sans text-xs min-w-[180px]">
          <div className="font-semibold text-gray-400 mb-1.5">{item.date}</div>
          <div className="space-y-1">
            <div className="flex items-center justify-between gap-4">
              <span className="text-gray-400">Status:</span>
              <span className={statusColorClass}>{statusLabel}</span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-gray-400">Availability:</span>
              <span className="font-mono">{item.uptime}%</span>
            </div>
            {item.status !== "down" && (
              <div className="flex items-center justify-between gap-4">
                <span className="text-gray-400">Response Speed:</span>
                <span className="font-mono text-brand-400">{item.responseTime}ms</span>
              </div>
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full bg-slate-50/50 dark:bg-slate-900/40 p-5 rounded-2xl border border-gray-100 dark:border-slate-800" id="uptime-history-wrapper">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-3 border-b border-gray-100 dark:border-slate-800">
        <div className="flex items-center space-x-2">
          <div className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </div>
          <h3 className="font-display font-bold text-sm text-gray-950 dark:text-gray-100 uppercase tracking-tight">
            30-Day Operational Health History
          </h3>
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center space-x-1">
            <span className="w-2.5 h-2.5 rounded bg-[#10b981] inline-block"></span>
            <span>Up</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="w-2.5 h-2.5 rounded bg-[#f59e0b] inline-block"></span>
            <span>Degraded</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="w-2.5 h-2.5 rounded bg-[#ef4444] inline-block"></span>
            <span>Down</span>
          </div>
          <div className="ml-auto sm:ml-0 border-l border-gray-200 dark:border-slate-800 pl-4">
            <span className="text-gray-400">30d Uptime:</span>{" "}
            <span className="font-bold text-emerald-600 dark:text-emerald-400">{overallAvgUptime}%</span>
          </div>
        </div>
      </div>

      {/* Recharts responsive segments wrapper */}
      <div className="h-16 w-full" id="uptime-history-recharts-chart">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barGap={2} barCategoryGap={3} margin={{ top: 2, right: 2, left: 2, bottom: 2 }}>
            <XAxis dataKey="date" hide />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(100, 116, 139, 0.08)" }} />
            <Bar dataKey="value" radius={[3, 3, 3, 3]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getColor(entry.status)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="flex justify-between items-center text-[10px] text-gray-400 dark:text-gray-500 font-mono mt-3.5 uppercase tracking-wider">
        <span>30 Days ago ({data[0]?.date})</span>
        <span>Today ({data[29]?.date})</span>
      </div>
    </div>
  );
}
