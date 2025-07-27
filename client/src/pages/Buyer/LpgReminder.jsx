import React from "react";
import { Flame, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function LpgReminder() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="flex items-center p-4">
        <button onClick={() => navigate(-1)} className="mr-2">
          <ArrowLeft size={28} className="text-orange-400" />
        </button>
        <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2"><Flame className="text-red-500" /> LPG Reminder</h1>
      </div>
      <div className="flex flex-col gap-4 p-4">
        <div className="bg-white rounded-2xl shadow-md p-4 flex items-center gap-4">
          <Flame size={36} className="text-red-500" />
          <div className="font-bold text-lg text-gray-900">Get reminders to book your LPG cylinder on time!</div>
        </div>
        <div className="text-gray-600 text-base mt-2">Never run out of gas. We'll remind you when it's time to book your next cylinder.</div>
      </div>
    </div>
  );
} 