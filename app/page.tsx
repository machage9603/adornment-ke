"use client";

import { useState, useRef } from "react";
import Header from "./ui/Header";
import Hero from "./ui/Hero";
import CategorySection from "./ui/CategorySection";
import NewArrivalsCarousel from "./ui/NewArrivalsCarousel";
import Footer from "./ui/Footer";
import Cart from "./ui/Cart";
import { useScroll } from "framer-motion";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

export default function Home() {
  const container = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  const [cartItems, setCartItems] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    setCartItems((prevItems) => [...prevItems, product]);
  };

  const removeFromCart = (productId: number) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };

  const checkout = (paymentMethod: string) => {
    console.log(`Checkout completed with ${paymentMethod} payment!`);
    setCartItems([]);
  };

  return (
    <div className="relative">
      <Header cartItemCount={cartItems.length} favoriteItemCount={0} />

      <main
        ref={container}
        className="relative min-h-screen pt-16 pb-16 md:pt-20 md:pb-16"
      >
        {/* Hero Section */}
        <div className="sticky top-0">
          <Hero scrollYProgress={scrollYProgress} />
        </div>

        {/* Category Section */}
        <div className="sticky top-0">
          <CategorySection scrollYProgress={scrollYProgress} />
        </div>

        {/* New Arrivals Section */}
        <div>
          <NewArrivalsCarousel addToCart={addToCart} />
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
