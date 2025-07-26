import React from "react";

const IconCard = ({ icon, title, description }) => (
  <div className="flex flex-col items-center bg-white p-4 rounded shadow w-48">
    <div className="mb-2 text-3xl">{icon}</div>
    <h2 className="font-bold text-lg mb-1">{title}</h2>
    <p className="text-gray-600 text-sm text-center">{description}</p>
  </div>
);

export default IconCard; 