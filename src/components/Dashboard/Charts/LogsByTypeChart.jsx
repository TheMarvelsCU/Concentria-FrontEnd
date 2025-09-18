import React, { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function buildTypeSeries(logs = []) {
  const counts = logs.reduce((acc, log) => {
    const t = (log.type || "unknown").toLowerCase();
    acc[t] = (acc[t] || 0) + 1;
    return acc;
  }, {});

  const data = Object.entries(counts).map(([type, count]) => ({ type, count }));
  // Sort by count desc and keep top 8
  data.sort((a, b) => b.count - a.count);
  return data.slice(0, 8);
}

const LogsByTypeChart = ({ logs }) => {
  const data = useMemo(() => buildTypeSeries(logs), [logs]);

  return (
    <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-4 md:p-6 h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg md:text-xl font-semibold text-gray-800">
          Events by Type
        </h3>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="type"
              tick={{ fontSize: 12 }}
              stroke="#9ca3af"
              interval={0}
              angle={-20}
              height={50}
              textAnchor="end"
            />
            <YAxis
              allowDecimals={false}
              tick={{ fontSize: 12 }}
              stroke="#9ca3af"
            />
            <Tooltip />
            <Bar dataKey="count" fill="#10B981" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LogsByTypeChart;
