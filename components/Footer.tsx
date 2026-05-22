
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full mt-12 py-4">
      <div className="container mx-auto text-center text-rose-600 text-sm">
        <p>&copy; {new Date().getFullYear()} 着物美人. All Rights Reserved.</p>
      </div>
    </footer>
  );
};
