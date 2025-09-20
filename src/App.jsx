import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { AuthProvider } from "./contexts/AuthContext";
import theme from "./theme/muiTheme";
import LandingPage from "./pages/LandingPage.jsx";
import AuthPage from "./pages/AuthPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import PrivateRoute from "./routes/PrivateRoute.jsx";
import SafetyDashboard from "./components/Dashboard/SafetyDashboard.jsx";
import PermissionAnalysis from "./components/Dashboard/PermissionAnalysis.jsx";
import "./App.css";

const App = () => {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="App">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <DashboardPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/dashboard/safety"
              element={
                <PrivateRoute>
                  <SafetyDashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/dashboard/permissions"
              element={
                <PrivateRoute>
                  <PermissionAnalysis />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
