import React from 'react';
import { FiDatabase, FiTrendingUp, FiShield, FiCpu, FiSettings } from 'react-icons/fi';
import ScrollStack, { ScrollStackItem } from './ScrollStack';

const Content = () => {
  const features = [
    {
      icon: FiDatabase,
      title: "Advanced Data Collection",
      description: "Seamlessly gather and organize data from multiple sources with our intuitive interface designed for modern businesses.",
      accentColor: "#A781F3"
    },
    {
      icon: FiTrendingUp,
      title: "Real-time Analytics", 
      description: "Get instant insights with live data processing and dynamic visualization tools that update in real-time.",
      accentColor: "#CDB4DB"
    },
    {
      icon: FiShield,
      title: "Enterprise Security",
      description: "Bank-level encryption and security protocols to keep your data safe, secure, and fully compliant.",
      accentColor: "#9672d1"
    },
    {
      icon: FiCpu,
      title: "AI-Powered Predictions",
      description: "Leverage advanced machine learning algorithms to predict privacy risks and understand how your data might be used by third parties.",
      accentColor: "#A781F3"
    },
    {
      icon: FiSettings,
      title: "Smart Consent Management",
      description: "Take full control of your data sharing with granular consent controls and automated permission management across all platforms.",
      accentColor: "#CDB4DB"
    }
  ];

  return (
    <div id="features-section" className="w-full pt-20 pb-8 px-8" style={{ backgroundColor: '#020617', minHeight: '100vh' }}>
      <div className="text-center mb-16">
        <h2 className="text-5xl font-bold text-white mb-6">Powerful Features</h2>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">Everything you need to transform raw data into actionable insights</p>
      </div>

      <div style={{ width: '100vw', marginLeft: 'calc(50% - 50vw)' }}>
        <ScrollStack className="space-y-8" useWindowScroll={true} itemDistance={140} itemStackDistance={48} itemScale={0.03} stackPosition="18%" scaleEndPosition="10%">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <ScrollStackItem key={index} itemClassName={`bg-white/5 border border-white/10 rounded-3xl backdrop-blur-sm hover:bg-white/10 transition-all duration-300`}>
                <div
                  className="scroll-stack-card-inner relative flex w-full items-start"
                  data-depth={index}
                    style={{
                    background: `linear-gradient(135deg, ${feature.accentColor}08 0%, #020617 50%, ${feature.accentColor}04 100%)`,
                    border: `1px solid ${feature.accentColor}18`
                  }}
                >
                  <div className="icon-col flex-shrink-0 p-6 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-2xl flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${feature.accentColor}30, ${feature.accentColor}60)`, border: `1px solid ${feature.accentColor}50` }}>
                      <Icon className="w-full h-full text-white" />
                    </div>
                  </div>

                  <div className="content-col flex-1 py-6 pr-8">
                    <h3 className="text-3xl font-semibold text-white mb-2">{feature.title}</h3>
                    <p className="text-lg text-gray-300 mb-4 leading-relaxed">{feature.description}</p>
                    <ul className="text-gray-300 mb-6 list-disc list-inside space-y-2" style={{ opacity: 0.9 }}>
                      <li>Fast, reliable ingestion pipelines</li>
                      <li>Schema-free connectors for popular sources</li>
                      <li>One-click exports and scheduled syncs</li>
                    </ul>
                    <div className="flex items-center gap-8 mt-3 text-gray-200">
                      <div>
                        <div className="text-xl font-semibold text-white">99.99%</div>
                        <div className="text-sm text-gray-400">Uptime</div>
                      </div>
                      <div>
                        <div className="text-xl font-semibold text-white">456k</div>
                        <div className="text-sm text-gray-400">Events / min</div>
                      </div>
                      <div>
                        <div className="text-xl font-semibold text-white">SLA</div>
                        <div className="text-sm text-gray-400">Enterprise-ready</div>
                      </div>
                    </div>
                  </div>

                  <div className="number-badge absolute right-6 top-6 text-6xl font-bold opacity-10" style={{ color: feature.accentColor }}>
                    0{index + 1}
                  </div>
                </div>
              </ScrollStackItem>
            );
          })}
        </ScrollStack>
      </div>

      <div className="text-center mt-20">
        <div
          className="bg-white/5 border border-white/10 rounded-3xl p-12 max-w-4xl mx-auto"
          style={{
            background: 'linear-gradient(135deg, #A781F3 0%, #CDB4DB 50%, #9672d1 100%)',
            border: '2px solid rgba(255, 255, 255, 0.2)'
          }}
        >
          <h3 className="text-4xl font-bold text-white mb-6">Ready to Transform Your Data Strategy?</h3>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">Join thousands of companies already using Concentria to make data-driven decisions.</p>
          <button className="bg-white text-[#A781F3] font-bold py-4 px-8 rounded-full text-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105">Start Your Free Trial</button>
        </div>
      </div>
    </div>
  );
};

export default Content;