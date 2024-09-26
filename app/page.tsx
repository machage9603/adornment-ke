"use client";

import { useState, useRef } from "react";
import Header from "./ui/Header";
import Hero from "./ui/Hero";
import CategorySection from "./ui/CategorySection";
import NewArrivalsCarousel from "./ui/NewArrivalsCarousel";
import Footer from "./ui/Footer";
import Cart from "./ui/Cart";
import { useScroll } from "framer-motion";

// Define a type for the product structure
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

  const [cartItems, setCartItems] = useState<Product[]>([]); // Specify the type for cartItems

  const addToCart = (product: Product) => {
    setCartItems((prevItems) => [...prevItems, product]); // Use functional update for state
  };

  const removeFromCart = (productId: number) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    ); // Use functional update
  };

  const checkout = (paymentMethod: string) => {
    console.log(`Checkout completed with ${paymentMethod} payment!`);
    setCartItems([]); // Clear cart after checkout
  };

  return (
    <div className="relative">
      <Header cartItemCount={cartItems.length} />

      <main ref={container} className="relative h-[300vh] pt-20 pb-16">
        {/* Hero Section */}
        <div className="sticky top-0 mt-0">
          <Hero scrollYProgress={scrollYProgress} />
        </div>

        {/* Category Section */}
        <div className="sticky top-0 mt-0">
          <CategorySection scrollYProgress={scrollYProgress} />
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
