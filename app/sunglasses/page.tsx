"use client";

import { useState } from "react";
import Header from "../ui/Header";
import Footer from "../ui/Footer";
import Cart from "../ui/Cart";

const sunglasses = [
  { id: 1, name: "Aviator Classic", price: 161, image: "/aviator-classic.jpg" },
  {
    id: 2,
    name: "Wayfarer Classic",
    price: 155,
    image: "/wayfarer-classic.jpg",
  },
  {
    id: 3,
    name: "Clubmaster Classic",
    price: 161,
    image: "/clubmaster-classic.jpg",
  },
  { id: 4, name: "Round Metal", price: 161, image: "/round-metal.jpg" },
];

export default function Sunglasses() {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter((item) => item.id !== productId));
  };

  const checkout = (paymentMethod) => {
    console.log(`Checkout completed with ${paymentMethod} payment!`);
    setCartItems([]);
  };

  return (
    <div className="min-h-screen">
      <Header cartItemCount={cartItems.length} />
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8 text-center">Sunglasses</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {sunglasses.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-4">${product.price}</p>
                  <button
                    onClick={() => addToCart(product)}
                    className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
      <Cart
        items={cartItems}
        removeFromCart={removeFromCart}
        checkout={checkout}
      />
    </div>
  );
}
