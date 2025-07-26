// IconCard: Reusable icon + label card for dashboards
// - Mobile-first: large padding, font, and rounded corners
// - Button is full width, easy to tap, and readable on small screens
import React from "react";

const IconCard = ({ icon, label, onClick }) => (
  <button
    className="flex items-center gap-4 bg-white rounded-2xl shadow-md p-5 w-full text-lg font-semibold text-gray-900 justify-center active:scale-95 transition focus:outline-none focus:ring-2 focus:ring-orange-300"
    onClick={onClick}
    type="button"
  >
    <span>{icon}</span>
    <span>{label}</span>
  </button>
);

export default IconCard; 