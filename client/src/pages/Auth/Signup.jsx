import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserPlus, Store } from "lucide-react";

const Signup = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("buyer");

  // Dummy signup handler: redirects based on selected role
  const handleSignup = (e) => {
    e.preventDefault();
    if (role === "buyer") {
      navigate("/buyer/dashboard");
    } else {
      navigate("/seller/dashboard");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center flex items-center justify-center gap-2">
          <UserPlus className="inline-block" /> Sign Up for Chotu
        </h2>
        <form className="flex flex-col gap-4" onSubmit={handleSignup}>
          <input type="text" placeholder="Name" className="p-2 border rounded" required />
          <input type="email" placeholder="Email" className="p-2 border rounded" required />
          <input type="password" placeholder="Password" className="p-2 border rounded" required />
          <div className="flex gap-4 items-center justify-center">
            <label className="flex items-center gap-1">
              <input
                type="radio"
                name="role"
                value="buyer"
                checked={role === "buyer"}
                onChange={() => setRole("buyer")}
              />
              <UserPlus size={18} /> Buyer
            </label>
            <label className="flex items-center gap-1">
              <input
                type="radio"
                name="role"
                value="seller"
                checked={role === "seller"}
                onChange={() => setRole("seller")}
              />
              <Store size={18} /> Seller
            </label>
          </div>
          <button type="submit" className="bg-green-500 text-white py-2 rounded hover:bg-green-600 transition">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default Signup; 