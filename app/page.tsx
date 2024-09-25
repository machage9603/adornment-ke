"use client";

import { useState } from "react";
import Header from "./ui/Header";
import Hero from "./ui/Hero";
import CategorySection from "./ui/CategorySection";
import NewArrivalsCarousel from "./ui/NewArrivalsCarousel";
import Footer from "./ui/Footer";
import Cart from "./ui/Cart";

export default function Home() {
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
    <div className="relative">
      <Header cartItemCount={cartItems.length} />

      <main className="relative h-[300vh] pt-20 pb-16">
        {/* Hero Section */}
        <Hero />

        {/* Category Section */}
        <div className="mt-0">
          <CategorySection />
        </div>

        {/* New Arrivals Section */}
        <div className="mt-0">
          <NewArrivalsCarousel addToCart={addToCart} />
        </div>
      </main>

      {/* Footer */}
      <Footer />

      <Cart
        items={cartItems}
        removeFromCart={removeFromCart}
        checkout={checkout}
      />
    </div>
  );
}
