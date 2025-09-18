import { createTheme } from "@mui/material/styles";

// Dark theme aligned with your glassy auth page
const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#818CF8" }, // indigo-400
    secondary: { main: "#A78BFA" }, // violet-400
    background: {
      default: "#0B0B0F",
      paper: "rgba(255,255,255,0.06)",
    },
    text: {
      primary: "#E2E8F0",
      secondary: "#94A3B8",
    },
    divider: "rgba(255,255,255,0.12)",
  },
  shape: { borderRadius: 14 },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backdropFilter: "blur(10px)",
          backgroundImage: "none",
          border: "1px solid rgba(255,255,255,0.1)",
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backdropFilter: "blur(10px)",
          backgroundColor: "rgba(255,255,255,0.06)",
          borderRight: "1px solid rgba(255,255,255,0.1)",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(255,255,255,0.06)",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.1)",
          backdropFilter: "blur(10px)",
        },
      },
    },
  },
});

export default theme;
