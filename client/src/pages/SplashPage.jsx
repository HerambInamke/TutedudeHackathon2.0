import React from "react";
import { Milk, LogIn, UserPlus, Droplets, Sun, ShoppingCart, Smile } from "lucide-react";
import { useNavigate } from "react-router-dom";

// SplashPage: Chotu color palette, street-vibe, mobile-first
const SplashPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-100 px-4 py-8">
      {/* App Icon and Name */}
      <div className="flex flex-col items-center mt-8 mb-6 flex-1 justify-center">
        <span className="bg-white rounded-2xl shadow-md p-5 mb-6 animate-bounce">
          <Milk className="text-orange-400" size={56} />
        </span>
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2 tracking-tight flex items-center gap-2">
          Chotu <Smile className="inline-block text-emerald-400 animate-spin-slow" size={32} />
        </h1>
        <h2 className="text-base text-gray-500 font-medium mb-4 text-center flex items-center gap-2">
          <Droplets className="text-blue-600" size={20} /> Milk & Essentials, Delivered Daily <Sun className="text-yellow-300" size={20} />
        </h2>
        <div className="flex gap-4 mb-2">
          <span className="bg-orange-100 rounded-2xl p-2 shadow-md"><ShoppingCart className="text-orange-400" size={28} /></span>
        </div>
      </div>
      {/* Call to Action Buttons */}
      <div className="flex flex-col gap-4 w-full max-w-xs mx-auto mb-8">
        <button
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-orange-400 to-yellow-300 hover:from-orange-500 hover:to-yellow-400 text-white font-bold py-4 rounded-2xl shadow-md text-lg transition active:scale-95 focus:outline-none focus:ring-2 focus:ring-orange-300"
          onClick={() => navigate("/login")}
        >
          <LogIn size={22} /> Login
        </button>
        <button
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl shadow-md text-lg transition active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-300"
          onClick={() => navigate("/signup")}
        >
          <UserPlus size={22} /> Sign Up
        </button>
      </div>
      {/* Footer */}
      <footer className="text-xs text-gray-500 text-center pb-2 flex flex-col items-center gap-1">
        <span className="flex items-center gap-1"><Milk className="text-orange-400" size={14} /> &copy; {new Date().getFullYear()} Chotu</span>
        <span className="flex items-center gap-1 text-[10px] text-gray-400">Made for your daily needs <Smile size={12} className="text-emerald-400" /></span>
      </footer>
    </div>
  );
};

export default SplashPage; 