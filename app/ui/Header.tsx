"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, Search, ShoppingBag, Heart } from "lucide-react";
import Link from "next/link";
import SideMenu from "./SideMenu";

interface HeaderProps {
  cartItemCount: number;
  favoriteItemCount: number;
}

export default function Header({
  cartItemCount,
  favoriteItemCount,
}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const headerVariants = {
    visible: { y: 0, opacity: 1 },
    hidden: { y: -100, opacity: 0 },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.header
            className="fixed w-full z-50 bg-gray bg-opacity-40 backdrop-blur-md"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={headerVariants}
            transition={{ duration: 0.3 }}
          >
            <div className="container mx-auto px-4 py-4 flex justify-between items-center padding-x">
              {/* Menu Icon and Text */}
              <motion.button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white hover:text-gray-200 transition-colors flex items-center"
                aria-label="Toggle menu"
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Menu className="w-6 h-6 mr-2" />
                <span className="text-lg font-bold">Menu</span>
              </motion.button>

              {/* Logo */}
              <motion.div
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.2 }}
              >
                <Link href="/" className="text-2xl font-bold text-white">
                  AdornmentKE
                </Link>
              </motion.div>

              {/* Icons (Search, Favorites, Cart) */}
              <div className="flex space-x-4">
                <motion.button
                  aria-label="Search"
                  className="text-white hover:text-gray-200 transition-colors"
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.3 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Search className="w-6 h-6" />
                </motion.button>

                <motion.button
                  aria-label="Favorites"
                  className="text-white hover:text-gray-200 transition-colors relative"
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.4 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Heart className="w-6 h-6" />
                  {favoriteItemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                      {favoriteItemCount}
                    </span>
                  )}
                </motion.button>

                <motion.button
                  aria-label="Cart"
                  className="text-white hover:text-gray-200 transition-colors relative"
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.5 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ShoppingBag className="w-6 h-6" />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                      {cartItemCount}
                    </span>
                  )}
                </motion.button>
              </div>
            </div>
          </motion.header>
        )}
      </AnimatePresence>

      {/* Side Menu Component */}
      <SideMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}
