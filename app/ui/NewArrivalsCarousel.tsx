"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const products = [
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

export default function NewArrivalsCarousel({ addToCart }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + products.length) % products.length
    );
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-8 text-center">New Arrivals</h2>
        <div className="relative">
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
          <div className="overflow-hidden">
            <motion.div
              className="flex"
              animate={{ x: `-${currentIndex * 100}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {products.map((product) => (
                <div key={product.id} className="w-full flex-shrink-0">
                  <div className="max-w-sm mx-auto bg-white rounded-lg shadow-md overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-64 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-xl font-semibold mb-2">
                        {product.name}
                      </h3>
                      <p className="text-gray-600 mb-4">${product.price}</p>
                      <button
                        onClick={() => addToCart(product)}
                        className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition-colors"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
