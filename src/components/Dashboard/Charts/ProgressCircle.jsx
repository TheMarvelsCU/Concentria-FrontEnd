import React, { useMemo } from "react";

function computeRiskPercent(logs = []) {
  const total = logs.length || 0;
  if (!total) return { percent: 0, high: 0, medium: 0, low: 0 };

  const classify = (t = "") => {
    const type = t.toLowerCase();
    const high = ["camera", "microphone", "geolocation", "deviceorientation"];
    const medium = ["clipboard", "permissions", "download"];
    const low = ["copy", "cut", "paste"];
    if (high.includes(type)) return "high";
    if (medium.includes(type)) return "medium";
    if (low.includes(type)) return "low";
    return "low";
  };

  const count = { high: 0, medium: 0, low: 0 };
  logs.forEach((l) => {
    count[classify(l.type)] += 1;
  });

  const weighted = count.high * 1 + count.medium * 0.5; // simple risk weighting
  const maxWeighted = total * 1; // if all high
  const percent = Math.round((weighted / maxWeighted) * 100);
  return { percent, ...count };
}

const ProgressCircle = ({ logs, title = "Risk Score" }) => {
  const { percent, high, medium, low } = useMemo(
    () => computeRiskPercent(logs),
    [logs]
  );

  const size = 140;
  const stroke = 12;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const dash = (percent / 100) * circumference;

  const color = percent > 66 ? "#EF4444" : percent > 33 ? "#F59E0B" : "#10B981";

  return (
    <div className="backdrop-blur-xl rounded-2xl shadow-xl p-4 md:p-6 h-full">
      <h3 className="text-lg md:text-xl font-semibold text-gray-200 mb-4">
        {title}
      </h3>
      <div className="flex items-center gap-4">
        <svg width={size} height={size} className="flex-shrink-0">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#E5E7EB"
            strokeWidth={stroke}
            fill="none"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={stroke}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={`${dash} ${circumference - dash}`}
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
          />
          <text
            x="50%"
            y="50%"
            dominantBaseline="middle"
            textAnchor="middle"
            className="fill-gray-300"
            fontSize="22"
            fontWeight="700"
          >
            {percent}%
          </text>
        </svg>
        <div className="flex-1">
          <div className="flex items-center justify-between text-sm text-gray-100 mb-1">
            <span>High</span>
            <span className="font-semibold text-gray-900">{high}</span>
          </div>
          <div className="w-full h-2 rounded-full bg-red-100 mb-3">
            <div
              className="h-2 rounded-full bg-red-500"
              style={{
                width: `${(high / Math.max(1, high + medium + low)) * 100}%`,
              }}
            />
          </div>
          <div className="flex items-center justify-between text-sm text-gray-100 mb-1">
            <span>Medium</span>
            <span className="font-semibold text-gray-900">{medium}</span>
          </div>
          <div className="w-full h-2 rounded-full bg-amber-100 mb-3">
            <div
              className="h-2 rounded-full bg-amber-500"
              style={{
                width: `${(medium / Math.max(1, high + medium + low)) * 100}%`,
              }}
            />
          </div>
          <div className="flex items-center justify-between text-sm text-gray-100 mb-1">
            <span>Low</span>
            <span className="font-semibold text-gray-900">{low}</span>
          </div>
          <div className="w-full h-2 rounded-full bg-emerald-100">
            <div
              className="h-2 rounded-full bg-emerald-500"
              style={{
                width: `${(low / Math.max(1, high + medium + low)) * 100}%`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressCircle;
