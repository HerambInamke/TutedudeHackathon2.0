// IconCard: Reusable icon + label card for dashboards
// - Mobile-first: large padding, font, and rounded corners
// - Button is full width, easy to tap, and readable on small screens
import React from "react";

const IconCard = ({ icon, onClick }) => (
  <button
    className="flex items-center justify-center bg-white rounded-2xl shadow-md p-6 w-full h-32 active:scale-95 transition focus:outline-none focus:ring-2 focus:ring-orange-300"
    onClick={onClick}
    type="button"
  >
    <span className="flex items-center justify-center w-full h-full">{icon}</span>
  </button>
);

export default IconCard; 