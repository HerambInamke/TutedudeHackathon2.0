// Header: Optional top bar/header for pages
// - Mobile-first: large font, padding, and rounded corners
// - Header is visually distinct and readable on small screens
import React from "react";

const Header = ({ title }) => (
  <header className="bg-gradient-to-r from-orange-400 to-yellow-300 text-white py-4 shadow-md rounded-b-2xl mb-2">
    <div className="container mx-auto flex justify-center">
      <h1 className="text-xl font-bold tracking-wide">{title}</h1>
    </div>
  </header>
);

export default Header; 