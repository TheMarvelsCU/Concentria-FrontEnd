const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Frontend-only safety calculation logic
const PERMISSION_RISK_LEVELS = {
  geolocation: 8,
  camera: 9,
  microphone: 9,
  notifications: 4,
  "clipboard-read": 7,
  "clipboard-write": 8,
  storage: 5,
  "persistent-storage": 6,
  bluetooth: 7,
  "payment-handler": 10,
  downloads: 6,
  usb: 9,
};

const PERMISSION_DESCRIPTIONS = {
  geolocation:
    "Access to your physical location through GPS or network-based location services",
  camera: "Access to device camera for taking photos or recording video",
  microphone: "Access to device microphone for recording audio",
  notifications: "Permission to send push notifications to the user",
  "clipboard-read": "Ability to read content from the system clipboard",
  "clipboard-write": "Ability to write content to the system clipboard",
  storage: "Access to local browser storage for data persistence",
  "persistent-storage":
    "Access to persistent storage that survives browser restarts",
  bluetooth: "Access to Bluetooth devices for wireless communication",
  "payment-handler": "Access to payment processing capabilities",
  downloads: "Permission to initiate file downloads",
  usb: "Direct access to USB devices connected to the system",
};

const HIGH_RISK_DOMAINS = [
  "unknown-site.com",
  "suspicious-domain.net",
  "phishing-site.org",
  "malware-host.ru",
  "spam-central.cn",
];

class PredictionAPI {
  constructor() {
    this.baseURL = `${API_BASE_URL}/api/predict`;
    this.useLocalLogic = true; // Enable frontend logic for calculations
    this.logToBackend = true; // Enable backend logging for showcase
  }

  async makeRequest(endpoint, options = {}) {
    try {
      const url = `${this.baseURL}${endpoint}`;
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error(`API request failed for ${endpoint}:`, error);
      throw error;
    }
  }

  calculateSafetyScore(url, permissions) {
    // Domain-based risk assessment
    const domain = new URL(url).hostname.toLowerCase();
    let domainRisk = 0;

    if (HIGH_RISK_DOMAINS.some((risky) => domain.includes(risky))) {
      domainRisk = 3;
    } else if (
      !domain.includes(".com") &&
      !domain.includes(".org") &&
      !domain.includes(".edu")
    ) {
      domainRisk = 1;
    }

    // Permission-based risk calculation
    const permissionRisks = permissions.map(
      (p) => PERMISSION_RISK_LEVELS[p] || 5
    );
    const averagePermissionRisk =
      permissionRisks.reduce((sum, risk) => sum + risk, 0) /
      permissionRisks.length;
    const highRiskPermissions = permissions.filter(
      (p) => (PERMISSION_RISK_LEVELS[p] || 5) >= 7
    ).length;

    // Combined risk calculation (0-10 scale, where 10 is safest)
    const combinedRisk = (averagePermissionRisk + domainRisk * 2) / 10;
    const safetyScore = Math.max(0, Math.min(10, 10 - combinedRisk));

    // Risk level determination
    let riskLevel;
    if (safetyScore >= 8) riskLevel = "low";
    else if (safetyScore >= 6) riskLevel = "medium";
    else if (safetyScore >= 3) riskLevel = "high";
    else riskLevel = "critical";

    return {
      safetyScore: Math.round(safetyScore * 10) / 10,
      riskLevel,
      highRiskPermissions,
      totalPermissions: permissions.length,
      domainRisk,
    };
  }

  generateRecommendations(url, permissions, analysis) {
    const recommendations = [];
    const domain = new URL(url).hostname;

    if (analysis.riskLevel === "critical" || analysis.riskLevel === "high") {
      recommendations.push(
        `⚠️ High risk website detected. Exercise extreme caution when granting permissions to ${domain}`
      );
    }

    if (permissions.includes("camera") && permissions.includes("microphone")) {
      recommendations.push(
        "🔐 Both camera and microphone access requested. Ensure this is necessary for the website's functionality"
      );
    }

    if (permissions.includes("payment-handler")) {
      recommendations.push(
        "💳 Payment access requested. Verify the website's legitimacy and security certificates"
      );
    }

    if (permissions.includes("geolocation")) {
      recommendations.push(
        "📍 Location access requested. Consider if location sharing is essential for this service"
      );
    }

    if (
      permissions.includes("clipboard-read") ||
      permissions.includes("clipboard-write")
    ) {
      recommendations.push(
        "📋 Clipboard access can expose sensitive copied data. Grant only if absolutely necessary"
      );
    }

    if (analysis.highRiskPermissions > analysis.totalPermissions / 2) {
      recommendations.push(
        "⚡ More than half of requested permissions are high-risk. Review each permission carefully"
      );
    }

    if (!url.startsWith("https://")) {
      recommendations.push(
        "❌ Website is not using HTTPS. Avoid granting sensitive permissions on unsecured connections"
      );
    }

    if (recommendations.length === 0) {
      recommendations.push(
        "✅ No major security concerns detected. Standard web security practices apply"
      );
    }

    return recommendations;
  }

