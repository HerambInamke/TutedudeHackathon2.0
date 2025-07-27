import React from "react";
import { ShoppingCart, Calendar, Clock, Milk } from "lucide-react";
import Button from "../../components/Button";

const OrderForm = ({ quantity, setQuantity, date, setDate, timeSlot, setTimeSlot, onOrder, selectedSupplier }) => {
  const handleQtyClick = (q) => setQuantity(q);
  const handleSubscribe = (e) => {
    e.preventDefault();
    alert('Subscription feature coming soon!');
  };

  return (
    <form
      className="bg-white rounded-2xl shadow-md p-6 w-full max-w-xs flex flex-col items-center gap-4"
      onSubmit={onOrder}
    >
      <div className="flex flex-col items-center gap-2 w-full">
        <div className="flex items-center justify-center gap-4 w-full mb-2">
          <button type="button" className="bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center text-3xl font-bold" onClick={() => handleQtyClick(Math.max(1, quantity - 1))}>-</button>
          <span className="text-2xl font-bold text-gray-900 w-10 text-center flex items-center justify-center">{quantity}<span className="ml-1 text-base text-gray-500">L</span></span>
          <button type="button" className="bg-orange-300 rounded-full w-10 h-10 flex items-center justify-center text-3xl font-bold text-white" onClick={() => handleQtyClick(quantity + 1)}>+</button>
          <Milk size={32} className="text-blue-400 ml-2" />
        </div>
        {/* Date picker */}
        <div className="w-full flex items-center gap-2 mt-2">
          <Calendar className="text-blue-600" size={24} />
          <input
            type="date"
            className="flex-1 p-2 border rounded-2xl text-base"
            value={date}
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        {/* Time slot dropdown */}
        <div className="w-full flex items-center gap-2 mt-2">
          <Clock className="text-blue-600" size={24} />
          <select
            className="flex-1 p-2 border rounded-2xl text-base"
            value={timeSlot}
            onChange={(e) => setTimeSlot(e.target.value)}
          >
            {["6:00 AM - 7:00 AM", "7:00 AM - 8:00 AM", "8:00 AM - 9:00 AM", "9:00 AM - 10:00 AM"].map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </div>
        <div className="text-gray-700 text-base mt-2">
          <span className="font-bold text-blue-600">₹{selectedSupplier ? selectedSupplier.price * quantity : "-"}</span>
        </div>
        <Button type="submit" className="w-full mt-4 flex items-center justify-center gap-2 text-lg">
          <ShoppingCart size={24} />
        </Button>
        <Button type="button" onClick={handleSubscribe} className="w-full mt-2 flex items-center justify-center gap-2 text-lg bg-emerald-500 hover:bg-emerald-600 text-white">
          Subscribe
        </Button>
      </div>
    </form>
  );
};

export default OrderForm; 