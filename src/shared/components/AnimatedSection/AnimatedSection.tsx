import React from "react";
import { motion } from "framer-motion";
import { fadeInLeft } from "../../constants";

interface AnimatedSectionProps {
  children: React.ReactNode;
  index: number;
}

export function AnimatedSection({ children, index }: AnimatedSectionProps) {
  return (
    <motion.div
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeInLeft}
      style={{ minHeight: 1 }}
    >
      {children}
    </motion.div>
  );
}
