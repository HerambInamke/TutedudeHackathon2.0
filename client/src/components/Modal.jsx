// Modal: Reusable modal for confirmations and placeholders
// - Mobile-first: max-w-xs, large padding, and rounded corners
// - Modal is centered, scrollable if content overflows, and readable on small screens
import React from "react";

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-2xl shadow-md p-6 w-full max-w-xs relative">
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-red-500 text-2xl font-bold"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        {title && (
          <div className="text-lg font-bold text-gray-900 mb-2 text-center">
            {title}
          </div>
        )}
        {children}
      </div>
    </div>
  );
};

export default Modal; 