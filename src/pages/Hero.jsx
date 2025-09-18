import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Landing.css'
import { RxReload } from "react-icons/rx";

function Hero() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/auth');
  };

  const handleExploreProduct = () => {
    navigate('/auth');
  };

  return (
    <main className="flex flex-col md:flex-row justify-between items-center py-16 gap-8 text-center md:text-left">
      <div className="flex-1 max-w-full md:max-w-[50%] animate-slideUp">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-4 max-w-2xl">Your Digital Life
            Should Be Private
        </h1>
        <p className="text-base sm:text-lg text-gray-400 leading-relaxed mb-8">
          We believe privacy isn't a luxury—it's a fundamental right.
        </p>
        <p className="text-base sm:text-lg text-gray-400 leading-relaxed mb-8">
          Concentria helps real people like you take back control of their digital footprint.
        </p>
        <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4 animate-fadeIn">
          <button 
            onClick={handleGetStarted}
            className="py-4 px-8 rounded-md font-bold cursor-pointer transition-colors border-2 text-[#CDB4DB] border-[#CDB4DB] hover:bg-[#CDB4DB] hover:text-white"
          >
            Get Started
          </button>
          <button 
            onClick={handleExploreProduct}
            className="py-4 px-8 rounded-md font-bold cursor-pointer transition-colors border-2 text-white border-white hover:bg-white hover:text-black"
          >
            Explore Product
          </button>
        </div>
      </div>
      <div className="flex-1 flex justify-center items-center relative min-h-[400px] w-full md:w-auto mt-8 md:mt-0 animate-fadeIn">
        {/* The complex graphic component with a new custom class */}
        <div className="hero-graphic">
          <div className="graphic-container">
            {/* The shapes are now styled with precise CSS in a dedicated file */}
            <div className="graphic-shape magenta-capsule"></div>
            <div className="graphic-shape magenta-star"></div>
            <div className="graphic-shape yellow-circle circle-1"></div>
            <div className="graphic-shape yellow-circle circle-2"></div>
            <div className="graphic-shape yellow-circle circle-3"></div>
            <div className="graphic-shape yellow-circle circle-4"></div>
            <div className="graphic-shape yellow-circle circle-5"></div>
            <div className="graphic-shape yellow-circle circle-6"></div>
            <div className="graphic-shape yellow-capsule capsule-1"></div>
            <div className="graphic-shape yellow-capsule capsule-5"></div>
            {/* <div className="graphic-shape yellow-capsule capsule-6"></div> */}
            
            {/* Curved Arrow over Circle-6 */}
            <div className="graphic-shape curved-arrow-circle6"></div>
            
            <div className="graphic-shape white-rings">
              <div className="custom-ring ring-1"></div>
              <div className="custom-ring ring-2"></div>
              <div className="custom-ring ring-3"></div>
              <div className="custom-ring ring-4"></div>
              <RxReload className="reload-icon-top" size={70}/>
            </div>
            
            {/* Bouncing Ball Animation - SVGator Style */}
            <div className="bouncing-ball"></div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Hero;