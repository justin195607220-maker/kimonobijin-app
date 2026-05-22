
import React from 'react';

export const SparklesIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M9.9 2.1L12 7l2.1-4.9L19 9l-4.9-2.1L12 2l-2.1 4.9L5 9l4.9-2.1Z" />
    <path d="M2.1 14.1L7 12l-4.9-2.1L2 12l2.1 2.1Z" />
    <path d="M14.1 21.9L12 17l-2.1 4.9L5 15l4.9 2.1L12 22l2.1-4.9L19 15l-4.9 2.1Z" />
  </svg>
);
