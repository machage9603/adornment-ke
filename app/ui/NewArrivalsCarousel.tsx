"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

// Define a type for the product
interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

// Define the props for the component, including the type for addToCart
interface NewArrivalsCarouselProps {
  addToCart: (product: Product) => void;
}

// Example products
const products: Product[] = [
  { id: 1, name: "Aviator Classic", price: 161, image: "/round.png" },
  {
    id: 2,
    name: "Wayfarer Classic",
    price: 155,
    image: "/eye.jpg",
  },
  {
    id: 3,
    name: "Clubmaster Classic",
    price: 161,
    image: "/eyewan.jpg",
  },
];

export default function NewArrivalsCarousel({
  addToCart,
}: NewArrivalsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex + 1) % Math.ceil(products.length / 3)
    ); // Adjust based on how many cards are displayed
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + Math.ceil(products.length / 3)) %
        Math.ceil(products.length / 3)
    );
  };

  return (
    <section className="py-12 bg-white">
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
            <div
              className="flex transition-transform duration-300"
              style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }} // Move according to 3 cards visible
            >
              {products.map((product) => (
                <div key={product.id} className="w-1/3 p-2">
                  <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={400} // Specify the width
                      height={300} // Specify the height
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
