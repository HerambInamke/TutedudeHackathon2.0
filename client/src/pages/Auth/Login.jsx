// Login page for both Buyer and Seller
// - Mobile-first: all paddings, font sizes, and gaps use Tailwind responsive classes
// - Inputs and buttons are large and easy to tap
// - Layout is single column, max-w-xs for best fit on small screens
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Store, Phone, Lock } from "lucide-react";
import Button from "../../components/Button";

const Login = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("buyer");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Unified login handler for buyers (username + phone) and sellers (phone + password)
  const handleLogin = (e) => {
    e.preventDefault();
    if (role === "buyer") {
      if (!username) {
        alert("Please enter your username.");
        return;
      }
      if (!/^[0-9]{10}$/.test(phone)) {
        alert("Please enter a valid 10-digit phone number.");
        return;
      }
      // Dummy: redirect to buyer dashboard
      navigate("/buyer/dashboard");
    } else {
      if (!/^[0-9]{10}$/.test(phone)) {
        alert("Please enter a valid 10-digit phone number.");
        return;
      }
      if (!password) {
        alert("Please enter your password.");
        return;
      }
      // Dummy: redirect to seller dashboard
      navigate("/seller/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 px-2">
      <form
        className="bg-white rounded-2xl shadow-md p-6 w-full max-w-xs flex flex-col gap-4"
        onSubmit={handleLogin}
      >
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-2 flex items-center justify-center gap-2">
          <Phone className="text-orange-400" /> Login
        </h2>
        {role === "buyer" && (
          <div className="flex flex-col gap-2">
            <label className="text-gray-700 text-sm flex items-center gap-1">
              <User size={16} className="text-orange-400" /> Username
            </label>
            <input
              type="text"
              className="p-2 border rounded text-base"
              placeholder="Your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required={role === "buyer"}
            />
          </div>
        )}
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
        {role === "seller" && (
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
        )}
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
            <User size={18} className="text-orange-400" /> Buyer
          </label>
          <label className="flex items-center gap-1">
            <input
              type="radio"
              name="role"
              value="seller"
              checked={role === "seller"}
              onChange={() => setRole("seller")}
            />
            <Store size={18} className="text-blue-600" /> Seller
          </label>
        </div>
        <Button type="submit" className="mt-2 w-full">
          Login
        </Button>
        <div className="text-center text-sm text-gray-500 mt-2">
          New to Chotu?{" "}
          <span
            className="text-blue-600 underline cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </span>
        </div>
      </form>
    </div>
  );
};

export default Login; 