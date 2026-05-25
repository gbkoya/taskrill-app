// components/sections/Features.tsx
"use client";

import { motion } from "framer-motion";
import { FadeUp } from "../ui/FadeUp";
import {
  HiOutlineTrophy,
  // HiOutlineLightningBolt,
  HiOutlineGift,
  HiOutlineUsers,
} from "react-icons/hi2";
import Image from "next/image";
import { HiOutlineLightningBolt } from "react-icons/hi";

const BRAND_BLUE = "#0C84FD";
const BRAND_YELLOW = "#FED403";

const features = [
  {
    icon: HiOutlineTrophy,
    title: "Monthly Leaderboards",
    desc: "Fight for a spot in the Top 20.",
    accent: BRAND_BLUE,
  },
  {
    icon: HiOutlineLightningBolt,
    title: "Fast Challenges",
    desc: "Quick games and tasks you can complete anytime.",
    accent: BRAND_YELLOW,
  },
  {
    icon: HiOutlineGift,
    title: "Real Rewards",
    desc: "Earn tokens that unlock prizes and perks.",
    accent: BRAND_BLUE,
  },
  {
    icon: HiOutlineUsers,
    title: "Social Competition",
    desc: "Play with friends. Rank higher together.",
    accent: BRAND_YELLOW,
  },
];

export function Features() {
  return (
    <section
      className="py-24 px-6 md:px-16 bg-gray-50 transition-colors duration-300 relative"
      id="features"
    >
      <div className="mx-auto max-w-7xl">
        {/* Top Section - About Ravi */}
        <div className="text-center mb-16 relative">
          <FadeUp>
            <span
              className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase mb-4"
              style={{ color: BRAND_BLUE }}
            >
              <span className="w-4 h-px inline-block" style={{ background: BRAND_BLUE }} />
              About Ravi
              <span className="w-4 h-px inline-block" style={{ background: BRAND_BLUE }} />
            </span>
          </FadeUp>

          <FadeUp>
            <h2 className="font-display text-4xl md:text-5xl font-black mt-2 text-gray-950 transition-colors duration-300">
              <span style={{ color: BRAND_BLUE }}>Meet</span>{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #052647 0%, #9136E9 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  color: "transparent"
                }}
              >
                Ravi
              </span>
            </h2>
          </FadeUp>

          <FadeUp>
            <p className="mt-4 text-gray-500 max-w-xl mx-auto text-base leading-relaxed transition-colors duration-300">
              His uncle Layu designed the Taskrill universe. Join Ravi life events, play games, get bonus rewards, and monthly leaderboard challenges! <br />
              Become a Taskrill Champion!
            </p>
          </FadeUp>

          {/* Image positioned absolutely on the right */}
          <motion.div
            className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.7 }}
            animate={{ y: [0, -15, 0] }}
          >
            <Image
              src="/images/run (2).png"
              alt="Ravi"
              width={140}
              height={140}
              className="w-32 h-32 lg:w-40 lg:h-40 opacity-80"
            />
          </motion.div>

          {/* Mobile version - centered below text */}
          <motion.div
            className="lg:hidden flex justify-center mt-8 pointer-events-none"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.7 }}
            animate={{ y: [0, -8, 0] }}
          >
            <Image
              src="/images/run (2).png"
              alt="Ravi"
              width={100}
              height={100}
              className="w-24 h-24 opacity-80"
            />
          </motion.div>
        </div>

        {/* Why is everyone joining? Section */}
        <div className="text-center mb-12">
          <FadeUp>
            <h2 className="font-display text-3xl md:text-4xl font-black text-gray-950 transition-colors duration-300"
              style={{ color: BRAND_BLUE }}>
              Why is <span style={{ color: BRAND_BLUE }}>everyone</span> joining?
            </h2>
          </FadeUp>
        </div>

        {/* Feature Cards - Left aligned */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-5">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.title}
                className="group relative rounded-2xl p-6 bg-white border border-gray-100 overflow-hidden transition-colors duration-300 hover:border-gray-200 cursor-default text-left"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4 }}
              >
                {/* Corner glow on hover */}
                <div
                  className="absolute -top-8 -right-8 w-24 h-24 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `${f.accent}30` }}
                />

                {/* Icon - Left aligned */}
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background: `${f.accent}15`,
                    border: `1px solid ${f.accent}30`,
                  }}
                >
                  <Icon className="w-5 h-5" style={{ color: f.accent }} />
                </div>

                {/* Text - Left aligned */}
                <h3 className="font-display text-lg font-black text-gray-900 mb-2 transition-colors duration-300">
                  {f.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {f.desc}
                </p>

                {/* Bottom accent line */}
                <div
                  className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500 rounded-b-2xl"
                  style={{ background: `linear-gradient(90deg, ${f.accent}, transparent)` }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}