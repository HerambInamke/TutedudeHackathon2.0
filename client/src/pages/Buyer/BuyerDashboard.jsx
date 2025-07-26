// Buyer dashboard with 4 main actions
// - Mobile-first: single column, large IconCards, generous spacing
// - All buttons/cards are touch-friendly and readable on small screens
import React, { useState } from "react";
import { ShoppingCart, List, Users, FileText } from "lucide-react";
import IconCard from "../../components/IconCard";
import Modal from "../../components/Modal";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";

const BuyerDashboard = () => {
  const navigate = useNavigate();
  const [modal, setModal] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header title="Buyer Dashboard" />
      <div className="flex flex-col gap-6 p-4 flex-1">
        <div className="grid grid-cols-1 gap-4">
          <IconCard
            icon={<ShoppingCart size={36} className="text-orange-400" />}
            label="Order Milk"
            onClick={() => navigate("/buyer/order-milk")}
          />
          <IconCard
            icon={<List size={36} className="text-blue-600" />}
            label="My Orders"
            onClick={() => navigate("/buyer/my-orders")}
          />
          <IconCard
            icon={<Users size={36} className="text-emerald-400" />}
            label="Group Buy"
            onClick={() => setModal("group")}
          />
          <IconCard
            icon={<FileText size={36} className="text-orange-400" />}
            label="Today's Accounts"
            onClick={() => setModal("accounts")}
          />
        </div>
      </div>
      {/* Placeholder modals */}
      <Modal
        isOpen={modal === "group"}
        onClose={() => setModal(null)}
        title="Group Buy"
      >
        <div className="text-center text-gray-700 p-2">
          Group Buy feature coming soon!
        </div>
      </Modal>
      <Modal
        isOpen={modal === "accounts"}
        onClose={() => setModal(null)}
        title="Today's Accounts"
      >
        <div className="text-center text-gray-700 p-2">
          Accounts summary coming soon!
        </div>
      </Modal>
    </div>
  );
};

export default BuyerDashboard; 