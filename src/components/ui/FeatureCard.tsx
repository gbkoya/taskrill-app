// components/ui/FeatureCard.tsx
"use client";

import { motion } from "framer-motion";
import { FadeUp } from "./FadeUp";

interface FeatureCardProps {
  icon: string;
  title: string;
  desc: string;
  delay?: number;
}

export function FeatureCard({ icon, title, desc, delay = 0 }: FeatureCardProps) {
  return (
    <FadeUp delay={delay}>
      <motion.div
        className="p-6 rounded-2xl h-full bg-white border border-gray-200 hover:border-[#0C84FD]/30 transition-all duration-300"
        whileHover={{ y: -4 }}
      >
        <div className="text-4xl mb-4">{icon}</div>
        <h3 className="text-xl font-bold mb-2 text-gray-900">{title}</h3>
        <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
      </motion.div>
    </FadeUp>
  );
}