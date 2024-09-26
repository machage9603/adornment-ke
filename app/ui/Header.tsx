"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, ShoppingCart } from "lucide-react";
import Link from "next/link";

interface HeaderProps {
  cartItemCount: number;
}

export default function Header({ cartItemCount }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "New & Featured", href: "/" },
    { name: "Men", href: "/men" },
    { name: "Women", href: "/women" },
    { name: "Unisex", href: "/unisex" },
    { name: "Brands", href: "/brands" },
  ];

  return (
    <motion.header
      className={`fixed w-full z-50 transition-colors duration-300 ${
        isScrolled ? "bg-transparent  text-black" : "bg-transparent text-black"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          AdornmentKE
        </Link>
        <nav>
          <ul className="flex space-x-6">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="hover:text-gray-300 transition-colors"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex space-x-4">
          <button aria-label="Search">
            <Search className="w-6 h-6" />
          </button>
          <button aria-label="Cart">
            <ShoppingCart className="w-6 h-6" />
            <span className="ml-1">{cartItemCount}</span>
          </button>
        </div>
      </div>
    </motion.header>
  );
}
