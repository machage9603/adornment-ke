"use client";

export default function Hero() {
  return (
    <section className="relative h-screen">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/bg.png"
          alt="Hero background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50" />

      {/* Centered content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-white text-center">
        <h1 className="text-6xl font-bold mb-4">Discover Ray-Ban</h1>
        <p className="text-2xl mb-8">Iconic styles for every personality</p>
        <button className="bg-white text-black px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-200">
          Shop Now
        </button>
      </div>
    </section>
  );
}
