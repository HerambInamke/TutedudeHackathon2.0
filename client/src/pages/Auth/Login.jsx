// Login page for both Buyer and Seller
// - Mobile-first: all paddings, font sizes, and gaps use Tailwind responsive classes
// - Inputs and buttons are large and easy to tap
// - Layout is single column, max-w-xs for best fit on small screens
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Store, Phone } from "lucide-react";
import Button from "../../components/Button";
import { api } from "../../utils/api";

const Login = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("buyer");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    
    if (!/^[0-9]{10}$/.test(phone)) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }

    setLoading(true);
    try {
      const data = await api.auth.login(phone);

      if (data.success) {
        // Store user data in localStorage
        localStorage.setItem('user', JSON.stringify(data.data));
        
        // Redirect based on user role
        if (data.data.role === "buyer") {
          navigate("/buyer/dashboard");
        } else {
          navigate("/seller/dashboard");
        }
      } else {
        setError(data.message || "Login failed");
      }
    } catch (error) {
      console.error('Login error:', error);
      setError(error.message || "Network error. Please try again.");
    } finally {
      setLoading(false);
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
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded text-sm">
            {error}
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
            disabled={loading}
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
              disabled={loading}
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
              disabled={loading}
            />
            <Store size={18} className="text-blue-600" /> Seller
          </label>
        </div>
        
        <Button type="submit" className="mt-2 w-full" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
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