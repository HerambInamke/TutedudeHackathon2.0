import React from "react";

const Signup = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up for Chotu</h2>
        <form className="flex flex-col gap-4">
          <input type="text" placeholder="Name" className="p-2 border rounded" />
          <input type="email" placeholder="Email" className="p-2 border rounded" />
          <input type="password" placeholder="Password" className="p-2 border rounded" />
          <button type="submit" className="bg-green-500 text-white py-2 rounded hover:bg-green-600 transition">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default Signup; 