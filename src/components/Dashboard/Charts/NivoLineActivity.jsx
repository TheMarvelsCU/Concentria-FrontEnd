import React, { useMemo } from "react";
import { ResponsiveLine } from "@nivo/line";

function buildSeries(logs = []) {
  const byDay = new Map();
  logs.forEach((l) => {
    const d = new Date(l.timestamp || l.createdAt);
    if (isNaN(d)) return;
    const key = d.toISOString().slice(0, 10);
    byDay.set(key, (byDay.get(key) || 0) + 1);
  });
  const days = Array.from(byDay.entries())
    .sort((a, b) => (a[0] < b[0] ? -1 : 1))
    .map(([x, y]) => ({ x, y }));
  return [
    {
      id: "activity",
      color: "#22d3ee",
      data: days,
    },
  ];
}

export default function NivoLineActivity({ logs = [], height = 320 }) {
  const data = useMemo(() => buildSeries(logs), [logs]);

  return (
    <div style={{ height }}>
      <ResponsiveLine
        data={data}
        margin={{ top: 16, right: 16, bottom: 32, left: 36 }}
        xScale={{ type: "point" }}
        yScale={{ type: "linear", stacked: false, min: "auto", max: "auto" }}
        axisBottom={{ tickSize: 0, tickPadding: 8, format: (v) => v.slice(5) }}
        axisLeft={{ tickSize: 0, tickPadding: 8 }}
        colors={{ datum: "color" }}
        pointSize={6}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        enableArea={true}
        areaOpacity={0.18}
        useMesh={true}
        enableSlices="x"
        theme={{
          textColor: "#CBD5E1",
          axis: { ticks: { text: { fill: "#CBD5E1" } } },
          grid: { line: { stroke: "rgba(255,255,255,0.08)" } },
          crosshair: {
            line: { stroke: "#64748B", strokeWidth: 1, strokeOpacity: 0.6 },
          },
          tooltip: { container: { background: "#0F172A", color: "#E2E8F0" } },
        }}
        animate
        motionConfig="gentle"
      />
    </div>
  );
}
