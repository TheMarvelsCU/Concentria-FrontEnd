import React from 'react';
import Header from './Header.jsx';
import Hero from './Hero.jsx';
import Content from './Content.jsx';
import Testimonials from './Testimonials.jsx';
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