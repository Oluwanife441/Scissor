import React from "react";
import { motion } from "framer-motion";

interface AnimatedLinkProps {
  href: string;
  children: React.ReactNode;
  delay?: number;
}

const AnimatedLink: React.FC<AnimatedLinkProps> = ({
  href,
  children,
  delay = 0,
}) => {
  return (
    <motion.a
      href={href}
      className="block hover:text-blue-300 transition-colors duration-300"
      whileHover={{ x: 5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      aria-label={`Follow me on ${children}`}
      rel="noopener noreferrer"
      target="_blank"
    >
      {children}
    </motion.a>
  );
};

export default AnimatedLink;
