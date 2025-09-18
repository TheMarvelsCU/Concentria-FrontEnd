import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext.jsx";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineMail,
  AiOutlineLock,
  AiOutlineUser,
  AiOutlinePhone,
} from "react-icons/ai";
import { FiAlertCircle, FiLoader, FiX } from "react-icons/fi";

// 3D Starfield Canvas (stars flying toward viewer)
const Starfield = ({ count = 400, speed = 0.035 }) => {
  const canvasRef = useRef(null);
  const rafRef = useRef(0);
  const starsRef = useRef([]);
  const sizeRef = useRef({ w: 0, h: 0, cx: 0, cy: 0, dpr: 1, f: 400 });
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      sizeRef.current = {
        w: canvas.width,
        h: canvas.height,
        cx: canvas.width / 2,
        cy: canvas.height / 2,
        dpr,
        f: 420 * dpr,
      };
      // recreate stars on resize to fill screen
      const stars = [];
      for (let i = 0; i < count; i++) stars.push(makeStar());
      starsRef.current = stars;
    };

    const makeStar = () => ({
      x: (Math.random() * 2 - 1) * sizeRef.current.cx,
      y: (Math.random() * 2 - 1) * sizeRef.current.cy,
      z: Math.random() * sizeRef.current.f + sizeRef.current.f,
      pz: 0,
      s: Math.random() * 1.2 + 0.4,
    });

    const loop = () => {
      const { w, h, cx, cy, f } = sizeRef.current;
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "rgba(2,6,23,1)"; // deep space base behind blending
      ctx.fillRect(0, 0, w, h);

      const stars = starsRef.current;
      const mx = (mouseRef.current.x - cx) * 0.0006;
      const my = (mouseRef.current.y - cy) * 0.0006;

      for (let i = 0; i < stars.length; i++) {
        const st = stars[i];
        st.z -= f * speed * (0.6 + Math.random() * 0.4);
        st.x += mx * st.z;
        st.y += my * st.z;
        if (st.z < 4) {
          // reset to far plane
          stars[i] = makeStar();
          continue;
        }
        const sx = (st.x / st.z) * f + cx;
        const sy = (st.y / st.z) * f + cy;
        const r = Math.max(0.6, (1 - st.z / (f * 2)) * 2.2) * st.s;
        const a = 0.85 - st.z / (f * 2.2);
        ctx.beginPath();
        ctx.fillStyle = `rgba(255,255,255,${Math.max(0.05, a)})`;
        ctx.arc(sx, sy, r, 0, Math.PI * 2);
        ctx.fill();
      }
      rafRef.current = requestAnimationFrame(loop);
    };

    const move = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) * sizeRef.current.dpr;
      const y = (e.clientY - rect.top) * sizeRef.current.dpr;
      mouseRef.current = { x, y };
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", move);
    handleResize();
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", move);
    };
  }, [count, speed]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
};

