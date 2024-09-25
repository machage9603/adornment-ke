import { useState } from "react";

export default function CategorySection() {
  return (
    <section className="py-8 bg-gray-100">
      {" "}
      {/* Reduced py-16 to py-8 */}
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-4 text-center">
          Shop by Category
        </h2>{" "}
        {/* Reduced mb-8 to mb-4 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative h-96">
            <img
              src="/men.png"
              alt="Men's Sunglasses"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <h3 className="text-white text-3xl font-bold">Men</h3>
            </div>
          </div>
          <div className="relative h-96">
            <img
              src="/women.png"
              alt="Women's Sunglasses"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <h3 className="text-white text-3xl font-bold">Women</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
