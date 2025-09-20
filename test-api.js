// Test script to verify backend integration
import predictionAPI from "../src/services/predictionApi.js";

async function testAPI() {
  console.log("🧪 Testing API Integration...\n");

  // Test 1: Health Check
  console.log("1. Testing Health Check...");
  try {
    const healthResult = await predictionAPI.checkHealth();
    console.log("✅ Health Check:", healthResult);
  } catch (error) {
    console.log("❌ Health Check Failed:", error.message);
  }

  // Test 2: Safety Analysis
  console.log("\n2. Testing Safety Analysis...");
  try {
    const safetyResult = await predictionAPI.analyzeSafety(
      "https://example.com",
      ["camera", "microphone", "geolocation"]
    );
    console.log("✅ Safety Analysis:", safetyResult);
  } catch (error) {
    console.log("❌ Safety Analysis Failed:", error.message);
  }

  // Test 3: Permission Info
  console.log("\n3. Testing Permission Info...");
  try {
    const permissionResult = await predictionAPI.getPermissionInfo("camera");
    console.log("✅ Permission Info:", permissionResult);
  } catch (error) {
    console.log("❌ Permission Info Failed:", error.message);
  }

  // Test 4: Bulk Analysis
  console.log("\n4. Testing Bulk Analysis...");
  try {
    const bulkResult = await predictionAPI.bulkAnalyzePermissions([
      "camera",
      "microphone",
    ]);
    console.log("✅ Bulk Analysis:", bulkResult);
  } catch (error) {
    console.log("❌ Bulk Analysis Failed:", error.message);
  }

  console.log("\n🎉 API Testing Complete!");
}

testAPI();
