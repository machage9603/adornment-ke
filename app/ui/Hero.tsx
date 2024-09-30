"use client";

import { motion, useTransform, MotionValue } from "framer-motion";
import Image from "next/image";

interface HeroProps {
  scrollYProgress: MotionValue<number>;
}

export default function Hero({ scrollYProgress }: HeroProps) {
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  return (
    <motion.section style={{ scale }} className="relative h-screen">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/bg.png"
          alt="Hero bg"
          fill
          priority={true}
          style={{ objectFit: "cover" }}
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50" />

      {/* Centered content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-white text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Discover AdornmentKE
        </h1>
        <p className="text-xl md:text-2xl mb-8">
          Iconic styles for every personality
        </p>
        <button className="bg-white text-black bg-opacity-30 hover:bg-gray-200 px-6 md:px-8 py-2 md:py-3 rounded-full text-base md:text-lg font-semibold transition-colors">
          Shop Now
        </button>
      </div>
    </motion.section>
  );
}
