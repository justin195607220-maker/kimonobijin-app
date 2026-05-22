import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white/80 backdrop-blur-sm shadow-md sticky top-0 z-10 border-b border-rose-100">
      <div className="container mx-auto px-4 py-4 flex items-center justify-center">
        <span role="img" aria-label="cherry blossom" className="text-3xl mr-3">🌸</span>
        <h1 className="text-3xl text-rose-800 tracking-wider font-brush">
          着物美人
        </h1>
         <span role="img" aria-label="cherry blossom" className="text-3xl ml-3">🌸</span>
      </div>
    </header>
  );
};