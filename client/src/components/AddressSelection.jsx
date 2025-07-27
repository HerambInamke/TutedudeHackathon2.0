import React, { useState } from "react";
import Button from "./Button";

const AddressSelection = ({ initialAddress = "", initialPhone = "", onSubmit }) => {
  const [address, setAddress] = useState(initialAddress);
  const [phone, setPhone] = useState(initialPhone);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!address.trim()) {
      alert("Please enter your address.");
      return;
    }
    if (!/^\d{10}$/.test(phone)) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }
    onSubmit({ address, phone });
  };

  return (
    <form className="flex flex-col gap-4 p-4" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-2">
        <label className="text-gray-700 text-sm">Delivery Address</label>
        <textarea
          className="p-2 border rounded text-base resize-none"
          rows={3}
          placeholder="Enter your address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-gray-700 text-sm">Phone Number</label>
        <input
          type="tel"
          className="p-2 border rounded text-base"
          placeholder="10-digit phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ""))}
          maxLength={10}
          required
        />
      </div>
      <Button type="submit" className="w-full mt-2">Save Address</Button>
    </form>
  );
};

export default AddressSelection; 