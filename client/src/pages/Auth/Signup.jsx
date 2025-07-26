// Signup page for both Buyer and Seller
// - Mobile-first: all paddings, font sizes, and gaps use Tailwind responsive classes
// - Inputs and buttons are large and easy to tap
// - Layout is single column, max-w-xs for best fit on small screens
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserPlus, Store, Phone, Lock } from "lucide-react";
import Button from "../../components/Button";

const Signup = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("buyer");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  // Dummy signup handler: just redirects to login or dashboard
  const handleSignup = (e) => {
    e.preventDefault();
    if (!name) {
      alert("Please enter your name.");
      return;
    }
    if (!/^[0-9]{10}$/.test(phone)) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }
    if (!password || password.length < 4) {
      alert("Password must be at least 4 characters.");
      return;
    }
    if (password !== confirm) {
      alert("Passwords do not match.");
      return;
    }
    // Dummy: redirect to login
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 px-2">
      <form
        className="bg-white rounded-2xl shadow-md p-6 w-full max-w-xs flex flex-col gap-4"
        onSubmit={handleSignup}
      >
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-2 flex items-center justify-center gap-2">
          <UserPlus className="text-blue-600" /> Sign Up
        </h2>
        <div className="flex flex-col gap-2">
          <label className="text-gray-700 text-sm flex items-center gap-1">
            <UserPlus size={16} className="text-orange-400" /> Name
          </label>
          <input
            type="text"
            className="p-2 border rounded text-base"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-gray-700 text-sm flex items-center gap-1">
            <Phone size={16} className="text-blue-600" /> Phone Number
          </label>
          <input
            type="tel"
            className="p-2 border rounded text-base"
            placeholder="10-digit phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ""))}
            maxLength={10}
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-gray-700 text-sm flex items-center gap-1">
            <Lock size={16} className="text-blue-600" /> Password
          </label>
          <input
            type="password"
            className="p-2 border rounded text-base"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-gray-700 text-sm flex items-center gap-1">
            <Lock size={16} className="text-orange-400" /> Confirm Password
          </label>
          <input
            type="password"
            className="p-2 border rounded text-base"
            placeholder="Confirm password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
          />
        </div>
        {/* Role selection */}
        <div className="flex gap-4 justify-center mt-2">
          <label className="flex items-center gap-1">
            <input
              type="radio"
              name="role"
              value="buyer"
              checked={role === "buyer"}
              onChange={() => setRole("buyer")}
            />
            <UserPlus size={18} className="text-orange-400" /> Register as Buyer
          </label>
          <label className="flex items-center gap-1">
            <input
              type="radio"
              name="role"
              value="seller"
              checked={role === "seller"}
              onChange={() => setRole("seller")}
            />
            <Store size={18} className="text-blue-600" /> Register as Seller
          </label>
        </div>
        <Button type="submit" className="mt-2 w-full">
          Sign Up
        </Button>
        <div className="text-center text-sm text-gray-500 mt-2">
          Already have an account?{" "}
          <span
            className="text-blue-600 underline cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </div>
      </form>
    </div>
  );
};

export default Signup; 