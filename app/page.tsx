"use client";

import { useState, useEffect, useRef } from "react";
import Header from "./ui/Header";
import Hero from "./ui/Hero";
import CategorySection from "./ui/CategorySection";
import NewArrivalsCarousel from "./ui/NewArrivalsCarousel";
import Footer from "./ui/Footer";
import Cart from "./ui/Cart";

export default function Home() {
  const [cartItems, setCartItems] = useState([]);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const sectionRefs = {
    hero: useRef<HTMLDivElement>(null),
    category: useRef<HTMLDivElement>(null),
    newArrivals: useRef<HTMLDivElement>(null),
    footer: useRef<HTMLDivElement>(null),
  };

  // Intersection Observer logic
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, options);

    // Observe all sections
    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      Object.values(sectionRefs).forEach((ref) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, []);

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

      <div
        id="hero"
        ref={sectionRefs.hero}
        className={`transition-opacity duration-1000 ${
          activeSection === "hero" ? "opacity-100" : "opacity-0"
        }`}
      >
        <Hero />
      </div>

      <div
        id="category"
        ref={sectionRefs.category}
        className={`transition-opacity duration-1000 ${
          activeSection === "category" ? "opacity-100" : "opacity-0"
        }`}
      >
        <CategorySection />
      </div>

      <div
        id="newArrivals"
        ref={sectionRefs.newArrivals}
        className={`transition-opacity duration-1000 ${
          activeSection === "newArrivals" ? "opacity-100" : "opacity-0"
        }`}
      >
        <NewArrivalsCarousel addToCart={addToCart} />
      </div>

      <div
        id="footer"
        ref={sectionRefs.footer}
        className={`transition-opacity duration-1000 ${
          activeSection === "footer" ? "opacity-100" : "opacity-0"
        }`}
      >
        <Footer />
      </div>

      <Cart
        items={cartItems}
        removeFromCart={removeFromCart}
        checkout={checkout}
      />
    </div>
  );
}
