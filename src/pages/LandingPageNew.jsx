import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  FiArrowRight,
  FiShield,
  FiEye,
  FiUsers,
  FiZap,
  FiLock,
  FiActivity,
  FiDatabase,
  FiMail,
  FiLinkedin,
  FiGithub,
  FiTwitter,
  FiStar,
  FiCheck,
  FiPlay,
  FiMenu,
  FiX,
  FiMonitor,
  FiSmartphone,
  FiGlobe,
} from "react-icons/fi";
import { motion } from "framer-motion";

// Motion variants
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

export default function LandingPage() {
  const [scrollY, setScrollY] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Digital Marketing Manager",
      company: "TechFlow Inc.",
      comment:
        "Concentria transformed how I understand and control my digital footprint. The insights are incredible.",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&crop=face&auto=format",
      rating: 5,
    },
    {
      name: "Marcus Rodriguez",
      role: "Software Engineer",
      company: "InnovateLabs",
      comment:
        "As a developer, I appreciate the technical sophistication behind Concentria. It's transparency done right.",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face&auto=format",
      rating: 5,
    },
    {
      name: "Dr. Emily Watson",
      role: "Research Scientist",
      company: "MedTech Solutions",
      comment:
        "The peace of mind Concentria provides is invaluable. I can focus on research knowing my data is protected.",
      avatar:
        "https://images.unsplash.com/photo-1559026621-fd4f97f6c36b?w=80&h=80&fit=crop&crop=face&auto=format",
      rating: 5,
    },
  ];

  const features = [
    {
      icon: <FiShield className="w-6 h-6" />,
      title: "Advanced Privacy Protection",
      description:
        "Military-grade encryption and zero-knowledge architecture ensure your data remains private.",
      color: "from-cyan-500 to-blue-500",
    },
    {
      icon: <FiEye className="w-6 h-6" />,
      title: "Real-time Monitoring",
      description:
        "Track your digital footprint across platforms with live updates and intelligent alerts.",
      color: "from-purple-500 to-fuchsia-500",
    },
    {
      icon: <FiZap className="w-6 h-6" />,
      title: "Instant Insights",
      description:
        "Get actionable intelligence about your data usage with our advanced analytics engine.",
      color: "from-emerald-500 to-teal-500",
    },
    {
      icon: <FiUsers className="w-6 h-6" />,
      title: "Team Collaboration",
      description:
        "Share insights securely with your team while maintaining individual privacy controls.",
      color: "from-amber-500 to-rose-500",
    },
  ];

  const stats = [
    { number: "99.9%", label: "Uptime Guarantee", icon: <FiActivity /> },
    { number: "10M+", label: "Data Points Analyzed", icon: <FiDatabase /> },
    { number: "500+", label: "Enterprise Clients", icon: <FiUsers /> },
    { number: "24/7", label: "Expert Support", icon: <FiShield /> },
  ];

  return (
    <div className="min-h-screen bg-[#070B12] text-gray-200 relative overflow-hidden">
      {/* Background glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 rounded-full blur-3xl opacity-70 animate-float"
          style={{
            top: "8%",
            left: "8%",
            transform: `translate(${mousePosition.x * 0.02}px, ${
              mousePosition.y * 0.02
            }px)`,
          }}
        />
        <div
          className="absolute w-80 h-80 bg-gradient-to-r from-fuchsia-500/15 to-pink-500/15 rounded-full blur-3xl opacity-70 animate-float delay-200"
          style={{
            top: "58%",
            right: "8%",
            transform: `translate(${mousePosition.x * -0.015}px, ${
              mousePosition.y * -0.015
            }px)`,
          }}
        />
        <div
          className="absolute w-72 h-72 bg-gradient-to-r from-emerald-500/15 to-cyan-500/15 rounded-full blur-3xl opacity-70 animate-float delay-400"
          style={{
            bottom: "18%",
            left: "50%",
            transform: `translate(${mousePosition.x * 0.01}px, ${
              mousePosition.y * 0.01
            }px)`,
          }}
        />
      </div>

      {/* Navigation */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrollY > 50
            ? "bg-[#0B0F1A]/70 backdrop-blur-xl border-b border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.2)]"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/20">
                <FiShield className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                Concentria
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <a
                href="#features"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Features
              </a>
              <a
                href="#testimonials"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Reviews
              </a>
              <a
                href="#pricing"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Pricing
              </a>
              <a
                href="#contact"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Contact
              </a>
              <Link
                to="/auth"
                className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-indigo-500 text-white font-semibold shadow-lg shadow-cyan-500/20 ring-1 ring-white/10 hover:from-cyan-400 hover:to-indigo-400 transition-all"
              >
                <span>Get Started</span>
                <FiArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-gray-300 hover:text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <FiX className="w-6 h-6" />
              ) : (
                <FiMenu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-white/10">
              <div className="flex flex-col gap-4 pt-4">
                <a
                  href="#features"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Features
                </a>
                <a
                  href="#testimonials"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Reviews
                </a>
                <a
                  href="#pricing"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Pricing
                </a>
                <a
                  href="#contact"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Contact
                </a>
                <Link
                  to="/auth"
                  className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-indigo-500 text-white font-semibold w-fit"
                >
                  Get Started
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative z-10" ref={heroRef}>
        <div className="container mx-auto text-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mb-8 border border-cyan-400/30 bg-cyan-500/10 text-cyan-300"
          >
            <FiShield className="w-4 h-4 mr-2" />
            Trusted by 50,000+ users worldwide
          </motion.div>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.05 }}
            className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight tracking-tight"
          >
            Take Control of Your
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-indigo-400 to-fuchsia-400">
              Digital Privacy
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.1 }}
            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Monitor, protect, and control your digital footprint with
            intelligent privacy tools designed for the modern world.
          </motion.p>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-16"
          >
            <motion.div variants={fadeUp}>
              <Link
                to="/auth"
                className="inline-flex items-center gap-3 text-lg px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-indigo-500 text-white font-semibold shadow-xl shadow-cyan-500/20 ring-1 ring-white/10 hover:from-cyan-400 hover:to-indigo-400 transition-all"
              >
                <FiZap className="w-5 h-5" />
                <span>Start Free Trial</span>
              </Link>
            </motion.div>

            <motion.button
              variants={fadeUp}
              className="inline-flex items-center gap-2 text-lg px-8 py-4 rounded-2xl border border-white/10 bg-white/5 text-white hover:bg-white/10 transition-all"
            >
              <FiPlay className="w-5 h-5" />
              <span>Watch Demo</span>
            </motion.button>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                whileHover={{ y: -3 }}
                className="p-6 text-center rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl"
              >
                <div className="text-cyan-300 mb-2 flex justify-center">
                  {stat.icon}
                </div>
                <div className="text-2xl font-bold text-white mb-1">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-[#0B0F1A]/60">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Privacy Protection Redefined
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our comprehensive suite of tools gives you unprecedented control
              over your digital presence.
            </p>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                whileHover={{ y: -5, scale: 1.02 }}
                className="p-8 text-center rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl group"
              >
                <div
                  className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6 text-white shadow-lg shadow-black/20 group-hover:scale-110 transition-transform`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              See Everything in Real-Time
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Get a complete view of your digital privacy with our intuitive
              dashboard.
            </p>
          </div>

          <div className="bg-gradient-to-br from-cyan-500/10 to-indigo-500/10 rounded-3xl p-8 shadow-2xl border border-white/10">
            <div className="bg-[#0B0F1A]/70 rounded-2xl p-8 border border-white/10 backdrop-blur-xl">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-white">
                  Privacy Dashboard
                </h3>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-400">Live Monitoring</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="rounded-xl p-6 bg-emerald-500/10 border border-emerald-400/20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-emerald-300 font-medium">
                      Protected Devices
                    </span>
                    <FiShield className="w-5 h-5 text-emerald-300" />
                  </div>
                  <div className="text-3xl font-bold text-emerald-200">3/3</div>
                </div>

                <div className="rounded-xl p-6 bg-amber-500/10 border border-amber-400/20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-amber-300 font-medium">
                      Blocked Trackers
                    </span>
                    <FiEye className="w-5 h-5 text-amber-300" />
                  </div>
                  <div className="text-3xl font-bold text-amber-200">247</div>
                </div>

                <div className="rounded-xl p-6 bg-cyan-500/10 border border-cyan-400/20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-cyan-300 font-medium">
                      Privacy Score
                    </span>
                    <FiActivity className="w-5 h-5 text-cyan-300" />
                  </div>
                  <div className="text-3xl font-bold text-cyan-200">92/100</div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-semibold text-white mb-4">
                    Recent Activity
                  </h4>
                  <div className="space-y-3">
                    <ActivityItem
                      icon={<FiShield className="w-4 h-4" />}
                      text="Blocked tracking attempt from ads.example.com"
                      time="2 min ago"
                      status="blocked"
                    />
                    <ActivityItem
                      icon={<FiEye className="w-4 h-4" />}
                      text="New data broker detected and blocked"
                      time="15 min ago"
                      status="warning"
                    />
                    <ActivityItem
                      icon={<FiLock className="w-4 h-4" />}
                      text="Privacy settings updated successfully"
                      time="1 hour ago"
                      status="success"
                    />
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-white mb-4">
                    Device Protection
                  </h4>
                  <div className="space-y-3">
                    <DeviceItem
                      icon={<FiMonitor className="w-4 h-4" />}
                      name="MacBook Pro"
                      status="protected"
                    />
                    <DeviceItem
                      icon={<FiSmartphone className="w-4 h-4" />}
                      name="iPhone 15"
                      status="protected"
                    />
                    <DeviceItem
                      icon={<FiGlobe className="w-4 h-4" />}
                      name="Web Browser"
                      status="protected"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 px-6 bg-[#0B0F1A]/60">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Loved by Privacy-Conscious Users
            </h2>
            <p className="text-xl text-gray-300">
              Join thousands who've taken control of their digital privacy
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="p-12 text-center rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl">
              <div className="mb-8">
                <img
                  src={testimonials[currentTestimonial].avatar}
                  alt={testimonials[currentTestimonial].name}
                  className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                />
                <div className="flex justify-center mb-4 text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <FiStar key={i} className="w-5 h-5" />
                  ))}
                </div>
              </div>

              <blockquote className="text-2xl md:text-3xl text-gray-200 font-light leading-relaxed mb-8 italic">
                "{testimonials[currentTestimonial].comment}"
              </blockquote>

              <div className="border-t border-white/10 pt-6">
                <h4 className="text-xl font-semibold text-white">
                  {testimonials[currentTestimonial].name}
                </h4>
                <p className="text-gray-400">
                  {testimonials[currentTestimonial].role} •{" "}
                  {testimonials[currentTestimonial].company}
                </p>
              </div>
            </div>

            <div className="flex justify-center gap-3 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    index === currentTestimonial
                      ? "bg-cyan-500 w-8"
                      : "bg-white/20 w-2.5 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="relative overflow-hidden rounded-3xl p-12 text-center text-white bg-gradient-to-r from-cyan-600 to-indigo-600 border border-white/10">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to Take Control?
              </h2>
              <p className="text-xl mb-8 opacity-95 max-w-2xl mx-auto leading-relaxed">
                Join thousands who've already secured their digital privacy.
                Start your free trial today.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
                <Link
                  to="/auth"
                  className="bg-white text-cyan-700 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 inline-flex items-center gap-3"
                >
                  <FiArrowRight className="w-5 h-5" />
                  <span>Start Free Trial</span>
                </Link>

                <div className="flex items-center gap-6 text-white/90 text-sm">
                  <div className="flex items-center gap-2">
                    <FiCheck className="w-4 h-4" />
                    <span>No credit card required</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiCheck className="w-4 h-4" />
                    <span>14-day free trial</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#06090F] text-white py-16 px-6 border-t border-white/5">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-500/20">
                  <FiShield className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Concentria</h3>
                  <p className="text-gray-400 text-sm">Privacy for Everyone</p>
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed max-w-md mb-6">
                We believe privacy is a fundamental right. Our mission is to
                make digital privacy accessible, understandable, and effective
                for everyone.
              </p>
              <div className="flex gap-4">
                <SocialButton icon={<FiTwitter />} />
                <SocialButton icon={<FiLinkedin />} />
                <SocialButton icon={<FiGithub />} />
                <SocialButton icon={<FiMail />} />
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <div className="space-y-3">
                <FooterLink href="#features">Features</FooterLink>
                <FooterLink href="#pricing">Pricing</FooterLink>
                <FooterLink href="#security">Security</FooterLink>
                <FooterLink href="#api">API</FooterLink>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <div className="space-y-3">
                <FooterLink href="#help">Help Center</FooterLink>
                <FooterLink href="#contact">Contact Us</FooterLink>
                <FooterLink href="#privacy">Privacy Policy</FooterLink>
                <FooterLink href="#terms">Terms of Service</FooterLink>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <p className="text-gray-400 text-sm mb-4 md:mb-0">
                © 2025 Concentria. All rights reserved.
              </p>
              <div className="flex items-center gap-6 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>All systems operational</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Helper Components
const ActivityItem = ({ icon, text, time, status }) => {
  const statusStyles = {
    blocked: "text-rose-300 bg-rose-500/10 border border-rose-400/20",
    warning: "text-amber-300 bg-amber-500/10 border border-amber-400/20",
    success: "text-emerald-300 bg-emerald-500/10 border border-emerald-400/20",
  };

  return (
    <div className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
      <div className={`p-2 rounded-lg ${statusStyles[status]}`}>{icon}</div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-white font-medium">{text}</p>
        <p className="text-xs text-gray-400">{time}</p>
      </div>
    </div>
  );
};

const DeviceItem = ({ icon, name, status }) => (
  <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10">
    <div className="flex items-center gap-3">
      <div className="p-2 bg-cyan-500/10 text-cyan-300 border border-cyan-400/20 rounded-lg">
        {icon}
      </div>
      <span className="text-sm font-medium text-white">{name}</span>
    </div>
    <span className="text-xs font-medium text-emerald-300 bg-emerald-500/10 px-2 py-1 rounded-full border border-emerald-400/20">
      {status}
    </span>
  </div>
);

const SocialButton = ({ icon }) => (
  <button className="w-10 h-10 bg-white/5 hover:bg-white/10 rounded-full flex items-center justify-center text-gray-300 hover:text-white transition-all duration-300 hover:scale-110 border border-white/10">
    {icon}
  </button>
);

const FooterLink = ({ href, children }) => (
  <a
    href={href}
    className="block text-gray-400 hover:text-white transition-colors text-sm"
  >
    {children}
  </a>
);
