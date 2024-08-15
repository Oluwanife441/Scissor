import React, { useRef } from "react";
import { motion } from "framer-motion";
import useInView from "@/hooks/use-inView";
import AnimatedLink from "./animatedLink";
const Footer: React.FC = () => {
  const footerRef = useRef<HTMLElement>(null);
  const isInView = useInView(footerRef, { threshold: 0.1 });

  const platforms = [
    { name: "Twitter", url: "https://twitter.com/yourprofile" },
    { name: "LinkedIn", url: "https://linkedin.com/in/yourprofile" },
    { name: "GitHub", url: "https://github.com/yourprofile" },
    { name: "Dribbble", url: "https://dribbble.com/yourprofile" },
  ];

  const quickLinks = [
    { name: "Portfolio", url: "/portfolio" },
    { name: "Services", url: "/services" },
    { name: "About", url: "/about" },
    { name: "Blog", url: "/blog" },
  ];

  return (
    <footer
      ref={footerRef}
      className="relative overflow-hidden bg-gradient-to-r from-black to-gray-800 text-white py-16"
    >
      <div className="container mx-auto px-4">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">Get in Touch</h3>
            <p className="text-gray-300">
              Let's create something amazing together!
            </p>
            <motion.button
              className="px-6 py-2 bg-blue-600 rounded-full hover:bg-blue-700 transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Me
            </motion.button>
          </div>
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((item, index) => (
                <li key={item.name}>
                  <AnimatedLink href={item.url} delay={index * 0.1}>
                    {item.name}
                  </AnimatedLink>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">Follow Me</h3>
            <div className="space-y-2">
              {platforms.map((platform, index) => (
                <AnimatedLink
                  key={platform.name}
                  href={platform.url}
                  delay={index * 0.1}
                >
                  {platform.name}
                </AnimatedLink>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
      {/* <p>
        Pages may taae time to load due to database connections, but note that
        all works fine (Kindly reload if experiencing page connections issues)
        With love ❤
      </p> */}
      <motion.div
        className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-blue-600"
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      />
    </footer>
  );
};

export default Footer;
