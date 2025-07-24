import React from "react";
import { motion } from "framer-motion";
import { fadeInOpacity } from "../../../constants/animation";

export function AnimatedUI({
  children,
  isHeader,
}: {
  children: React.ReactNode;
  isHeader: boolean;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={fadeInOpacity}
      style={isHeader ? { zIndex: 2 } : undefined}
    >
      {children}
    </motion.div>
  );
}
