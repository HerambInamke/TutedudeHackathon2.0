// Group Buy page
// - Mobile-first: single column, large cards, touch-friendly
// - Dummy data for group buys, join button, and status
import React, { useState } from "react";
import { Users2, Package2, BadgeCheck, Loader2 } from "lucide-react";
import Header from "../../components/Header";
import Button from "../../components/Button";

const DUMMY_GROUP_BUYS = [
  {
    id: 1,
    product: "Milk (10L)",
    price: 450,
    participants: 4,
    status: "Open",
  },
  {
    id: 2,
    product: "Paneer (2kg)",
    price: 600,
    participants: 2,
    status: "Closed",
  },
];

const GroupBuy = () => {
  const [groupBuys, setGroupBuys] = useState(DUMMY_GROUP_BUYS);
  const [joined, setJoined] = useState([]);

  const handleJoin = (id) => {
    setJoined((prev) => [...prev, id]);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header title="Group Buy" />
      <div className="flex-1 p-4 flex flex-col gap-4">
        {groupBuys.map((gb) => (
          <div
            key={gb.id}
            className="bg-white rounded-2xl shadow-md p-4 flex flex-col gap-2"
          >
            <div className="flex items-center gap-2 mb-1">
              <Package2 className="h-6 w-6 text-orange-400" />
              <span className="font-bold text-gray-900 text-lg">{gb.product}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <Users2 className="h-5 w-5 text-blue-600" />
              <span className="text-sm">Participants: {gb.participants}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <span className="text-sm">Price: <span className="font-bold text-blue-600">₹{gb.price}</span></span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              {gb.status === "Open" ? (
                <BadgeCheck className="h-5 w-5 text-emerald-500" />
              ) : (
                <Loader2 className="h-5 w-5 text-orange-400" />
              )}
              <span className={`text-xs font-bold ${gb.status === "Open" ? "text-emerald-500" : "text-orange-400"}`}>{gb.status}</span>
            </div>
            {gb.status === "Open" && !joined.includes(gb.id) && (
              <Button className="mt-2 w-full" onClick={() => handleJoin(gb.id)}>
                Join Group Buy
              </Button>
            )}
            {joined.includes(gb.id) && (
              <div className="text-emerald-500 text-center font-semibold mt-2">You joined!</div>
            )}
          </div>
        ))}
        {groupBuys.length === 0 && (
          <div className="text-center text-gray-500 py-8">No group buys available.</div>
        )}
      </div>
    </div>
  );
};

export default GroupBuy; 