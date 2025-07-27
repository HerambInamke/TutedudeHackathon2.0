import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, ShoppingCart, List, Users, LogOut } from "lucide-react";

const navLinks = [
  { to: "/buyer/dashboard", label: "Dashboard", icon: <Home size={20} /> },
  { to: "/buyer/order-milk", label: "Order Milk", icon: <ShoppingCart size={20} /> },
  { to: "/buyer/my-orders", label: "My Orders", icon: <List size={20} /> },
  { to: "/buyer/suppliers", label: "Suppliers", icon: <Users size={20} /> },
];

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      {/* Mobile hamburger */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-white rounded-full p-2 shadow"
        onClick={() => setOpen(!open)}
        aria-label="Toggle sidebar"
      >
        <span className="block w-6 h-0.5 bg-gray-800 mb-1"></span>
        <span className="block w-6 h-0.5 bg-gray-800 mb-1"></span>
        <span className="block w-6 h-0.5 bg-gray-800"></span>
      </button>
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-40 transform transition-transform duration-200 md:translate-x-0 md:static md:block ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex flex-col h-full p-4 gap-4">
          <div className="text-2xl font-bold text-blue-600 mb-6">Chotu</div>
          <nav className="flex flex-col gap-2 flex-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg text-lg font-medium transition-colors ${location.pathname === link.to ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-gray-100"}`}
                onClick={() => setOpen(false)}
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
          </nav>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-lg text-red-500 hover:bg-red-50">
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>
      {/* Overlay for mobile */}
      {open && <div className="fixed inset-0 bg-black opacity-30 z-30 md:hidden" onClick={() => setOpen(false)}></div>}
    </>
  );
};

export default Sidebar; 