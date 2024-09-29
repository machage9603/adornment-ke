"use client";

import { useState } from "react";
import { ShoppingBag, X, CreditCard, Smartphone } from "lucide-react";
import Image from "next/image";

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface CartProps {
  items: CartItem[];
  removeFromCart: (id: number) => void;
  checkout: (paymentMethod: string) => void;
}

export default function Cart({ items, removeFromCart, checkout }: CartProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [paymentMethod, setPaymentMethod] = useState<string>("card");

  const total = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        className="bg-gray-800 text-white p-3 rounded-full shadow-lg hover:bg-gray-700 transition-colors"
        onClick={() => setIsOpen(true)}
      >
        <ShoppingBag className="w-6 h-6" />
        {items.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
            {items.length}
          </span>
        )}
      </button>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-6 space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">Your Bag</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center space-x-4 bg-gray-50 p-3 rounded-lg"
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={60}
                      height={60}
                      className="rounded-md object-cover"
                    />
                    <div className="flex-grow">
                      <h3 className="font-medium text-gray-800">{item.name}</h3>
                      <p className="text-gray-600">${item.price.toFixed(2)}</p>
                    </div>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-bold text-gray-800">Total:</span>
                  <span className="font-bold text-gray-800">
                    ${total.toFixed(2)}
                  </span>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Payment Method:
                    </label>
                    <div className="flex space-x-4">
                      <button
                        className={`flex-1 py-2 px-4 rounded-md flex items-center justify-center space-x-2 ${
                          paymentMethod === "card"
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 text-gray-800"
                        }`}
                        onClick={() => setPaymentMethod("card")}
                      >
                        <CreditCard className="w-5 h-5" />
                        <span>Card</span>
                      </button>
                      <button
                        className={`flex-1 py-2 px-4 rounded-md flex items-center justify-center space-x-2 ${
                          paymentMethod === "mpesa"
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 text-gray-800"
                        }`}
                        onClick={() => setPaymentMethod("mpesa")}
                      >
                        <Smartphone className="w-5 h-5" />
                        <span>M-Pesa</span>
                      </button>
                    </div>
                  </div>
                  {paymentMethod === "card" && (
                    <div className="space-y-2">
                      <input
                        type="text"
                        placeholder="Card Number"
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                      <div className="flex space-x-2">
                        <input
                          type="text"
                          placeholder="MM/YY"
                          className="w-1/2 p-2 border border-gray-300 rounded-md"
                        />
                        <input
                          type="text"
                          placeholder="CVV"
                          className="w-1/2 p-2 border border-gray-300 rounded-md"
                        />
                      </div>
                      <div className="flex space-x-2 justify-center">
                        <Image
                          src="/visa.svg"
                          alt="Visa"
                          width={40}
                          height={25}
                        />
                        <Image
                          src="/mastercard.svg"
                          alt="Mastercard"
                          width={40}
                          height={25}
                        />
                        <Image
                          src="/amex.svg"
                          alt="American Express"
                          width={40}
                          height={25}
                        />
                      </div>
                    </div>
                  )}
                  {paymentMethod === "mpesa" && (
                    <input
                      type="text"
                      placeholder="M-Pesa Phone Number"
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  )}
                  <button
                    className="w-full bg-blue-600 text-white py-3 rounded-md font-medium hover:bg-blue-700 transition-colors"
                    onClick={() => {
                      checkout(paymentMethod);
                      setIsOpen(false);
                    }}
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
