// Buyer dashboard with 4 main actions
// - Mobile-first: single column, large IconCards, generous spacing
// - All buttons/cards are touch-friendly and readable on small screens
import React, { useState } from "react";
import { Package2, BadgeCheck, Users2, FileText } from "lucide-react";
import IconCard from "../../components/IconCard";
import Modal from "../../components/Modal";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";

// Buyer dashboard with 4 main actions
const BuyerDashboard = () => {
  const navigate = useNavigate();
  const [modal, setModal] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header title="Buyer Dashboard" />
      <div className="flex flex-col gap-6 p-4 flex-1">
        <div className="grid grid-cols-1 gap-4">
          <IconCard
            icon={<Package2 className="h-9 w-9 text-orange-400" />}
            label="Order Milk"
            onClick={() => navigate("/buyer/order-milk")}
          />
          <IconCard
            icon={<BadgeCheck className="h-9 w-9 text-blue-600" />}
            label="My Orders"
            onClick={() => navigate("/buyer/my-orders")}
          />
          {/* <IconCard
            icon={<Users2 className="h-9 w-9 text-emerald-400" />}
            label="Group Buy"
            onClick={() => setModal("group")}
          /> */}
          <IconCard
            icon={<FileText className="h-9 w-9 text-orange-400" />}
            label="Today's Accounts"
            onClick={() => setModal("accounts")}
          />
          <IconCard
            icon={<Package2 className="h-9 w-9 text-emerald-600" />}
            label="Order Other Products"
            onClick={() => navigate("/buyer/other-products")}
          />
        </div>
      </div>
      {/* Placeholder modals */}
      {/*
      <Modal
        isOpen={modal === "group"}
        onClose={() => setModal(null)}
        title="Group Buy"
      >
        <div className="text-center text-gray-700 p-2">
          Group Buy feature coming soon!
        </div>
      </Modal>
      */}
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