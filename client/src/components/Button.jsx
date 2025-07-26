// Button: Reusable button with Chotu color palette
// - Mobile-first: large padding, font, and rounded corners
// - Button is full width, easy to tap, and readable on small screens
import React from "react";

const Button = ({ children, className = "", ...props }) => (
  <button
    className={`bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded-2xl shadow-md transition active:scale-95 focus:outline-none focus:ring-2 focus:ring-orange-300 ${className}`}
    {...props}
  >
    {children}
  </button>
);

export default Button; 