// Single-input control used by the wizard
const TextPill = ({
  type = "text",
  placeholder,
  value,
  onChange,
  autoFocus,
  onToggle,
  showPassword,
  icon: Icon,
}) => (
  <div className="relative max-w-3xl mx-auto">
    <div className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-white/15 bg-white/5 backdrop-blur-sm flex items-center justify-center text-slate-300">
      {Icon ? (
        <Icon className="w-5 h-5" />
      ) : (
        <span className="w-2 h-2 rounded-full bg-white/70" />
      )}
    </div>
    <input
      type={type === "password" ? (showPassword ? "text" : "password") : type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      autoFocus={autoFocus}
      className="w-full h-16 rounded-full pl-14 pr-14 bg-white/5 border border-white/15 text-slate-100 placeholder-slate-400 outline-none backdrop-blur-md focus:ring-4 focus:ring-white/10 focus:border-white/30 transition-all"
    />
    {type === "password" && (
      <button
        type="button"
        onClick={onToggle}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300/80 hover:text-white/90"
      >
        {showPassword ? (
          <AiOutlineEyeInvisible className="w-6 h-6" />
        ) : (
          <AiOutlineEye className="w-6 h-6" />
        )}
      </button>
    )}
  </div>
);

const AuthForm = () => {
  // change: extend mode to support additional flows
  const [mode, setMode] = useState("register"); // "login" | "register" | "verify-otp" | "forgot-password" | "reset-password"
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [errors, setErrors] = useState("");
  const [success, setSuccess] = useState("");
  const [uniqueKey, setUniqueKey] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    tnc: false,
    // added fields for OTP and reset password flows
    otp: "",
    resetEmail: "",
    resetOtp: "",
    newPassword: "",
  });

  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";

  const steps = useMemo(() => {
    if (mode === "login") {
      return [
        {
          key: "email",
          label: "What is your email?",
          placeholder: "abc@gmail.com",
          type: "email",
          icon: AiOutlineMail,
          validate: (v) => /.+@.+\..+/.test(v) || "Enter a valid email",
        },
        {
          key: "password",
          label: "Enter your password",
          placeholder: "••••••••",
          type: "password",
          icon: AiOutlineLock,
          validate: (v) =>
            v.length >= 4 || "Password must be at least 4 characters",
        },
      ];
    }

    if (mode === "verify-otp") {
      return [
        {
          key: "otp",
          label: "Enter the 6‑digit code we emailed you",
          placeholder: "123456",
          type: "text",
          icon: AiOutlineMail,
          validate: (v) => /^\d{6}$/.test(v) || "Enter a valid 6-digit OTP",
        },
      ];
    }

    if (mode === "forgot-password") {
      return [
        {
          key: "resetEmail",
          label: "Enter your account email",
          placeholder: "abc@gmail.com",
          type: "email",
          icon: AiOutlineMail,
          validate: (v) => /.+@.+\..+/.test(v) || "Enter a valid email",
        },
      ];
    }

    if (mode === "reset-password") {
      return [
        {
          key: "resetOtp",
          label: "Enter the 6‑digit OTP from your email",
          placeholder: "123456",
          type: "text",
          icon: AiOutlineMail,
          validate: (v) => /^\d{6}$/.test(v) || "Enter a valid 6-digit OTP",
        },
        {
          key: "newPassword",
          label: "Create a new password",
          placeholder: "Choose a strong password",
          type: "password",
          icon: AiOutlineLock,
          validate: (v) => v.length >= 4 || "At least 4 characters",
        },
      ];
    }

    // default: register flow
    return [
      {
        key: "fullName",
        label: "Hello, what is your name?",
        placeholder: "My name is…",
        type: "text",
        icon: AiOutlineUser,
        validate: (v) => v.trim().length >= 2 || "Please enter your name",
      },
      {
        key: "email",
        label: "What is your email?",
        placeholder: "abc@gmail.com",
        type: "email",
        icon: AiOutlineMail,
        validate: (v) => /.+@.+\..+/.test(v) || "Enter a valid email",
      },
      {
        key: "phoneNumber",
        label: "Your phone number?",
        placeholder: "9876543210",
        type: "tel",
        icon: AiOutlinePhone,
        validate: (v) => v.trim().length >= 7 || "Enter a valid phone",
      },
      {
        key: "password",
        label: "Create a password",
        placeholder: "Choose a strong password",
        type: "password",
        icon: AiOutlineLock,
        validate: (v) => v.length >= 4 || "At least 4 characters",
      },
      {
        key: "confirmPassword",
        label: "Confirm your password",
        placeholder: "Repeat password",
        type: "password",
        icon: AiOutlineLock,
        validate: (v) => v === formData.password || "Passwords do not match",
      },
      {
        key: "tnc",
        label: "Accept the terms to continue",
        placeholder: "I agree to the Terms and Conditions",
        type: "checkbox",
        validate: (v) => v || "You must accept the terms",
      },
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, formData.password]);

  const current = steps[step];

  const handleNext = async () => {
    setErrors("");
    setSuccess("");
    const val = formData[current.key];
    const valid = current.validate ? current.validate(val) : true;
    if (valid !== true) {
      setErrors(valid);
      return;
    }

    if (step < steps.length - 1) {
      setStep(step + 1);
      return;
    }

    // Final step: call backend depending on mode
    setLoading(true);
    try {
      if (mode === "login") {
        const resp = await auth.login({
          email: formData.email,
          password: formData.password,
        });
        if (resp && (resp.accessToken || resp.user)) {
          window.location.href = "/dashboard";
        } else {
          setErrors("Login failed. Please try again.");
        }
      } else if (mode === "register") {
        const resp = await auth.register({
          fullName: formData.fullName,
          countryCode: "+91",
          phoneNumber: formData.phoneNumber,
          email: formData.email,
          password: formData.password,
          tnc: formData.tnc,
        });
        setUniqueKey(resp?.uniqueKey || "");
        setSuccess(
          resp?.message || "Registration successful! Check your email for OTP."
        );
        // proceed to OTP verification step
        setMode("verify-otp");
        setStep(0);
      } else if (mode === "verify-otp") {
        const resp = await auth.verifyOtp({
          otp: formData.otp,
          uniqueKey,
        });
        setSuccess(
          resp?.message || "Account verified successfully! Please sign in."
        );
        // Go to login after short delay
        setTimeout(() => {
          setMode("login");
          setStep(0);
        }, 800);
      } else if (mode === "forgot-password") {
        const resp = await auth.forgotPassword(formData.resetEmail);
        setSuccess(resp?.message || "Password reset OTP sent to your email!");
        setMode("reset-password");
        setStep(0);
      } else if (mode === "reset-password") {
        const resp = await auth.resetPassword({
          email: formData.resetEmail,
          otp: formData.resetOtp,
          newPassword: formData.newPassword,
        });
        setSuccess(
          resp?.message || "Password reset successfully! Please sign in."
        );
        setTimeout(() => {
          setMode("login");
          setStep(0);
        }, 800);
      }
    } catch (e) {
      setErrors(e?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setErrors("");
    if (step > 0) setStep(step - 1);
  };

  const onEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleNext();
    }
  };

  const handleResendOtp = async () => {
    try {
      setLoading(true);
      const resp = await auth.resendOtp(uniqueKey);
      setSuccess(resp?.message || "OTP resent successfully!");
    } catch (e) {
      setErrors(e?.message || "Failed to resend OTP");
    } finally {
      setLoading(false);
    }
  };

  // Render for checkbox step
  const renderControl = () => {
    if (current.type === "checkbox") {
      return (
        <label className="inline-flex items-center gap-3 mx-auto">
          <input
            type="checkbox"
            checked={!!formData.tnc}
            onChange={(e) =>
              setFormData((p) => ({ ...p, tnc: e.target.checked }))
            }
            className="w-5 h-5 accent-white/90 bg-transparent border border-white/40 rounded"
          />
          <span className="text-slate-300">{current.placeholder}</span>
        </label>
      );
    }
    return (
      <TextPill
        type={current.type}
        placeholder={current.placeholder}
        value={formData[current.key] || ""}
        onChange={(v) => setFormData((p) => ({ ...p, [current.key]: v }))}
        autoFocus
        onToggle={() => setShowPass((s) => !s)}
        showPassword={showPass}
        icon={current.icon}
      />
    );
  };

  return (
    <div className="min-h-screen w-screen relative overflow-hidden bg-black text-white">
      {/* Animated starfield */}
      <Starfield />

      {/* Top bar */}
      <div className="pointer-events-none absolute top-6 left-0 w-full flex items-center justify-center z-20">
        <div className="flex gap-x-6 items-center pointer-events-auto rounded-full px-6 py-3 border border-white/10 bg-white/5 backdrop-blur text-xs tracking-[0.2em]">
          {mode === "login"
            ? "SIGN IN"
            : mode === "register"
            ? "TELL ABOUT YOURSELF"
            : mode === "verify-otp"
            ? "VERIFY EMAIL"
            : mode === "forgot-password"
            ? "FORGOT PASSWORD"
            : "RESET PASSWORD"}
        </div>
      </div>
      <button
        onClick={() => navigate("/")}
        className="absolute top-6 right-6 z-20 w-11 h-11 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-center"
      >
        <FiX className="w-5 h-5 text-white/80" />
      </button>

      {/* Center wizard */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-6">
        <div className="w-full text-center">
          <p className="uppercase tracking-widest text-white/40 text-xs mb-6">
            {/* label is set above now */}
          </p>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-medium text-white mb-10">
            {current.label}
          </h1>

          <form
            onKeyDown={onEnter}
            onSubmit={(e) => {
              e.preventDefault();
              handleNext();
            }}
            className="space-y-6"
          >
            {renderControl()}

            {/* Forgot password link on login password step */}
            {mode === "login" && current.key === "password" && (
              <div className="max-w-3xl mx-auto text-right">
                <button
                  type="button"
                  onClick={() => {
                    setMode("forgot-password");
                    setStep(0);
                    setErrors("");
                    setSuccess("");
                  }}
                  className="text-slate-300 underline hover:text-white text-sm"
                >
                  Forgot password?
                </button>
              </div>
            )}

            {/* Resend OTP for verification */}
            {mode === "verify-otp" && (
              <div className="max-w-3xl mx-auto text-center">
                <button
                  type="button"
                  onClick={handleResendOtp}
                  disabled={loading || !uniqueKey}
                  className="text-slate-300 underline hover:text-white text-sm disabled:opacity-50"
                >
                  Resend OTP
                </button>
              </div>
            )}

            {errors && (
              <div className="max-w-3xl mx-auto text-left text-rose-300 flex items-center gap-2">
                <FiAlertCircle className="w-5 h-5" />
                <span className="text-sm">{errors}</span>
              </div>
            )}

            {success && (
              <div className="max-w-3xl mx-auto text-left text-emerald-300">
                {success}
              </div>
            )}

            <div className="max-w-3xl mx-auto flex items-center gap-3 justify-center pt-2">
              {step > 0 && (
                <button
                  type="button"
                  onClick={handleBack}
                  className="h-14 px-8 rounded-full border border-white/20 text-white/90 hover:bg-white/10 transition-colors"
                >
                  Back
                </button>
              )}
              <button
                type="submit"
                disabled={loading}
                className="group h-14 px-14 rounded-full border border-white/80 text-white font-semibold tracking-wide hover:bg-white hover:text-black transition-colors disabled:opacity-60"
              >
                {loading ? (
                  <span className="inline-flex items-center">
                    <FiLoader className="animate-spin mr-2" />
                    Processing…
                  </span>
                ) : (
                  <>
                    {step < steps.length - 1 ? "NEXT" : "SUBMIT"}
                    <span
                      aria-hidden
                      className="ml-2 inline-block group-hover:translate-x-0.5 transition-transform"
                    >
                      →
                    </span>
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="mt-10 text-sm text-white/60">
            {mode === "login" ? (
              <>
                Don't have an account?{" "}
                <button
                  className="underline hover:text-white"
                  onClick={() => {
                    setMode("register");
                    setStep(0);
                    setErrors("");
                  }}
                >
                  {"Sign up"}
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  className="underline hover:text-white"
                  onClick={() => {
                    setMode("login");
                    setStep(0);
                    setErrors("");
                  }}
                >
                  {"Sign in"}
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* subtle space dust layers */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(1px 1px at 10% 20%, rgba(255,255,255,0.45) 50%, transparent 50%), radial-gradient(1px 1px at 70% 30%, rgba(255,255,255,0.35) 50%, transparent 50%), radial-gradient(1px 1px at 30% 80%, rgba(255,255,255,0.25) 50%, transparent 50%)`,
        }}
      />
    </div>
  );
};

export default AuthForm;
