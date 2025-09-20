import React from 'react';
import Header from './Header';
import Hero from './Hero';
import Content from './Content';
import Testimonials from './Testimonials';
import '../App.css'
// Note: No App.css is needed anymore, styling is inline with Tailwind classes.

function App() {
  return (
    <div className="bg-[#020617] text-[#e0e0e0] min-h-screen w-screen">
       <div className="px-[5vw]">
        <Header />
        <Hero />
      </div>
      <Content />
      <Testimonials />
      
    </div>
  );
}

export default App;