import React, { useState, useEffect } from "react";
import predictionAPI from "../../services/predictionApi";
import { Shield, AlertCircle, Info, CheckCircle2, XCircle } from "lucide-react";

const PermissionAnalysis = () => {
  const [permissionData, setPermissionData] = useState(null);
  const [selectedPermission, setSelectedPermission] = useState("");
  const [bulkAnalysis, setBulkAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [apiStatus, setApiStatus] = useState("checking");

  const commonPermissions = [
    "geolocation",
    "camera",
    "microphone",
    "notifications",
    "clipboard-read",
    "clipboard-write",
    "storage",
    "bluetooth",
    "usb",
    "payment-handler",
  ];

  // Check API health on component mount
  useEffect(() => {
    checkApiHealth();
  }, []);

  const checkApiHealth = async () => {
    try {
      const result = await predictionAPI.checkHealth();

      if (result.success) {
        setApiStatus("connected");
      } else {
        setApiStatus("error");
      }
    } catch (error) {
      console.error("API health check failed:", error);
      setApiStatus("disconnected");
    }
  };

  const analyzePermission = async (permission) => {
    setLoading(true);
    try {
      const result = await predictionAPI.getPermissionInfo(permission);

      if (result.success) {
        setPermissionData(result.data);
      } else {
        console.error("API Error:", result.message || "Unknown error");
        alert(
          `Failed to analyze permission: ${result.message || "Unknown error"}`
        );
      }
    } catch (error) {
      console.error("Error analyzing permission:", error);
      alert(`Error analyzing permission: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const bulkAnalyzePermissions = async () => {
    setLoading(true);
    try {
      const result = await predictionAPI.bulkAnalyzePermissions(
        commonPermissions
      );

      if (result.success) {
        setBulkAnalysis(result.data);
      } else {
        console.error("API Error:", result.message || "Unknown error");
        alert(
          `Failed to bulk analyze permissions: ${
            result.message || "Unknown error"
          }`
        );
      }
    } catch (error) {
      console.error("Error bulk analyzing permissions:", error);
      alert(`Error bulk analyzing permissions: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    bulkAnalyzePermissions();
  }, []);

  const getRiskIcon = (riskScore) => {
    if (riskScore >= 8) return <XCircle className="w-5 h-5 text-red-400" />;
    if (riskScore >= 6)
      return <AlertCircle className="w-5 h-5 text-orange-400" />;
    if (riskScore >= 4) return <Info className="w-5 h-5 text-yellow-400" />;
    return <CheckCircle2 className="w-5 h-5 text-green-400" />;
  };

  const getRiskColor = (riskScore) => {
    if (riskScore >= 8) return "text-red-400";
    if (riskScore >= 6) return "text-orange-400";
    if (riskScore >= 4) return "text-yellow-400";
    return "text-green-400";
  };

  return (
    <div className="min-h-screen bg-[#070B12] text-gray-200 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-white flex items-center">
              <Shield className="w-6 h-6 mr-2 text-cyan-400" />
              Permission Risk Analysis
            </h2>

            <div className="flex items-center space-x-2 bg-white/5 rounded-xl p-3 border border-white/10">
              <div
                className={`w-3 h-3 rounded-full ${
                  apiStatus === "connected"
                    ? "bg-green-400"
                    : apiStatus === "disconnected"
                    ? "bg-red-400"
                    : apiStatus === "error"
                    ? "bg-orange-400"
                    : "bg-yellow-400"
                }`}
              />
              <span className="text-sm text-gray-300">
                API{" "}
                {apiStatus === "connected"
                  ? "Connected"
                  : apiStatus === "disconnected"
                  ? "Disconnected"
                  : apiStatus === "error"
                  ? "Error"
                  : "Checking..."}
              </span>
            </div>
          </div>

          <div className="flex space-x-4">
            <select
              value={selectedPermission}
              onChange={(e) => setSelectedPermission(e.target.value)}
              className="bg-white/5 border border-white/20 rounded-xl px-4 py-2 text-white focus:border-cyan-400 focus:outline-none"
            >
              <option value="">Select a permission to analyze</option>
              {commonPermissions.map((permission) => (
                <option
                  key={permission}
                  value={permission}
                  className="bg-gray-800"
                >
                  {permission}
                </option>
              ))}
            </select>

            <button
              onClick={() =>
                selectedPermission && analyzePermission(selectedPermission)
              }
              disabled={!selectedPermission || loading}
              className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-indigo-500 text-white font-semibold rounded-xl disabled:opacity-50"
            >
              Analyze
            </button>
          </div>
        </div>

        {/* Individual Permission Analysis */}
        {permissionData && (
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            <h3 className="text-xl font-bold text-white mb-4">
              Permission Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold text-white mb-3">
                  {permissionData.permission}
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Risk Score:</span>
                    <span
                      className={`font-bold ${getRiskColor(
                        permissionData.analysis.riskScore
                      )}`}
                    >
                      {permissionData.analysis.riskScore}/10
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Category:</span>
                    <span className="text-cyan-400 capitalize">
                      {permissionData.analysis.category}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-white mb-3">
                  Risk Assessment
                </h4>
                <p className="text-gray-300">
                  {permissionData.analysis.reason}
                </p>
                <div className="mt-3 p-3 bg-white/5 rounded-lg">
                  <p className="text-sm text-gray-400">
                    {permissionData.riskDescription}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bulk Analysis Results */}
        {bulkAnalysis && (
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            <h3 className="text-xl font-bold text-white mb-6">
              All Permissions Overview
            </h3>

            {/* Summary Stats */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
              <div className="bg-white/5 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-white">
                  {bulkAnalysis.summary.totalPermissions}
                </div>
                <div className="text-sm text-gray-400">Total</div>
              </div>
              <div className="bg-white/5 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-green-400">
                  {bulkAnalysis.summary.lowRisk || 0}
                </div>
                <div className="text-sm text-gray-400">Low Risk</div>
              </div>
              <div className="bg-white/5 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-yellow-400">
                  {bulkAnalysis.summary.mediumRisk || 0}
                </div>
                <div className="text-sm text-gray-400">Medium Risk</div>
              </div>
              <div className="bg-white/5 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-orange-400">
                  {bulkAnalysis.summary.highRisk || 0}
                </div>
                <div className="text-sm text-gray-400">High Risk</div>
              </div>
              <div className="bg-white/5 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-red-400">
                  {bulkAnalysis.summary.criticalRisk || 0}
                </div>
                <div className="text-sm text-gray-400">Critical</div>
              </div>
            </div>

            {/* Permission List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {bulkAnalysis.analyses.map((analysis, index) => (
                <div
                  key={index}
                  className="bg-white/5 rounded-xl p-4 border border-white/10"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-white">
                      {analysis.permission}
                    </h4>
                    {getRiskIcon(analysis.riskScore)}
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400 text-sm">Risk Score:</span>
                      <span
                        className={`font-bold ${getRiskColor(
                          analysis.riskScore
                        )}`}
                      >
                        {analysis.riskScore}/10
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400 text-sm">Category:</span>
                      <span className="text-cyan-400 text-sm capitalize">
                        {analysis.category}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mt-2">
                      {analysis.reason}
                    </p>
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

export default PermissionAnalysis;
