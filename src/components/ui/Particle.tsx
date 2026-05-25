"use client";

import { motion } from "framer-motion";


const BRAND_BLUE = "#0C84FD";

export function Particle({ delay, x, y, size, duration }: {
  delay: number;
  x: string;
  y: string;
  size: number;
  duration: number;
}) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{ left: x, top: y, width: size, height: size, background: BRAND_BLUE, opacity: 0.15 }}
      animate={{ y: [0, -30, 0], opacity: [0.1, 0.25, 0.1] }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}