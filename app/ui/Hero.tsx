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
          layout="fill"
          objectFit="cover"
          priority={true}
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50" />

      {/* Centered content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-white text-center">
        <h1 className="text-6xl font-bold mb-4">Discover Ray-Ban</h1>
        <p className="text-2xl mb-8">Iconic styles for every personality</p>
        <button className="bg-white text-black px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-200 transition-colors">
          Shop Now
        </button>
      </div>
    </motion.section>
  );
}
