import React, { useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function classifyRisk(type) {
  const t = (type || "").toLowerCase();
  const high = ["camera", "microphone", "geolocation", "deviceorientation"];
  const medium = ["clipboard", "permissions", "download"];
  const low = ["copy", "cut", "paste"];
  if (high.includes(t)) return "High";
  if (medium.includes(t)) return "Medium";
  if (low.includes(t)) return "Low";
  return "Low";
}

function buildRiskData(logs = []) {
  const counters = { High: 0, Medium: 0, Low: 0 };
  logs.forEach((log) => {
    const risk = classifyRisk(log.type);
    counters[risk] = (counters[risk] || 0) + 1;
  });
  return [
    { name: "High", value: counters.High },
    { name: "Medium", value: counters.Medium },
    { name: "Low", value: counters.Low },
  ];
}

const COLORS = ["#EF4444", "#F59E0B", "#10B981"]; // red, amber, emerald

const RiskPieChart = ({ logs }) => {
  const data = useMemo(() => buildRiskData(logs), [logs]);
  const total = data.reduce((sum, d) => sum + d.value, 0);

  return (
    <div className="backdrop-blur-xl rounded-2xl shadow-xl border p-4 md:p-6 h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg md:text-xl font-semibold text-gray-800">
          Risk Breakdown
        </h3>
        <span className="text-sm text-gray-500">Total: {total}</span>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={90}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RiskPieChart;
