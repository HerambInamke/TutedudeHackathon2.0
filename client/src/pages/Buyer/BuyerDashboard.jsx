// Buyer dashboard with 4 main actions
// - Mobile-first: single column, large IconCards, generous spacing
// - All buttons/cards are touch-friendly and readable on small screens
import React, { useState } from "react";
import { Package2, BadgeCheck, FileText, ShoppingCart, Soup } from "lucide-react";
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
      <Header title=" " />
      <div className="flex flex-col gap-6 p-4 flex-1">
        <div className="grid grid-cols-2 gap-6">
          <IconCard
            icon={<Package2 className="h-16 w-16 text-orange-400" />} // Milk
            label=""
            onClick={() => navigate("/buyer/order-milk")}
          />
          <IconCard
            icon={<BadgeCheck className="h-16 w-16 text-blue-600" />} // My Orders
            label=""
            onClick={() => navigate("/buyer/my-orders")}
          />
          <IconCard
            icon={<FileText className="h-16 w-16 text-orange-400" />} // Today's Accounts
            label=""
            onClick={() => setModal("accounts")}
          />
          <IconCard
            icon={<ShoppingCart className="h-16 w-16 text-emerald-600" />} // Other Products
            label=""
            onClick={() => navigate("/buyer/other-products")}
          />
        </div>
      </div>
      {/* Only keep the accounts modal for now */}
      <Modal
        isOpen={modal === "accounts"}
        onClose={() => setModal(null)}
        title=" "
      >
        <div className="flex flex-col items-center gap-2 p-2">
          <Soup className="h-10 w-10 text-orange-400" />
          <div className="text-gray-900 font-semibold text-center">Accounts summary coming soon!</div>
        </div>
      </Modal>
    </div>
  );
};

export default BuyerDashboard; 