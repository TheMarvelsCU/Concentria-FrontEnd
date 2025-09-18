/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        primary: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
        display: [
          "Space Grotesk",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
        mono: [
          "JetBrains Mono",
          "Fira Code",
          "Monaco",
          "Consolas",
          "monospace",
        ],
      },
      colors: {
        quantum: {
          50: "#f0fdff",
          100: "#ccf7fe",
          200: "#99eefd",
          300: "#66e2fa",
          400: "#22d3ee",
          500: "#06b6d4",
          600: "#0891b2",
          700: "#0e7490",
          800: "#155e75",
          900: "#164e63",
        },
        cyber: {
          50: "#faf5ff",
          100: "#f3e8ff",
          200: "#e9d5ff",
          300: "#d8b4fe",
          400: "#c084fc",
          500: "#a855f7",
          600: "#9333ea",
          700: "#7c3aed",
          800: "#6b21a8",
          900: "#581c87",
        },
        neon: {
          cyan: "#22d3ee",
          blue: "#3b82f6",
          purple: "#8b5cf6",
          pink: "#ec4899",
          green: "#22c55e",
          yellow: "#facc15",
          orange: "#fb923c",
          red: "#f87171",
        },
      },
      backgroundImage: {
        "gradient-quantum": "linear-gradient(135deg, #06b6d4 0%, #2563eb 100%)",
        "gradient-quantum-reverse":
          "linear-gradient(135deg, #2563eb 0%, #06b6d4 100%)",
        "gradient-cyber": "linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)",
        "gradient-neon":
          "linear-gradient(135deg, #22d3ee 0%, #a78bfa 50%, #f472b6 100%)",
        "gradient-holographic":
          "linear-gradient(45deg, #ff006e, #8338ec, #3a86ff, #06ffa5, #ffbe0b, #fb5607)",
        "gradient-dark": "linear-gradient(135deg, #111111 0%, #000000 100%)",
        "gradient-glass":
          "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)",
      },
      boxShadow: {
        "glow-cyan": "0 0 20px rgba(34, 211, 238, 0.3)",
        "glow-blue": "0 0 20px rgba(59, 130, 246, 0.3)",
        "glow-purple": "0 0 20px rgba(139, 92, 246, 0.3)",
        "glow-pink": "0 0 20px rgba(236, 72, 153, 0.3)",
        cyber:
          "0 0 30px rgba(34, 211, 238, 0.2), 0 0 60px rgba(139, 92, 246, 0.1)",
        quantum:
          "0 20px 40px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.05)",
        glass:
          "0 8px 32px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)",
        neon: "0 0 20px currentColor, inset 0 0 20px rgba(255, 255, 255, 0.1)",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        gradient: "gradient 15s ease infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "bounce-slow": "bounce 3s infinite",
        "spin-slow": "spin 8s linear infinite",
        "ping-slow": "ping 3s cubic-bezier(0, 0, 0.2, 1) infinite",
        slideUp: "slideUp 0.5s ease-out",
        slideDown: "slideDown 0.5s ease-out",
        slideLeft: "slideLeft 0.5s ease-out",
        slideRight: "slideRight 0.5s ease-out",
        fadeIn: "fadeIn 0.5s ease-out",
        fadeOut: "fadeOut 0.5s ease-out",
        zoomIn: "zoomIn 0.5s ease-out",
        zoomOut: "zoomOut 0.5s ease-out",
        rotateIn: "rotateIn 0.5s ease-out",
        flipIn: "flipIn 0.6s ease-out",
        holographic: "holographic 1s ease-in-out infinite alternate",
        quantumPulse: "quantumPulse 2s ease-in-out infinite",
        glowPulse: "glowPulse 2s ease-in-out infinite alternate",
        particleFloat: "particleFloat 20s linear infinite",
        shimmer: "shimmer 2s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        gradient: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(30px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        slideDown: {
          from: { opacity: "0", transform: "translateY(-30px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        slideLeft: {
          from: { opacity: "0", transform: "translateX(30px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        slideRight: {
          from: { opacity: "0", transform: "translateX(-30px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        fadeOut: {
          from: { opacity: "1" },
          to: { opacity: "0" },
        },
        zoomIn: {
          from: { opacity: "0", transform: "scale(0.5)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        zoomOut: {
          from: { opacity: "1", transform: "scale(1)" },
          to: { opacity: "0", transform: "scale(0.5)" },
        },
        rotateIn: {
          from: { opacity: "0", transform: "rotate(-200deg)" },
          to: { opacity: "1", transform: "rotate(0deg)" },
        },
        flipIn: {
          from: { opacity: "0", transform: "rotateY(90deg)" },
          to: { opacity: "1", transform: "rotateY(0deg)" },
        },
        holographic: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "100% 50%" },
        },
        quantumPulse: {
          "0%, 100%": {
            boxShadow:
              "0 0 20px rgba(34, 211, 238, 0.3), 0 0 40px rgba(139, 92, 246, 0.2)",
            transform: "scale(1)",
          },
          "50%": {
            boxShadow:
              "0 0 30px rgba(34, 211, 238, 0.5), 0 0 60px rgba(139, 92, 246, 0.3)",
            transform: "scale(1.05)",
          },
        },
        glowPulse: {
          "0%": { filter: "brightness(1) saturate(1)" },
          "100%": { filter: "brightness(1.2) saturate(1.3)" },
        },
        particleFloat: {
          "0%": { transform: "translateY(100vh) rotate(0deg)", opacity: "0" },
          "10%": { opacity: "1" },
          "90%": { opacity: "1" },
          "100%": {
            transform: "translateY(-10vh) rotate(360deg)",
            opacity: "0",
          },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
      spacing: {
        18: "4.5rem",
        88: "22rem",
        128: "32rem",
        144: "36rem",
      },
    },
  },
  plugins: [],
};
