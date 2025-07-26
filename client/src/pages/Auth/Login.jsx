import React from "react";

const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login to Chotu</h2>
        <form className="flex flex-col gap-4">
          <input type="email" placeholder="Email" className="p-2 border rounded" />
          <input type="password" placeholder="Password" className="p-2 border rounded" />
          <button type="submit" className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login; 