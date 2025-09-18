import React from "react";
import {
  AiOutlineCalendar,
  AiOutlineFileText,
  AiOutlineCompass,
  AiOutlineCopy,
  AiOutlineCamera,
  AiOutlineAudio,
  AiOutlineSafety,
} from "react-icons/ai";
import { FiClipboard, FiRotateCcw, FiDownload } from "react-icons/fi";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Typography,
  Button,
  Chip,
} from "@mui/material";

// Helpers used by the table rows
const toTitle = (s) =>
  typeof s === "string" && s.length ? s[0].toUpperCase() + s.slice(1) : "";

// Format timestamp to local string
export function formatTime(ts) {
  const d = ts ? new Date(ts) : null;
  if (!d || isNaN(d.getTime())) return "-";
  try {
    return d.toLocaleString();
  } catch {
    return d.toISOString();
  }
}

// Format log type to a more readable form
export function formatType(type) {
  const t = (type || "").toLowerCase();
  switch (t) {
    case "geolocation":
      return "Geolocation";
    case "clipboard":
      return "Clipboard";
    case "deviceorientation":
      return "Device Orientation";
    case "permissions":
      return "Permissions";
    case "cut":
      return "Cut";
    case "copy":
      return "Copy";
    case "paste":
      return "Paste";
    case "microphone":
      return "Microphone";
    case "camera":
      return "Camera";
    case "download":
      return "Download";
    default:
      return toTitle(t) || "Unknown";
  }
}