  async checkHealth() {
    // Try backend call first for showcase
    if (this.logToBackend) {
      try {
        console.log("📡 Checking backend health...");
        const backendResult = await this.makeRequest("/health");
        console.log("✅ Backend health check successful");

        // Return backend result if successful
        if (backendResult.success) {
          return backendResult;
        }
      } catch (error) {
        console.warn(
          "⚠️ Backend health check failed, using frontend fallback:",
          error.message
        );
      }
    }

    // Fallback to frontend simulation
    if (this.useLocalLogic) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            success: true,
            message: "Frontend logic is operational (Backend unavailable)",
            timestamp: new Date().toISOString(),
            version: "1.0.0-frontend",
            mode: "demo",
          });
        }, 500);
      });
    }

    return this.makeRequest("/health");
  }

  async analyzeSafety(url, permissions, metadata = {}) {
    // Pure frontend logic - no backend calls for URL analysis
    return new Promise((resolve) => {
      // Simulate realistic API delay
      setTimeout(() => {
        const analysis = this.calculateSafetyScore(url, permissions);
        const flaggedPermissions = permissions
          .filter((p) => (PERMISSION_RISK_LEVELS[p] || 5) >= 7)
          .map((p) => ({
            name: p.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase()),
            description:
              PERMISSION_DESCRIPTIONS[p] ||
              "Permission description not available",
            riskLevel: PERMISSION_RISK_LEVELS[p] || 5,
            type: p.includes("storage")
              ? "STORAGE"
              : p.includes("media") ||
                p.includes("camera") ||
                p.includes("microphone")
              ? "MEDIA"
              : p.includes("location") || p.includes("geolocation")
              ? "LOCATION"
              : p.includes("payment")
              ? "FINANCIAL"
              : "SYSTEM",
          }));

        const recommendations = this.generateRecommendations(
          url,
          permissions,
          analysis
        );

        resolve({
          success: true,
          data: {
            url,
            safetyScore: analysis.safetyScore,
            riskLevel: analysis.riskLevel,
            timestamp: new Date().toISOString(),
            analysis: {
              totalPermissions: analysis.totalPermissions,
              highRiskPermissions: analysis.highRiskPermissions,
              flaggedPermissions,
              recommendations,
              domainTrust:
                analysis.domainRisk === 0
                  ? "trusted"
                  : analysis.domainRisk === 1
                  ? "neutral"
                  : "suspicious",
            },
          },
        });
      }, 800 + Math.random() * 400); // 800ms-1.2s delay
    });
  }

  async getPermissionInfo(permission) {
    // Make backend call for logging purposes (showcase)
    if (this.logToBackend) {
      try {
        console.log(`📡 Making backend call for permission: ${permission}`);
        await this.makeRequest(`/permission/${encodeURIComponent(permission)}`);
        console.log("✅ Backend permission call successful");
      } catch (error) {
        console.warn(
          "⚠️ Backend permission call failed, continuing with frontend logic:",
          error.message
        );
      }
    }

    // Use frontend logic for actual data
    if (this.useLocalLogic) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const riskLevel = PERMISSION_RISK_LEVELS[permission] || 5;
          resolve({
            success: true,
            data: {
              permission,
              name: permission
                .replace("-", " ")
                .replace(/\b\w/g, (l) => l.toUpperCase()),
              description:
                PERMISSION_DESCRIPTIONS[permission] ||
                "Permission description not available",
              riskLevel,
              category: permission.includes("storage")
                ? "storage"
                : permission.includes("camera") ||
                  permission.includes("microphone")
                ? "media"
                : permission.includes("geolocation")
                ? "location"
                : permission.includes("payment")
                ? "financial"
                : "system",
              commonUse: `Commonly used for ${permission.replace(
                "-",
                " "
              )} functionality`,
              securityTips: [
                "Only grant this permission to trusted websites",
                "Review the website's privacy policy",
                "Consider the necessity of this permission for the service",
              ],
            },
          });
        }, 500);
      });
    }

    return this.makeRequest(`/permission/${encodeURIComponent(permission)}`);
  }

  async bulkAnalyzePermissions(permissions) {
    // Make backend call for logging purposes (showcase)
    if (this.logToBackend) {
      try {
        console.log("📡 Making backend bulk analysis call...");
        await this.makeRequest("/analyze-permissions", {
          method: "POST",
          body: JSON.stringify({ permissions }),
        });
        console.log("✅ Backend bulk analysis call successful");
      } catch (error) {
        console.warn(
          "⚠️ Backend bulk analysis failed, continuing with frontend logic:",
          error.message
        );
      }
    }

    // Use frontend logic for actual data
    if (this.useLocalLogic) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const analysisResults = permissions.map((permission) => {
            const riskLevel = PERMISSION_RISK_LEVELS[permission] || 5;
            return {
              permission,
              name: permission
                .replace("-", " ")
                .replace(/\b\w/g, (l) => l.toUpperCase()),
              riskLevel,
              category: permission.includes("storage")
                ? "storage"
                : permission.includes("camera") ||
                  permission.includes("microphone")
                ? "media"
                : permission.includes("geolocation")
                ? "location"
                : permission.includes("payment")
                ? "financial"
                : "system",
              description:
                PERMISSION_DESCRIPTIONS[permission] ||
                "Permission description not available",
            };
          });

          const averageRisk =
            analysisResults.reduce((sum, p) => sum + p.riskLevel, 0) /
            analysisResults.length;
          const highRiskCount = analysisResults.filter(
            (p) => p.riskLevel >= 7
          ).length;

          resolve({
            success: true,
            data: {
              permissions: analysisResults,
              summary: {
                totalPermissions: permissions.length,
                averageRiskLevel: Math.round(averageRisk * 10) / 10,
                highRiskPermissions: highRiskCount,
                lowRiskPermissions: analysisResults.filter(
                  (p) => p.riskLevel <= 4
                ).length,
                mediumRiskPermissions: analysisResults.filter(
                  (p) => p.riskLevel >= 5 && p.riskLevel <= 6
                ).length,
              },
            },
          });
        }, 800);
      });
    }

    return this.makeRequest("/analyze-permissions", {
      method: "POST",
      body: JSON.stringify({ permissions }),
    });
  }
}

export default new PredictionAPI();
