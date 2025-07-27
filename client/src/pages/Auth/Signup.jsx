// Signup page for both Buyer and Seller
// - Mobile-first: all paddings, font sizes, and gaps use Tailwind responsive classes
// - Inputs and buttons are large and easy to tap
// - Layout is single column, max-w-xs for best fit on small screens
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserPlus, Store, Phone, MapPin, Navigation } from "lucide-react";
import Button from "../../components/Button";
import { api } from "../../utils/api";

const Signup = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("buyer");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [locationStatus, setLocationStatus] = useState("idle"); // idle, loading, success, error

  // Get user location on component mount
  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = () => {
    setLocationStatus("loading");
    
    if (!navigator.geolocation) {
      setLocationStatus("error");
      setError("Geolocation is not supported by this browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        setLocationStatus("success");
        setError("");
      },
      (error) => {
        setLocationStatus("error");
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setError("Location access denied. Please enable location services.");
            break;
          case error.POSITION_UNAVAILABLE:
            setError("Location information unavailable.");
            break;
          case error.TIMEOUT:
            setError("Location request timed out.");
            break;
          default:
            setError("An unknown error occurred getting location.");
            break;
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      }
    );
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    
    if (!name) {
      setError("Please enter your name.");
      return;
    }
    if (!/^[0-9]{10}$/.test(phone)) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }
    if (!addressLine1) {
      setError("Please enter your address line 1.");
      return;
    }
    if (!state) {
      setError("Please enter your state.");
      return;
    }
    if (!/^[0-9]{6}$/.test(pincode)) {
      setError("Please enter a valid 6-digit pincode.");
      return;
    }
    if (latitude === null || longitude === null) {
      setError("Please allow location access to continue.");
      return;
    }

    setLoading(true);
    try {
      const data = await api.auth.signup({
        name,
        phoneNumber: phone,
        addressLine1,
        addressLine2,
        state,
        pincode,
        latitude,
        longitude,
        role
      });

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
        setError(data.message || "Signup failed");
      }
    } catch (error) {
      console.error('Signup error:', error);
      setError(error.message || "Network error. Please try again.");
    } finally {
      setLoading(false);
    }
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
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded text-sm">
            {error}
          </div>
        )}
        
        <div className="flex flex-col gap-2">
          <label className="text-gray-700 text-sm flex items-center gap-1">
            <UserPlus size={16} className="text-orange-400" /> Username
          </label>
          <input
            type="text"
            className="p-2 border rounded text-base"
            placeholder="Your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            disabled={loading}
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
            disabled={loading}
          />
        </div>
        
        <div className="flex flex-col gap-2">
          <label className="text-gray-700 text-sm flex items-center gap-1">
            <MapPin size={16} className="text-green-600" /> Address Line 1
          </label>
          <input
            type="text"
            className="p-2 border rounded text-base"
            placeholder="House/Flat number, Street"
            value={addressLine1}
            onChange={(e) => setAddressLine1(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        
        <div className="flex flex-col gap-2">
          <label className="text-gray-700 text-sm flex items-center gap-1">
            <MapPin size={16} className="text-green-600" /> Address Line 2 (Optional)
          </label>
          <input
            type="text"
            className="p-2 border rounded text-base"
            placeholder="Area, Landmark"
            value={addressLine2}
            onChange={(e) => setAddressLine2(e.target.value)}
            disabled={loading}
          />
        </div>
        
        <div className="flex flex-col gap-2">
          <label className="text-gray-700 text-sm flex items-center gap-1">
            <MapPin size={16} className="text-green-600" /> State
          </label>
          <input
            type="text"
            className="p-2 border rounded text-base"
            placeholder="Your state"
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        
        <div className="flex flex-col gap-2">
          <label className="text-gray-700 text-sm flex items-center gap-1">
            <MapPin size={16} className="text-green-600" /> Pincode
          </label>
          <input
            type="text"
            className="p-2 border rounded text-base"
            placeholder="6-digit pincode"
            value={pincode}
            onChange={(e) => setPincode(e.target.value.replace(/[^0-9]/g, ""))}
            maxLength={6}
            required
            disabled={loading}
          />
        </div>
        
        {/* Location Status */}
        <div className="flex flex-col gap-2">
          <label className="text-gray-700 text-sm flex items-center gap-1">
            <Navigation size={16} className="text-purple-600" /> Location
          </label>
          <div className="flex items-center gap-2">
            <div className="flex-1 p-2 border rounded text-base bg-gray-50">
              {locationStatus === "loading" && "Getting location..."}
              {locationStatus === "success" && `📍 ${latitude?.toFixed(6)}, ${longitude?.toFixed(6)}`}
              {locationStatus === "error" && "Location access required"}
              {locationStatus === "idle" && "Requesting location..."}
            </div>
            <button
              type="button"
              onClick={getLocation}
              disabled={loading}
              className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
            >
              <Navigation size={16} />
            </button>
          </div>
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
            <UserPlus size={18} className="text-orange-400" /> Register as Buyer
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
            <Store size={18} className="text-blue-600" /> Register as Seller
          </label>
        </div>
        
        <Button type="submit" className="mt-2 w-full" disabled={loading || locationStatus !== "success"}>
          {loading ? "Creating Account..." : "Sign Up"}
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