// Extract domain or URL from a given string
function getDomainOrUrl(u) {
  if (!u) return "-";
  try {
    const url = new URL(u);
    return url.hostname;
  } catch {
    return String(u).replace(/^https?:\/\//, "");
  }
}

// Format details of the log entry
export function formatDetails(log = {}) {
  if (log.filename) return log.filename;
  if (log.action && log.action.toLowerCase() !== "unknown action")
    return log.action;
  if (log.url || log.domain) return getDomainOrUrl(log.domain || log.url);
  return "-";
}

// Alias to keep compatibility with components calling formatTimestamp
export const formatTimestamp = formatTime;

function chipStyles(type) {
  const t = (type || "").toLowerCase();
  const map = {
    geolocation: { bg: "rgba(249,115,22,0.18)", fg: "#FDBA74" },
    clipboard: { bg: "rgba(168,85,247,0.18)", fg: "#D8B4FE" },
    deviceorientation: { bg: "rgba(99,102,241,0.18)", fg: "#C7D2FE" },
    permissions: { bg: "rgba(234,179,8,0.18)", fg: "#FDE68A" },
    cut: { bg: "rgba(8,145,178,0.18)", fg: "#67E8F9" },
    copy: { bg: "rgba(14,165,233,0.18)", fg: "#93C5FD" },
    paste: { bg: "rgba(59,130,246,0.18)", fg: "#93C5FD" },
    microphone: { bg: "rgba(239,68,68,0.18)", fg: "#FCA5A5" },
    camera: { bg: "rgba(236,72,153,0.18)", fg: "#F9A8D4" },
    download: { bg: "rgba(16,185,129,0.18)", fg: "#86EFAC" },
  };
  return map[t] || { bg: "rgba(148,163,184,0.18)", fg: "#CBD5E1" };
}

const LogItem = ({ log }) => {
  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  const getLogIcon = (type) => {
    // Only the 10 specific log types from browser extension
    switch (type?.toLowerCase()) {
      case "geolocation":
        return <AiOutlineCompass className="h-4 w-4" />;
      case "clipboard":
        return <FiClipboard className="h-4 w-4" />;
      case "deviceorientation":
        return <FiRotateCcw className="h-4 w-4" />;
      case "permissions":
        return <AiOutlineSafety className="h-4 w-4" />;
      case "cut":
      case "copy":
      case "paste":
        return <AiOutlineCopy className="h-4 w-4" />;
      case "microphone":
        return <AiOutlineAudio className="h-4 w-4" />;
      case "camera":
        return <AiOutlineCamera className="h-4 w-4" />;
      case "download":
        return <FiDownload className="h-4 w-4" />;
      default:
        return <AiOutlineFileText className="h-4 w-4" />;
    }
  };

  // Function to generate proper activity name based on log data
  const getActivityName = (log) => {
    // If action exists and is meaningful, use it
    if (
      log.action &&
      log.action.toLowerCase() !== "unknown action" &&
      log.action.trim() !== ""
    ) {
      return log.action;
    }

    // Generate name based on the 10 specific log types only
    switch (log.type?.toLowerCase()) {
      case "geolocation":
        return "Location API Access";
      case "clipboard":
        return "Clipboard API Usage";
      case "deviceorientation":
        return "Device Orientation Listeners";
      case "permissions":
        return "Permission API Queries";
      case "cut":
        return "Cut Operations";
      case "copy":
        return "Copy Operations";
      case "paste":
        return "Paste Operations";
      case "microphone":
        return "Microphone Access";
      case "camera":
        return "Camera Access";
      case "download":
        return "File Download";
      default:
        return log.type
          ? `${log.type.charAt(0).toUpperCase() + log.type.slice(1)} Activity`
          : "System Activity";
    }
  };

  // Function to get icon color based on log type
  const getIconColor = (type) => {
    switch (type?.toLowerCase()) {
      case "geolocation":
        return "bg-orange-500/20 text-orange-600";
      case "clipboard":
        return "bg-purple-500/20 text-purple-600";
      case "deviceorientation":
        return "bg-indigo-500/20 text-indigo-600";
      case "permissions":
        return "bg-yellow-500/20 text-yellow-600";
      case "cut":
      case "copy":
      case "paste":
        return "bg-cyan-500/20 text-cyan-600";
      case "microphone":
        return "bg-red-500/20 text-red-600";
      case "camera":
        return "bg-pink-500/20 text-pink-600";
      case "download":
        return "bg-green-500/20 text-green-600";
      default:
        return "bg-blue-500/20 text-blue-600";
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 p-3 md:p-4 bg-white/50 rounded-lg border border-white/20 hover:bg-white/70 transition-all duration-200">
      <div className={`p-2 rounded-lg shrink-0 ${getIconColor(log.type)}`}>
        {getLogIcon(log.type)}
      </div>
      <div className="flex-1 min-w-0 w-full sm:w-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-1 sm:space-y-0">
          <h4 className="font-medium text-gray-800 text-sm md:text-base truncate">
            {getActivityName(log)}
          </h4>
          <div className="flex items-center space-x-1 text-gray-500 text-xs md:text-sm shrink-0">
            <AiOutlineCalendar className="h-3 w-3" />
            <span className="truncate">
              {formatTimestamp(log.timestamp || log.createdAt)}
            </span>
          </div>
        </div>
        {log.userEmail && (
          <p className="text-xs md:text-sm text-gray-600 mt-1">
            User: {log.userEmail}
          </p>
        )}
        {log.url && (
          <p className="text-xs text-gray-500 mt-1 truncate">
            🌐 <span className="text-blue-600">{log.url}</span>
          </p>
        )}
        {log.filename && (
          <p className="text-xs text-gray-500 mt-1 truncate">
            📁 <span className="text-green-600">{log.filename}</span>
          </p>
        )}
      </div>
    </div>
  );
};

const LogsTable = ({
  logs = [],
  loading = false,
  onDeleteAll,
  limit = 12,
  maxHeight,
  compact = false,
}) => {
  const showDetails = !compact;
  const showSource = !compact;

  return (
    <Paper elevation={0} sx={{ borderRadius: 0, overflow: "hidden" }}>
      <Box
        sx={{
          px: 2,
          py: 1.5,
          // borderBottom: "1px solid",
          // borderColor: "divider",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6" fontWeight={700} sx={{ color: "#E2E8F0" }}>
          Recent Privacy Activity
        </Typography>
        {!!logs.length && (
          <Button
            onClick={onDeleteAll}
            variant="outlined"
            color="error"
            size="small"
          >
            Clear All
          </Button>
        )}
      </Box>

      <TableContainer
        sx={{
          maxHeight: maxHeight || "none",
          overflowY: maxHeight ? "auto" : "visible",
        }}
      >
        <Table size="small" stickyHeader={Boolean(maxHeight)}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "#CBD5E1", fontWeight: 600 }}>
                Time
              </TableCell>
              <TableCell sx={{ color: "#CBD5E1", fontWeight: 600 }}>
                Type
              </TableCell>
              {showDetails && (
                <TableCell sx={{ color: "#CBD5E1", fontWeight: 600 }}>
                  Details
                </TableCell>
              )}
              {showSource && (
                <TableCell sx={{ color: "#CBD5E1", fontWeight: 600 }}>
                  Source
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell
                  colSpan={
                    showDetails && showSource
                      ? 4
                      : showDetails || showSource
                      ? 3
                      : 2
                  }
                  align="center"
                  sx={{ color: "#94A3B8", py: 4 }}
                >
                  Loading activity…
                </TableCell>
              </TableRow>
            ) : logs.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={
                    showDetails && showSource
                      ? 4
                      : showDetails || showSource
                      ? 3
                      : 2
                  }
                  align="center"
                  sx={{ color: "#94A3B8", py: 4 }}
                >
                  No activity yet
                </TableCell>
              </TableRow>
            ) : (
              logs.slice(0, limit).map((log) => {
                const style = chipStyles(log.type);
                return (
                  <TableRow key={log._id || log.id} hover>
                    <TableCell sx={{ color: "#E2E8F0" }}>
                      {formatTime(log.timestamp || log.createdAt)}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={formatType(log.type)}
                        size="small"
                        sx={{
                          bgcolor: style.bg,
                          color: style.fg,
                          fontWeight: 700,
                        }}
                      />
                    </TableCell>
                    {showDetails && (
                      <TableCell sx={{ color: "#CBD5E1", maxWidth: 360 }}>
                        <Typography variant="body2" noWrap>
                          {formatDetails(log)}
                        </Typography>
                      </TableCell>
                    )}
                    {showSource && (
                      <TableCell sx={{ color: "#CBD5E1", maxWidth: 360 }}>
                        <Typography variant="body2" noWrap>
                          {log.domain || log.url || "-"}
                        </Typography>
                      </TableCell>
                    )}
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default LogsTable;
