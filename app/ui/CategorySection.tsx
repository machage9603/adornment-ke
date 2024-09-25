"use client";

import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

export default function CategorySection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <motion.section
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="py-16 bg-gray-100"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-8 text-center">
          Shop by Category
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div variants={itemVariants} className="relative h-96">
            <img
              src="/men-category.jpg"
              alt="Men's Sunglasses"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <h3 className="text-white text-3xl font-bold">Men</h3>
            </div>
          </motion.div>
          <motion.div variants={itemVariants} className="relative h-96">
            <img
              src="/women-category.jpg"
              alt="Women's Sunglasses"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <h3 className="text-white text-3xl font-bold">Women</h3>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
