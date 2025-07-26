import React from "react";

const Header = ({ title }) => (
  <header className="bg-blue-600 text-white py-4 shadow">
    <div className="container mx-auto flex justify-center">
      <h1 className="text-2xl font-bold">{title}</h1>
    </div>
  </header>
);

export default Header; 