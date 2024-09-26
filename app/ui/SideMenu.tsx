"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { X } from "lucide-react";

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SideMenu({ isOpen, onClose }: SideMenuProps) {
  const navItems = [
    { name: "New & Featured", href: "/" },
    { name: "Men", href: "/men" },
    { name: "Women", href: "/women" },
    { name: "Unisex", href: "/unisex" },
    { name: "Brands", href: "/brands" },
  ];

  return (
    <motion.div
      className={`fixed inset-0 z-50 ${isOpen ? "" : "pointer-events-none"}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: isOpen ? 1 : 0 }}
      transition={{ duration: 0.3 }}
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/placeholder.svg?height=1080&width=1920')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-2xl">
          <div className="h-full flex flex-col justify-center items-center text-white">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
            <nav>
              <ul className="space-y-6 text-center">
                {navItems.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-3xl font-bold hover:text-gray-300 transition-colors block"
                      onClick={onClose}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
