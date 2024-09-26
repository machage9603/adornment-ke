"use client";

import { useState } from "react";

// Define a type for the cart items
interface CartItem {
  id: number;
  name: string;
  price: number;
}

interface CartProps {
  items: CartItem[]; // Array of cart items
  removeFromCart: (id: number) => void; // Function to remove item by ID
  checkout: (paymentMethod: string) => void; // Function to handle checkout with payment method
}

export default function Cart({ items, removeFromCart, checkout }: CartProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false); // State for cart modal open/close
  const [paymentMethod, setPaymentMethod] = useState<string>("card"); // State for payment method

  const total = items.reduce((sum, item) => sum + item.price, 0); // Calculate total price

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        className="bg-black text-white px-4 py-2 rounded-full"
        onClick={() => setIsOpen(true)}
      >
        Cart ({items.length})
      </button>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
            {items.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center mb-2"
              >
                <span>{item.name}</span>
                <span>${item.price}</span>
                <button
                  className="text-red-500"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            ))}
            <div className="mt-4 pt-4 border-t">
              <div className="flex justify-between items-center mb-4">
                <span className="font-bold">Total:</span>
                <span>${total}</span>
              </div>
              <div className="mb-4">
                <label className="block mb-2">Payment Method:</label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full p-2 border rounded"
                >
                  <option value="card">Card</option>
                  <option value="mpesa">M-Pesa</option>
                </select>
              </div>
              {paymentMethod === "card" && (
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Card Number"
                    className="w-full p-2 border rounded mb-2"
                  />
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="w-1/2 p-2 border rounded"
                    />
                    <input
                      type="text"
                      placeholder="CVV"
                      className="w-1/2 p-2 border rounded"
                    />
                  </div>
                </div>
              )}
              {paymentMethod === "mpesa" && (
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="M-Pesa Phone Number"
                    className="w-full p-2 border rounded"
                  />
                </div>
              )}
              <button
                className="w-full bg-black text-white py-2 rounded"
                onClick={() => {
                  checkout(paymentMethod);
                  setIsOpen(false);
                }}
              >
                Checkout
              </button>
            </div>
            <button
              className="mt-4 text-gray-500"
              onClick={() => setIsOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
