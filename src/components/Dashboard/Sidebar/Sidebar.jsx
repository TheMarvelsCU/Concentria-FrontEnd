import React from "react";
import {
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Avatar,
  Button,
} from "@mui/material";
import HomeOutlined from "@mui/icons-material/HomeOutlined";
import PeopleOutlined from "@mui/icons-material/PeopleOutlined";
import ContactsOutlined from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlined from "@mui/icons-material/ReceiptOutlined";
import PersonOutlineOutlined from "@mui/icons-material/PersonOutlineOutlined";
import CalendarTodayOutlined from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlined from "@mui/icons-material/HelpOutlineOutlined";
import BarChartOutlined from "@mui/icons-material/BarChartOutlined";
import PieChartOutline from "@mui/icons-material/PieChartOutline";
import TimelineOutlined from "@mui/icons-material/TimelineOutlined";
import MapOutlined from "@mui/icons-material/MapOutlined";
import LogoutOutlined from "@mui/icons-material/LogoutOutlined";
import InsightsOutlined from "@mui/icons-material/InsightsOutlined";
import SecurityOutlined from "@mui/icons-material/SecurityOutlined";
import LockOutlined from "@mui/icons-material/LockOutlined";
import WarningAmberOutlined from "@mui/icons-material/WarningAmberOutlined";
import LanguageOutlined from "@mui/icons-material/LanguageOutlined";
import VerifiedUserOutlined from "@mui/icons-material/VerifiedUserOutlined";

