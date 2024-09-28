import { AnimatePresence, motion } from "framer-motion";
import { X, Link } from "lucide-react";

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

  const menuVariants = {
    closed: {
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
    open: {
      opacity: 1,
      transition: {
        duration: 0.3,
      },
    },
  };

  const linkVariants = {
    closed: { y: 20, opacity: 0 },
    open: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.1 + i * 0.1,
      },
    }),
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 backdrop-blur-md"
          initial="closed"
          animate="open"
          exit="closed"
          variants={menuVariants}
          onMouseLeave={onClose} // Close the menu when the mouse leaves
        >
          <div className="h-full flex flex-col items-center justify-center">
            <button
              onClick={onClose} // Close the menu on button click
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <nav>
              <ul className="space-y-6 text-center">
                {navItems.map((item, index) => (
                  <motion.li
                    key={item.name}
                    variants={linkVariants}
                    custom={index}
                  >
                    <Link
                      href={item.href}
                      className="text-4xl font-bold text-white hover:text-gray-300 transition-colors block"
                      onClick={onClose} // Close the menu on link click
                    >
                      {item.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
