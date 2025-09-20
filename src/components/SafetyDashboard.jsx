import React, { useState, useEffect } from "react";
import {
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Globe,
  Lock,
  Camera,
  Mic,
  MapPin,
  Clipboard,
  Database,
  Bluetooth,
  CreditCard,
  Download,
  Activity,
  Search,
  RefreshCw,
  TrendingUp,
  BarChart3,
  Zap,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";

const SafetyDashboard = () => {
  const [safetyData, setSafetyData] = useState(null);
  const [analysisHistory, setAnalysisHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [urlInput, setUrlInput] = useState("");
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const [stats, setStats] = useState({
    totalAnalyses: 0,
    averageSafetyScore: 0,
    highRiskSites: 0,
    safeSites: 0,
  });

  const permissionOptions = [
    {
      id: "geolocation",
      name: "Geolocation",
      icon: MapPin,
      category: "location",
    },
    { id: "camera", name: "Camera", icon: Camera, category: "media" },
    { id: "microphone", name: "Microphone", icon: Mic, category: "media" },
    {
      id: "notifications",
      name: "Notifications",
      icon: Activity,
      category: "system",
    },
    {
      id: "clipboard-read",
      name: "Clipboard Read",
      icon: Clipboard,
      category: "data",
    },
    {
      id: "clipboard-write",
      name: "Clipboard Write",
      icon: Clipboard,
      category: "data",
    },
    {
      id: "storage",
      name: "Local Storage",
      icon: Database,
      category: "storage",
    },
    {
      id: "persistent-storage",
      name: "Persistent Storage",
      icon: Database,
      category: "storage",
    },
    {
      id: "bluetooth",
      name: "Bluetooth",
      icon: Bluetooth,
      category: "hardware",
    },
    {
      id: "payment-handler",
      name: "Payment Handler",
      icon: CreditCard,
      category: "finance",
    },
    { id: "downloads", name: "Downloads", icon: Download, category: "system" },
    { id: "usb", name: "USB Access", icon: Zap, category: "hardware" },
  ];

  const analyzeWebsiteSafety = async () => {
    if (!urlInput || selectedPermissions.length === 0) {
      alert("Please enter a URL and select at least one permission");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/predict/safety`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            url: urlInput,
            permissions: selectedPermissions,
            metadata: {
              userAgent: navigator.userAgent,
              referrer: document.referrer,
              timestamp: new Date().toISOString(),
            },
          }),
        }
      );

      const result = await response.json();

      if (result.success) {
        setSafetyData(result.data);
        setAnalysisHistory((prev) => [result.data, ...prev].slice(0, 10));
        updateStats(result.data);
      } else {
        alert("Failed to analyze website safety");
      }
    } catch (error) {
      console.error("Error analyzing safety:", error);
      alert("Error analyzing website safety");
    } finally {
      setLoading(false);
    }
  };

  const updateStats = (newData) => {
    setStats((prev) => ({
      totalAnalyses: prev.totalAnalyses + 1,
      averageSafetyScore:
        (prev.averageSafetyScore * prev.totalAnalyses + newData.safetyScore) /
        (prev.totalAnalyses + 1),
      highRiskSites:
        prev.highRiskSites +
        (newData.riskLevel === "high" || newData.riskLevel === "critical"
          ? 1
          : 0),
      safeSites: prev.safeSites + (newData.riskLevel === "low" ? 1 : 0),
    }));
  };

  const togglePermission = (permissionId) => {
    setSelectedPermissions((prev) =>
      prev.includes(permissionId)
        ? prev.filter((p) => p !== permissionId)
        : [...prev, permissionId]
    );
  };

  const getRiskColor = (riskLevel) => {
    switch (riskLevel) {
      case "low":
        return "text-green-400";
      case "medium":
        return "text-yellow-400";
      case "high":
        return "text-orange-400";
      case "critical":
        return "text-red-400";
      default:
        return "text-gray-400";
    }
  };

  const getRiskIcon = (riskLevel) => {
    switch (riskLevel) {
      case "low":
        return CheckCircle;
      case "medium":
        return AlertTriangle;
      case "high":
        return XCircle;
      case "critical":
        return XCircle;
      default:
        return Shield;
    }
  };

  const getScoreColor = (score) => {
    if (score >= 8) return "text-green-400";
    if (score >= 6) return "text-yellow-400";
    if (score >= 3) return "text-orange-400";
    return "text-red-400";
  };

  const pieData = safetyData
    ? [
        {
          name: "Safe Permissions",
          value:
            safetyData.analysis.totalPermissions -
            safetyData.analysis.highRiskPermissions,
          color: "#22c55e",
        },
        {
          name: "High Risk Permissions",
          value: safetyData.analysis.highRiskPermissions,
          color: "#ef4444",
        },
      ]
    : [];

  return (
    <div className="min-h-screen bg-[#070B12] text-gray-200 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Website Safety Dashboard
            </h1>
            <p className="text-gray-400">
              Analyze website safety based on requested permissions
            </p>
          </div>
          <div className="flex items-center space-x-2 bg-white/5 rounded-2xl p-4 border border-white/10">
            <Shield className="w-8 h-8 text-cyan-400" />
            <div>
              <div className="text-sm text-gray-400">Security Status</div>
              <div className="text-lg font-bold text-cyan-400">Active</div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Analyses</p>
                <p className="text-2xl font-bold text-white">
                  {stats.totalAnalyses}
                </p>
              </div>
              <BarChart3 className="w-8 h-8 text-cyan-400" />
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Average Safety Score</p>
                <p className="text-2xl font-bold text-white">
                  {stats.averageSafetyScore.toFixed(1)}/10
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-400" />
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">High Risk Sites</p>
                <p className="text-2xl font-bold text-red-400">
                  {stats.highRiskSites}
                </p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-400" />
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Safe Sites</p>
                <p className="text-2xl font-bold text-green-400">
                  {stats.safeSites}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
          </div>
        </div>

        {/* Analysis Form */}
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <Search className="w-6 h-6 mr-2 text-cyan-400" />
            Website Safety Analysis
          </h2>

          <div className="space-y-6">
            {/* URL Input */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Website URL
              </label>
              <div className="flex space-x-4">
                <input
                  type="url"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  placeholder="https://example.com"
                  className="flex-1 bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
                />
                <button
                  onClick={analyzeWebsiteSafety}
                  disabled={loading}
                  className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-indigo-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  {loading ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      <span>Analyzing...</span>
                    </>
                  ) : (
                    <>
                      <Shield className="w-5 h-5" />
                      <span>Analyze Safety</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Permission Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-4">
                Select Permissions to Analyze
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {permissionOptions.map((permission) => {
                  const Icon = permission.icon;
                  const isSelected = selectedPermissions.includes(
                    permission.id
                  );

                  return (
                    <button
                      key={permission.id}
                      onClick={() => togglePermission(permission.id)}
                      className={`p-3 rounded-xl border transition-all duration-300 flex items-center space-x-2 ${
                        isSelected
                          ? "bg-cyan-500/20 border-cyan-400 text-cyan-400"
                          : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:border-white/20"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-sm font-medium">
                        {permission.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Safety Analysis Results */}
        {safetyData && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Main Results */}
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-6">
                Safety Analysis Results
              </h3>

              <div className="space-y-6">
                {/* Safety Score */}
                <div className="text-center">
                  <div
                    className={`text-6xl font-bold ${getScoreColor(
                      safetyData.safetyScore
                    )} mb-2`}
                  >
                    {safetyData.safetyScore}
                  </div>
                  <div className="text-lg text-gray-400">
                    Safety Score out of 10
                  </div>
                  <div
                    className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mt-4 ${
                      safetyData.riskLevel === "low"
                        ? "bg-green-500/20 text-green-400"
                        : safetyData.riskLevel === "medium"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : safetyData.riskLevel === "high"
                        ? "bg-orange-500/20 text-orange-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {React.createElement(getRiskIcon(safetyData.riskLevel), {
                      className: "w-4 h-4 mr-2",
                    })}
                    {safetyData.riskLevel.toUpperCase()} RISK
                  </div>
                </div>

                {/* URL Info */}
                <div className="bg-white/5 rounded-xl p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Globe className="w-4 h-4 text-cyan-400" />
                    <span className="text-sm font-medium text-gray-300">
                      Analyzed URL
                    </span>
                  </div>
                  <p className="text-white break-all">{safetyData.url}</p>
                </div>

                {/* Permission Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-white">
                      {safetyData.analysis.totalPermissions}
                    </div>
                    <div className="text-sm text-gray-400">
                      Total Permissions
                    </div>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-red-400">
                      {safetyData.analysis.highRiskPermissions}
                    </div>
                    <div className="text-sm text-gray-400">High Risk</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Pie Chart */}
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-6">
                Permission Risk Distribution
              </h3>

              {pieData.length > 0 && (
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}`}
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "rgba(0,0,0,0.8)",
                          border: "1px solid rgba(255,255,255,0.1)",
                          borderRadius: "8px",
                          color: "#fff",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Flagged Permissions */}
        {safetyData && safetyData.analysis.flaggedPermissions.length > 0 && (
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center">
              <AlertTriangle className="w-6 h-6 mr-2 text-orange-400" />
              Flagged Permissions
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {safetyData.analysis.flaggedPermissions.map(
                (permission, index) => (
                  <div
                    key={index}
                    className="bg-white/5 rounded-xl p-4 border border-red-500/20"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-white">
                        {permission.name}
                      </h4>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          permission.riskLevel >= 8
                            ? "bg-red-500/20 text-red-400"
                            : permission.riskLevel >= 6
                            ? "bg-orange-500/20 text-orange-400"
                            : "bg-yellow-500/20 text-yellow-400"
                        }`}
                      >
                        Risk: {permission.riskLevel}/10
                      </span>
                    </div>
                    <p className="text-sm text-gray-400 mb-2">
                      {permission.description}
                    </p>
                    <div className="text-xs text-cyan-400 uppercase font-medium">
                      {permission.type}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        )}

        {/* Recommendations */}
        {safetyData && safetyData.analysis.recommendations.length > 0 && (
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center">
              <Lock className="w-6 h-6 mr-2 text-cyan-400" />
              Security Recommendations
            </h3>

            <div className="space-y-3">
              {safetyData.analysis.recommendations.map(
                (recommendation, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 p-4 bg-white/5 rounded-xl border border-white/10"
                  >
                    <div
                      className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${
                        recommendation.includes("⚠️") ||
                        recommendation.includes("❌")
                          ? "bg-red-400"
                          : recommendation.includes("Warning")
                          ? "bg-orange-400"
                          : "bg-cyan-400"
                      }`}
                    />
                    <p className="text-gray-300">{recommendation}</p>
                  </div>
                )
              )}
            </div>
          </div>
        )}

        {/* Analysis History */}
        {analysisHistory.length > 0 && (
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            <h3 className="text-xl font-bold text-white mb-6">
              Recent Analysis History
            </h3>

            <div className="space-y-3">
              {analysisHistory.slice(0, 5).map((analysis, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10"
                >
                  <div className="flex items-center space-x-4">
                    <Globe className="w-5 h-5 text-cyan-400" />
                    <div>
                      <p className="text-white font-medium truncate max-w-xs">
                        {analysis.url}
                      </p>
                      <p className="text-xs text-gray-400">
                        {new Date(analysis.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div
                        className={`text-lg font-bold ${getScoreColor(
                          analysis.safetyScore
                        )}`}
                      >
                        {analysis.safetyScore}/10
                      </div>
                      <div
                        className={`text-xs uppercase font-medium ${getRiskColor(
                          analysis.riskLevel
                        )}`}
                      >
                        {analysis.riskLevel}
                      </div>
                    </div>
                    <div className="text-gray-400">
                      {analysis.analysis.totalPermissions} permissions
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SafetyDashboard;
