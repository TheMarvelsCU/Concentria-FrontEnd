import React, { useMemo } from "react";
import {
  AiOutlineCamera,
  AiOutlineAudio,
  AiOutlineEnvironment,
  AiOutlineScissor,
  AiOutlineFileText,
} from "react-icons/ai";

function iconFor(type = "") {
  const t = type.toLowerCase();
  if (t === "camera") return <AiOutlineCamera className="text-rose-500" />;
  if (t === "microphone") return <AiOutlineAudio className="text-amber-500" />;
  if (t === "geolocation")
    return <AiOutlineEnvironment className="text-emerald-600" />;
  if (["copy", "cut", "paste"].includes(t))
    return <AiOutlineScissor className="text-indigo-500" />;
  return <AiOutlineFileText className="text-gray-500" />;
}

const RecentActivityList = ({ logs = [], limit = 6 }) => {
  const items = useMemo(() => {
    const sorted = [...logs].sort(
      (a, b) =>
        new Date(b.timestamp || b.createdAt) -
        new Date(a.timestamp || a.createdAt)
    );
    return sorted.slice(0, limit);
  }, [logs, limit]);

  return (
    <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-4 md:p-6 h-full">
      <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-4">
        Recent Activity
      </h3>
      <div className="space-y-4">
        {items.length === 0 && (
          <p className="text-sm text-gray-500">No recent activity</p>
        )}
        {items.map((log) => (
          <div key={log._id || log.id} className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center">
              {iconFor(log.type)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-800 truncate">
                {log.action || `${(log.type || "").toUpperCase()} event`}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {(log.url || "").replace(/^https?:\/\//, "") || "-"}
              </p>
            </div>
            <div className="text-xs text-gray-400">
              {new Date(log.timestamp || log.createdAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivityList;
