import React, { useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Build last N days series and count logs per day
function buildDailySeries(logs = [], days = 14) {
  const now = new Date();
  const map = new Map();

  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(now.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    map.set(key, { date: key, count: 0 });
  }

  logs.forEach((log) => {
    const ts = log.timestamp || log.createdAt;
    if (!ts) return;
    const key = new Date(ts).toISOString().slice(0, 10);
    if (map.has(key)) {
      map.get(key).count += 1;
    }
  });

  return Array.from(map.values());
}

const ActivityTrendChart = ({ logs }) => {
  const data = useMemo(() => buildDailySeries(logs, 14), [logs]);

  return (
    <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-4 md:p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg md:text-xl font-semibold text-gray-800">
          Activity (Last 14 days)
        </h3>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorPrimary" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="#9ca3af" />
            <YAxis
              allowDecimals={false}
              tick={{ fontSize: 12 }}
              stroke="#9ca3af"
            />
            <Tooltip cursor={{ stroke: "#6366F1", strokeWidth: 1 }} />
            <Area
              type="monotone"
              dataKey="count"
              stroke="#6366F1"
              fillOpacity={1}
              fill="url(#colorPrimary)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ActivityTrendChart;
