import React, { useMemo } from "react";
import { ResponsiveBar } from "@nivo/bar";

const riskColors = {
  camera: "#EF4444",
  microphone: "#F97316",
  geolocation: "#F59E0B",
  deviceorientation: "#06B6D4",
  clipboard: "#8B5CF6",
  permissions: "#22C55E",
  download: "#10B981",
  copy: "#60A5FA",
  cut: "#93C5FD",
  paste: "#3B82F6",
};

function normalizeType(t = "") {
  return String(t).toLowerCase();
}

export default function NivoBarLogsByType({ logs = [], height = 260 }) {
  const data = useMemo(() => {
    const counts = {};
    logs.forEach((l) => {
      const t = normalizeType(l.type);
      counts[t] = (counts[t] || 0) + 1;
    });
    return Object.entries(counts).map(([type, value]) => ({ type, value }));
  }, [logs]);

  return (
    <div style={{ height }}>
      <ResponsiveBar
        data={data}
        keys={["value"]}
        indexBy="type"
        margin={{ top: 16, right: 16, bottom: 32, left: 32 }}
        padding={0.3}
        colors={(d) => riskColors[d.data.type] || "#64748B"}
        enableLabel={false}
        axisBottom={{ tickSize: 0, tickPadding: 10, tickRotation: 0 }}
        axisLeft={{ tickSize: 0, tickPadding: 10 }}
        theme={{
          textColor: "#CBD5E1",
          axis: { ticks: { text: { fill: "#CBD5E1" } } },
          grid: { line: { stroke: "rgba(255,255,255,0.08)" } },
          tooltip: { container: { background: "#0F172A", color: "#E2E8F0" } },
        }}
        tooltip={({ indexValue, value }) => (
          <div style={{ padding: 8 }}>
            <div style={{ fontWeight: 600 }}>
              {String(indexValue).toUpperCase()}
            </div>
            <div style={{ fontSize: 12, opacity: 0.8 }}>{value} events</div>
          </div>
        )}
        animate
        motionConfig="gentle"
      />
    </div>
  );
}
