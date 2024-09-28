"use client";

import { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useTransform,
  MotionValue,
} from "framer-motion";
import Image from "next/image";

interface CategoryProps {
  scrollYProgress: MotionValue<number>;
}

const categories = [
  { name: "Men", image: "/men.jpg", hoverImage: "/menh.jpg" },
  { name: "Women", image: "/women.jpg", hoverImage: "/womenh.jpg" },
  { name: "Unisex", image: "/unisex.jpg", hoverImage: "/unisexh.jpg" },
];

export default function CategorySection({ scrollYProgress }: CategoryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % categories.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <motion.section
      style={{ scale }}
      className="relative h-screen bg-gray-100 overflow-hidden"
    >
      <AnimatePresence initial={false}>
        <motion.div
          key={currentIndex}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <div
            className="relative h-full w-full"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <Image
              src={
                isHovered
                  ? categories[currentIndex].hoverImage
                  : categories[currentIndex].image
              }
              alt={`${categories[currentIndex].name}'s Sunglasses`}
              layout="fill"
              objectFit="cover"
              priority
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <h3 className="text-white text-5xl font-bold">
                {categories[currentIndex].name}
              </h3>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex space-x-2">
          {categories.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full ${
                index === currentIndex ? "bg-white" : "bg-gray-400"
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
}
