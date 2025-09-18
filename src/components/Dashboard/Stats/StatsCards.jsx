import React from "react";
import { AiOutlineSafety, AiOutlineEye, AiOutlineUser } from "react-icons/ai";
import { FiActivity } from "react-icons/fi";
import { Grid, Card, CardContent, Box, Typography } from "@mui/material";

const StatCard = ({
  icon: Icon,
  title,
  value,
  description,
  color = "blue",
}) => {
  const colorMap = {
    blue: { bg: "rgba(59,130,246,0.18)", fg: "#93C5FD" },
    green: { bg: "rgba(34,197,94,0.18)", fg: "#86EFAC" },
    orange: { bg: "rgba(249,115,22,0.18)", fg: "#FDBA74" },
    purple: { bg: "rgba(168,85,247,0.18)", fg: "#D8B4FE" },
  };
  const c = colorMap[color] || colorMap.blue;

  return (
    <Card elevation={0} sx={{ borderRadius: 0, width: "100%", height: "100%" }}>
      <CardContent sx={{ p: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box
            sx={{
              p: 1,
              borderRadius: 0.5,
              bgcolor: c.bg,
              color: c.fg,
              display: "inline-flex",
            }}
          >
            <Icon size={22} />
          </Box>
          <Box sx={{ minWidth: 0 }}>
            <Typography variant="subtitle2" sx={{ color: "#E2E8F0" }} noWrap>
              {title}
            </Typography>
            <Typography
              variant="h5"
              fontWeight={800}
              sx={{ color: "#fff", mt: 0.5 }}
              noWrap
            >
              {value}
            </Typography>
            <Typography variant="caption" sx={{ color: "#94A3B8" }} noWrap>
              {description}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

const StatsCards = ({ logs = [] }) => {
  const stats = React.useMemo(() => {
    const totalLogs = logs.length;
    const todayLogs = logs.filter((log) => {
      const d = new Date(log.timestamp || log.createdAt);
      const t = new Date();
      return d.toDateString() === t.toDateString();
    }).length;

    const privacyLogs = logs.filter(
      (log) =>
        (log.action || "").toLowerCase().includes("privacy") ||
        (log.action || "").toLowerCase().includes("data")
    ).length;
    const securityLogs = logs.filter(
      (log) =>
        (log.action || "").toLowerCase().includes("security") ||
        (log.action || "").toLowerCase().includes("login") ||
        (log.action || "").toLowerCase().includes("auth")
    ).length;

    return {
      total: totalLogs,
      today: todayLogs,
      privacy: privacyLogs,
      security: securityLogs,
    };
  }, [logs]);

  return (
    <Box
      sx={{
        width: "100%",
        mb: 3,
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(2, minmax(0, 1fr))",
          lg: "repeat(4, minmax(0, 1fr))",
        },
        gap: 2,
      }}
    >
      <Box sx={{ minWidth: 0 }}>
        <StatCard
          icon={FiActivity}
          title="Total Activities"
          value={stats.total}
          description="All time activity count"
          color="blue"
        />
      </Box>
      <Box sx={{ minWidth: 0 }}>
        <StatCard
          icon={AiOutlineEye}
          title="Today's Activities"
          value={stats.today}
          description="Activities from today"
          color="green"
        />
      </Box>
      <Box sx={{ minWidth: 0 }}>
        <StatCard
          icon={AiOutlineSafety}
          title="Privacy Events"
          value={stats.privacy}
          description="Privacy-related activities"
          color="purple"
        />
      </Box>
      <Box sx={{ minWidth: 0 }}>
        <StatCard
          icon={AiOutlineUser}
          title="Security Events"
          value={stats.security}
          description="Security-related activities"
          color="orange"
        />
      </Box>
    </Box>
  );
};

export default StatsCards;