const Sidebar = ({ activeTab, setActiveTab, user, onLogout, onClose }) => {
  const userEmail = user?.email || "";
  const displayName = userEmail.split("@")[0] || "Ed Roh";

  const sections = [
    {
      header: null,
      items: [
        {
          id: "dashboard",
          label: "Dashboard",
          icon: HomeOutlined,
          tab: "overview",
        },
        {
          id: "analytics-home",
          label: "Analytics",
          icon: InsightsOutlined,
          tab: "analytics",
        },
      ],
    },
    {
      header: "Safety & Security",
      items: [
        {
          id: "website-safety",
          label: "Website Safety",
          icon: SecurityOutlined,
          tab: "safety",
          description: "Analyze website safety ratings",
        },
        {
          id: "permission-analysis",
          label: "Permission Analysis",
          icon: LockOutlined,
          tab: "permissions",
          description: "Analyze permission risks",
        },
        {
          id: "threat-monitor",
          label: "Threat Monitor",
          icon: WarningAmberOutlined,
          tab: "threats",
          description: "Security threat monitoring",
        },
      ],
    },
    {
      header: "Pages",
      items: [
        {
          id: "profile-form",
          label: "Profile Form",
          icon: PersonOutlineOutlined,
          tab: "profile",
        },
      ],
    },
    {
      header: "Charts",
      items: [
        {
          id: "bar-chart",
          label: "Bar Chart",
          icon: BarChartOutlined,
          tab: "charts",
        },
        {
          id: "pie-chart",
          label: "Pie Chart",
          icon: PieChartOutline,
          tab: "charts",
        },
        {
          id: "line-chart",
          label: "Line Chart",
          icon: TimelineOutlined,
          tab: "charts",
        },
      ],
    },
  ];

  const handleClick = (item) => {
    if (item.disabled) return;
    if (item.tab) setActiveTab(item.tab);
    if (onClose) onClose();
  };

  const isSelected = (item) => !!item.tab && activeTab === item.tab;

  return (
    <Box
      sx={{
        width: 256,
        height: "100vh",
        bgcolor: "transparent",
        backdropFilter: "blur(10px)",
        backgroundColor: "#020617",
        borderRight: "1px solid",
        borderColor: "divider",
        p: 2,
        display: "flex",
        flexDirection: "column",
        color: "text.primary",
        overflowX: "hidden",
      }}
    >
      {/* Brand */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 2,
          px: 1,
          width: "100%",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <LanguageOutlined sx={{ color: "#22D3EE", fontSize: 28 }} />
          <Typography variant="h6" fontWeight={700} sx={{ color: "#E2E8F0" }}>
            Concentria
          </Typography>
        </Box>
      </Box>

      {/* Profile Card */}
      <Box
        sx={{
          p: 2.5,
          borderRadius: 3,
          backgroundColor: "rgba(255,255,255,0.08)",
          border: "1px solid",
          borderColor: "divider",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 1.5,
          mb: 2.5,
          width: "100%",
          textAlign: "center",
        }}
      >
        <Avatar sx={{ width: 100, height: 100, bgcolor: "primary.main" }}>
          <PersonOutlineOutlined />
        </Avatar>
        <Box sx={{ minWidth: 0, width: "100%" }}>
          <Typography
            variant="h5"
            fontWeight={800}
            sx={{ color: "#E2E8F0", lineHeight: 1, mt: "10px" }}
            noWrap
          >
            {displayName}
          </Typography>
        </Box>
      </Box>

      {/* Security Status Card */}
      <Box
        sx={{
          p: 2,
          borderRadius: 2,
          background:
            "linear-gradient(135deg, rgba(34,197,94,0.2), rgba(16,185,129,0.2))",
          border: "1px solid rgba(34,197,94,0.3)",
          display: "flex",
          alignItems: "center",
          gap: 2,
          mb: 2.5,
          width: "100%",
        }}
      >
        <Box
          sx={{
            p: 1,
            borderRadius: 1.5,
            backgroundColor: "rgba(34,197,94,0.2)",
          }}
        >
          <VerifiedUserOutlined sx={{ color: "#22C55E", fontSize: 20 }} />
        </Box>
        <Box>
          <Typography
            variant="body2"
            fontWeight={600}
            sx={{ color: "#22C55E" }}
          >
            Security Status
          </Typography>
          <Typography variant="caption" sx={{ color: "rgba(34,197,94,0.8)" }}>
            All systems protected
          </Typography>
        </Box>
      </Box>

      {/* Navigation */}
      <List sx={{ flex: 1, width: "100%" }}>
        {sections.map((section, idx) => (
          <Box
            key={section.header || `sec-${idx}`}
            sx={{ mb: 1.5, width: "100%" }}
          >
            {section.header && (
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                {section.header === "Safety & Security" && (
                  <SecurityOutlined
                    sx={{ color: "#22D3EE", fontSize: 16, mr: 1 }}
                  />
                )}
                <Typography
                  variant="overline"
                  sx={{
                    color:
                      section.header === "Safety & Security"
                        ? "#22D3EE"
                        : "#94A3B8",
                    fontWeight:
                      section.header === "Safety & Security" ? 700 : 400,
                    px: 1,
                    display: "block",
                    width: "100%",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {section.header}
                </Typography>
              </Box>
            )}
            {section.items.map((item) => {
              const Icon = item.icon;
              const selected = isSelected(item);
              const isSafetyItem = section.header === "Safety & Security";

              return (
                <ListItemButton
                  key={item.id}
                  onClick={() => handleClick(item)}
                  disabled={item.disabled}
                  selected={selected}
                  sx={{
                    borderRadius: 2,
                    my: 0.25,
                    opacity: item.disabled ? 0.6 : 1,
                    cursor: item.disabled ? "not-allowed" : "pointer",
                    "&.Mui-selected": {
                      backgroundColor: isSafetyItem
                        ? "rgba(34,211,238,0.2)"
                        : "rgba(255,255,255,0.12)",
                      color: isSafetyItem ? "#22D3EE" : "#A5B4FC",
                      border: isSafetyItem
                        ? "1px solid rgba(34,211,238,0.3)"
                        : "none",
                    },
                    "&:hover": {
                      backgroundColor: isSafetyItem
                        ? "rgba(34,211,238,0.1)"
                        : "rgba(255,255,255,0.08)",
                    },
                    width: "100%",
                    position: "relative",
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 36,
                      color: selected
                        ? isSafetyItem
                          ? "#22D3EE"
                          : "#A5B4FC"
                        : "#CBD5E1",
                    }}
                  >
                    <Icon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    primary={item.label}
                    secondary={
                      item.description && selected ? item.description : null
                    }
                    primaryTypographyProps={{
                      fontSize: 14,
                      fontWeight: 600,
                      noWrap: true,
                    }}
                    secondaryTypographyProps={{
                      fontSize: 11,
                      color: isSafetyItem
                        ? "rgba(34,211,238,0.8)"
                        : "rgba(165,180,252,0.8)",
                      noWrap: true,
                    }}
                  />
                  {selected && isSafetyItem && (
                    <Box
                      sx={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        backgroundColor: "#22D3EE",
                        animation: "pulse 2s infinite",
                        "@keyframes pulse": {
                          "0%, 100%": { opacity: 1 },
                          "50%": { opacity: 0.5 },
                        },
                      }}
                    />
                  )}
                  {item.id === "website-safety" && (
                    <Box
                      sx={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        px: 1,
                        py: 0.25,
                        borderRadius: 1,
                        backgroundColor: "rgba(34,211,238,0.2)",
                        border: "1px solid rgba(34,211,238,0.3)",
                      }}
                    >
                      <Typography
                        variant="caption"
                        sx={{
                          color: "#22D3EE",
                          fontSize: 9,
                          fontWeight: 600,
                        }}
                      >
                        NEW
                      </Typography>
                    </Box>
                  )}
                </ListItemButton>
              );
            })}
          </Box>
        ))}
      </List>

      {/* Logout */}
      <Button
        onClick={onLogout}
        startIcon={<LogoutOutlined />}
        sx={{
          color: "#E2E8F0",
          justifyContent: "flex-start",
          borderRadius: 2,
          "&:hover": {
            backgroundColor: "rgba(239,68,68,0.12)",
            color: "#FCA5A5",
          },
          width: "100%",
        }}
      >
        Logout
      </Button>
    </Box>
  );
};

export default Sidebar;
