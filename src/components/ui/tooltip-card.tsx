"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const Tooltip = ({
  children,
  content,
  containerClassName,
}: {
  children: React.ReactNode;
  content: React.ReactNode | string;
  containerClassName?: string;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <span
      className={`relative inline-block ${containerClassName || ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-64 rounded-xl border border-[#DDD6CC] bg-[#FFFFFF] p-3 shadow-[0_12px_28px_rgba(0,0,0,0.12)] z-50 pointer-events-none hidden md:block"
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </span>
  );
};
