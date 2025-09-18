import React, { useMemo } from "react";
import { ResponsivePie } from "@nivo/pie";

function classifyRisk(type) {
  const t = String(type || "").toLowerCase();
  if (["camera", "microphone", "geolocation"].includes(t)) return "High";
  if (["clipboard", "download", "permissions"].includes(t)) return "Medium";
  return "Low";
}

export default function NivoPieRisk({ logs = [], height = 260 }) {
  const data = useMemo(() => {
    const counters = { High: 0, Medium: 0, Low: 0 };
    logs.forEach((l) => {
      counters[classifyRisk(l.type)]++;
    });
    return Object.entries(counters).map(([id, value]) => ({
      id,
      label: id,
      value,
    }));
  }, [logs]);

  return (
    <div style={{ height }}>
      <ResponsivePie
        data={data}
        margin={{ top: 16, right: 16, bottom: 28, left: 16 }}
        innerRadius={0.5}
        padAngle={1}
        cornerRadius={2}
        activeOuterRadiusOffset={6}
        colors={["#EF4444", "#F59E0B", "#10B981"]}
        theme={{
          textColor: "#CBD5E1",
          legends: { text: { fill: "#CBD5E1" } },
          tooltip: { container: { background: "#0F172A", color: "#E2E8F0" } },
        }}
        enableArcLabels={false}
        legends={[
          {
            anchor: "bottom",
            direction: "row",
            translateY: 14,
            itemWidth: 70,
            itemHeight: 14,
            symbolSize: 10,
            itemTextColor: "#CBD5E1",
          },
        ]}
        animate
        motionConfig="gentle"
      />
    </div>
  );
}
