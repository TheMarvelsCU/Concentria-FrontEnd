import React from 'react';
import Header from './Header.jsx';
import Hero from './Hero.jsx';
import '../App.css'

// Note: No App.css is needed anymore, styling is inline with Tailwind classes.

function App() {
  return (
    <div className="bg-[#121212] text-[#e0e0e0] min-h-screen px-[5vw] w-screen">
      <Header />
      <Hero />
    </div>
  );
}

export default App;