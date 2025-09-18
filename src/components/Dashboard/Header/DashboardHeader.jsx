import React from "react";
import { AiOutlineReload } from "react-icons/ai";
import { FiTrash2, FiMenu } from "react-icons/fi";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  IconButton,
  Button,
  Paper,
} from "@mui/material";

const DashboardHeader = ({
  activeTab,
  onRefresh,
  onDeleteAllLogs,
  showDeleteButton = false,
  onMenuClick,
}) => {
  const getTabInfo = () => {
    switch (activeTab) {
      case "overview":
        return {
          title: "Dashboard Overview",
          subtitle: "Monitor your privacy and security metrics",
        };
      case "logs":
        return {
          title: "Activity Logs",
          subtitle: "View and manage your activity logs",
        };
      case "analytics":
        return {
          title: "Analytics",
          subtitle: "Analyze your privacy patterns",
        };
      case "profile":
        return {
          title: "Profile Settings",
          subtitle: "Manage your account settings",
        };
      default:
        return {
          title: "Dashboard",
          subtitle: "Welcome to your dashboard",
        };
    }
  };

  const { title, subtitle } = getTabInfo();

  return (
    <Paper elevation={0} sx={{ p: { xs: 2, md: 3 }, mb: 3 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <IconButton onClick={onMenuClick} sx={{ display: { md: "none" } }}>
            <FiMenu />
          </IconButton>
          <Box>
            <Typography variant="h6" fontWeight={700} sx={{ color: "#E2E8F0" }}>
              {title}
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "#94A3B8", display: { xs: "none", sm: "block" } }}
            >
              {subtitle}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            onClick={onRefresh}
            startIcon={<AiOutlineReload />}
            variant="outlined"
            color="inherit"
          >
            Refresh
          </Button>
          {showDeleteButton && (
            <Button
              onClick={onDeleteAllLogs}
              startIcon={<FiTrash2 />}
              variant="outlined"
              color="error"
            >
              Clear All
            </Button>
          )}
        </Box>
      </Box>
    </Paper>
  );
};

export default DashboardHeader;
