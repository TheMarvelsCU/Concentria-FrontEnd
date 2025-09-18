import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaLongArrowAltRight } from "react-icons/fa";

function Header() {
  const navigate = useNavigate();

  const handleAuthNavigation = () => {
    navigate('/auth');
  };

  return (
    <header className="flex flex-col md:flex-row justify-between items-center py-6 md:py-8 gap-4">
      <div className="text-2xl font-bold">
        C<span className="text-[#A781F3]">oncentria</span>
      </div>
      <nav className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
        <ul className="hidden md:flex list-none p-0 m-0 gap-8">
          <li><a href="#" className="text-white text-base no-underline hover:text-[#CDB4DB]">Home</a></li>
          <li><a href="#" className="text-white text-base no-underline hover:text-[#CDB4DB]">Services</a></li>
          <li><a href="#" className="text-white text-base no-underline hover:text-[#CDB4DB]">Pricing</a></li>
          <li><a href="#" className="text-white text-base no-underline hover:text-[#CDB4DB]">Blog</a></li>
        </ul>
        <div className="flex gap-3">
          <button 
            onClick={handleAuthNavigation}
            className="bg-[#A781F3] text-white font-bold py-3 px-6 rounded-md cursor-pointer hover:bg-[#9672d1] transition-colors flex items-center justify-center gap-2"
          >
            Start Protecting
            <FaLongArrowAltRight />
          </button>
        </div>
      </nav>
    </header>
  );
}

export default Header;