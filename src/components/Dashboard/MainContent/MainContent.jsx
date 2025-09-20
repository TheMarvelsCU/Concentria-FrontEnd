import React from "react";
import StatsCards from "../Stats/StatsCards";
import LogsTable from "../Logs/LogsTable.jsx";
import NivoLineActivity from "../Charts/NivoLineActivity.jsx";
import NivoBarLogsByType from "../Charts/NivoBarLogsByType.jsx";
import NivoPieRisk from "../Charts/NivoPieRisk.jsx";
import ProgressCircle from "../Charts/ProgressCircle.jsx";
import ProfilePage from "../UserProfile/ProfilePage.jsx";
import SafetyDashboard from "../SafetyDashboard.jsx";
import PermissionAnalysis from "../PermissionAnalysis.jsx";

const MainContent = ({ activeTab, logs = [], logsLoading = false }) => {
  const renderOverview = () => (
    <div className="space-y-4">
      {/* Row 1: 4 Stats cards */}
      <StatsCards logs={logs} />

      {/* Row 2: Line graph (50%) + Past Logs (50%) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="min-h-0">
          <NivoLineActivity logs={logs} height={280} />
        </div>
        <div className="min-h-0">
          <LogsTable
            logs={logs}
            loading={logsLoading}
            limit={5}
            maxHeight={280}
            compact
          />
        </div>
      </div>

      {/* Row 3: Bar, Pie, Risk Score ring */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <NivoBarLogsByType logs={logs} />
        <NivoPieRisk logs={logs} />
        <ProgressCircle logs={logs} />
      </div>
    </div>
  );

  const renderCharts = () => (
    <div className="space-y-4">
      {/* Row 3: Bar, Pie, Risk Score ring */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <NivoBarLogsByType logs={logs} />
        <NivoPieRisk logs={logs} />
        <ProgressCircle logs={logs} />
      </div>
      {/* Row 2: Line graph (50%) + Placeholder (50%) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="min-h-0">
          <NivoLineActivity logs={logs} />
        </div>
        <div className="hidden lg:block min-h-0" />
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return renderOverview();
      case "logs":
        return (
          <div>
            <LogsTable logs={logs} loading={logsLoading} />
          </div>
        );
      case "analytics":
        return (
          <div>
            {/* Full past activity table only */}
            <LogsTable
              logs={logs}
              loading={logsLoading}
              limit={logs?.length || 1000}
            />
          </div>
        );
      case "charts":
        return renderCharts();
      case "profile":
        return <ProfilePage />;
      case "safety":
        return <SafetyDashboard />;
      case "permissions":
        return <PermissionAnalysis />;
      case "threats":
        return (
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-4">
              Threat Monitor
            </h2>
            <p className="text-gray-400">
              Threat monitoring dashboard coming soon...
            </p>
          </div>
        );
      default:
        return renderOverview();
    }
  };

  return (
    <div className="flex-1 p-4 md:p-6 text-slate-100">{renderTabContent()}</div>
  );
};

export default MainContent;
