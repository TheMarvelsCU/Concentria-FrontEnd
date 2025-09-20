import React from 'react';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';
import { HiShieldCheck } from 'react-icons/hi';
import { motion } from 'framer-motion';

const Testimonials = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.6
      }
    }
  };

  const headerVariants = {
    hidden: { 
      opacity: 0, 
      y: 50 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 60,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const ctaVariants = {
    hidden: { 
      opacity: 0, 
      y: 40 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: 0.3
      }
    }
  };

  const testimonials = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "Privacy Advocate & Tech Journalist",
      company: "TechPrivacy Weekly",
      avatar: "SC",
      rating: 5,
      testimonial: "Concentria finally gave me the tools to understand what data companies were collecting about me. The insights were shocking, but now I feel empowered to take control of my digital footprint.",
      highlight: "Empowering privacy control"
    },
    {
      id: 2,
      name: "Marcus Rodriguez",
      role: "Small Business Owner",
      company: "Rodriguez Digital Marketing",
      avatar: "MR",
      rating: 4,
      testimonial: "As someone who handles client data daily, Concentria helped me implement better privacy practices. My clients trust me more knowing their information is properly secured.",
      highlight: "Enhanced client trust"
    },
    {
      id: 3,
      name: "Dr. Emily Watson",
      role: "Cybersecurity Researcher",
      company: "University of Cambridge",
      avatar: "EW",
      rating: 5,
      testimonial: "The depth of analysis Concentria provides is remarkable. It's not just about blocking trackers - it's about understanding the entire data ecosystem around you.",
      highlight: "Comprehensive data insights"
    },
    {
      id: 4,
      name: "Alex Thompson",
      role: "Software Developer",
      company: "Independent Contractor",
      avatar: "AT",
      rating: 3,
      testimonial: "I've tried many privacy tools, but Concentria's approach to visualizing data flows and privacy risks is unique. It makes complex privacy concepts accessible to everyone.",
      highlight: "User-friendly privacy tools"
    },
    {
      id: 5,
      name: "Maria Gonzalez",
      role: "Digital Rights Activist",
      company: "Privacy International",
      avatar: "MG",
      rating: 5,
      testimonial: "Concentria doesn't just protect your privacy - it educates you about it. The platform helped me understand my rights and take meaningful action to protect them.",
      highlight: "Privacy education & action"
    },
    {
      id: 6,
      name: "James Park",
      role: "Data Analyst",
      company: "Fortune 500 Company",
      avatar: "JP",
      rating: 4,
      testimonial: "Working in data analytics, I appreciate Concentria's transparent approach. It shows exactly what data is being collected and gives you real control over it.",
      highlight: "Transparent data practices"
    }
  ];

  return (
    <section id="testimonials-section" className="w-full pt-8 pb-20 px-8" style={{ backgroundColor: '#020617' }}>
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.3 }}
          variants={headerVariants}
        >
          <motion.div 
            className="flex justify-center items-center gap-3 mb-4"
            variants={headerVariants}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0, rotate: -180 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{}}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            >
              <HiShieldCheck className="text-[#A781F3] text-3xl" />
            </motion.div>
            <h2 className="text-5xl font-bold text-white">Trusted by Privacy Champions</h2>
          </motion.div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            See how Concentria is helping real people reclaim their digital privacy and take control of their personal data
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.2 }}
          variants={containerVariants}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 group relative overflow-hidden"
              style={{
                background: `linear-gradient(135deg, #A781F308 0%, #020617 50%, #CDB4DB04 100%)`,
                border: `1px solid #A781F318`
              }}
              variants={cardVariants}
              whileHover={{ 
                scale: 1.02,
                y: -5,
                transition: { duration: 0.2 }
              }}
            >
              {/* Background gradient accent */}
              <div className="absolute top-0 right-0 w-20 h-20 opacity-10 group-hover:opacity-20 transition-opacity">
                <div 
                  className="w-full h-full rounded-bl-full"
                  style={{ background: `linear-gradient(135deg, #A781F3, #CDB4DB)` }}
                />
              </div>

              {/* Quote icon */}
              <div className="flex justify-between items-start mb-4">
                <FaQuoteLeft className="text-[#A781F3] text-2xl opacity-70" />
                <div className="flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400 text-sm" />
                  ))}
                </div>
              </div>

              {/* Testimonial text */}
              <p className="text-gray-300 text-base leading-relaxed mb-6 relative z-10">
                "{testimonial.testimonial}"
              </p>

              {/* Highlight badge */}
              <div className="mb-4">
                <span 
                  className="inline-block px-3 py-1 rounded-full text-xs font-semibold text-white"
                  style={{ background: `linear-gradient(135deg, #A781F3, #CDB4DB)` }}
                >
                  {testimonial.highlight}
                </span>
              </div>

              {/* Author info */}
              <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm"
                  style={{ background: `linear-gradient(135deg, #A781F3, #CDB4DB)` }}
                >
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="text-white font-semibold text-sm">{testimonial.name}</h4>
                  <p className="text-gray-400 text-xs">{testimonial.role}</p>
                  <p className="text-[#A781F3] text-xs font-medium">{testimonial.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to action */}
        <motion.div 
          className="text-center mt-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.5 }}
          variants={ctaVariants}
        >
          <motion.div 
            className="inline-block bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm"
            style={{
              background: `linear-gradient(135deg, #A781F320 0%, #020617 50%, #CDB4DB15 100%)`,
              border: `1px solid #A781F330`
            }}
            whileHover={{ 
              scale: 1.02,
              transition: { duration: 0.2 }
            }}
          >
            <h3 className="text-2xl font-bold text-white mb-3">Join Thousands Who've Reclaimed Their Privacy</h3>
            <p className="text-gray-300 mb-6 max-w-2xl">
              Start your journey to digital privacy today. See what data is being collected about you and take control.
            </p>
            <motion.button 
              className="bg-gradient-to-r from-[#A781F3] to-[#CDB4DB] text-white font-bold py-3 px-8 rounded-full hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Get Started Today
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;