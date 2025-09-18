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
        backgroundColor: "rgba(0,0,0,0.9)",
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
      ></Box>

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

      {/* Navigation */}
      <List sx={{ flex: 1, width: "100%" }}>
        {sections.map((section, idx) => (
          <Box
            key={section.header || `sec-${idx}`}
            sx={{ mb: 1.5, width: "100%" }}
          >
            {section.header && (
              <Typography
                variant="overline"
                sx={{
                  color: "#94A3B8",
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
            )}
            {section.items.map((item) => {
              const Icon = item.icon;
              const selected = isSelected(item);
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
                      backgroundColor: "rgba(255,255,255,0.12)",
                      color: "#A5B4FC",
                    },
                    "&:hover": { backgroundColor: "rgba(255,255,255,0.08)" },
                    width: "100%",
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 36,
                      color: selected ? "#A5B4FC" : "#CBD5E1",
                    }}
                  >
                    <Icon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      fontSize: 14,
                      fontWeight: 600,
                      noWrap: true,
                    }}
                  />
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
