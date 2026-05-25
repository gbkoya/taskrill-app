// components/sections/About.tsx
"use client";

import { motion } from "framer-motion";
import { FadeUp } from "../ui/FadeUp";
import { HiCalendar, HiRocketLaunch, HiChartBar, HiTrophy } from "react-icons/hi2";
import { MagneticButton } from "../ui/MagneticButton";

const BRAND_BLUE = "#0C84FD";
const BRAND_YELLOW = "#FED403";
const BRAND_PURPLE = "#9136E9";

const ECOSYSTEM = [

  {
    label: "New Missions Drop Constantly",
    description: "Never run out of challenges to tackle",
    icon: HiRocketLaunch,
    color: BRAND_PURPLE,
  },
  {
    label: "Every Challenge Earns Points",
    description: "Your effort always counts toward something bigger",
    icon: HiChartBar,
    color: BRAND_YELLOW,
  },
  {
    label: "Every Point Pushes You Closer to the Top",
    description: "Climb the ranks with every task you complete",
    icon: HiTrophy,
    color: BRAND_BLUE,
  },
];

export function About() {
  return (
    <section id="about">
      {/* Divider */}
      <div className="px-6 md:px-16 mx-auto">
        <motion.div
          className="h-px w-full"
          style={{ background: `linear-gradient(90deg, transparent, ${BRAND_BLUE}40, transparent)` }}
        />
      </div>

      <section className="py-24 px-6 md:px-16 max-w-7xl mx-auto bg-white transition-colors duration-300">
        <div className="mx-auto">

          {/* ── Top: Two columns (text + ecosystem card) ── */}
          <div className="grid md:grid-cols-2 gap-16 items-start">

            {/* Left: text */}
            <FadeUp>
              <span
                className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase mb-5"
                style={{ color: BRAND_BLUE }}
              >
                Community
              </span>

              <h2 className="font-display text-4xl md:text-5xl font-black mt-2 mb-6 leading-tight text-gray-950 transition-colors duration-300"
               style={{ color: BRAND_BLUE }}>
                The More <br /> You{" "}
                <span
                  style={{
                    background: "linear-gradient(135deg, #052647 0%, #9136E9 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    color: "transparent"
                  }}
                >
                  Play
                </span>
                ,<br />
                The Higher <br /> You{" "}
                <span
                  style={{
                    background: "linear-gradient(135deg, #052647 0%, #9136E9 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    color: "transparent"
                  }}
                >
                  Rank
                </span>
              </h2>

              <p className="text-gray-500 leading-relaxed mb-8 transition-colors duration-300">
                Ready for the challenge? Join the beta and start climbing
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <MagneticButton
                  className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-lg text-sm font-bold text-white transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                  style={{ background: BRAND_BLUE }}
                >
                  Start Playing →
                </MagneticButton>

                <MagneticButton
                  className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-lg text-sm font-semibold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] text-gray-700 border border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300"
                >
                  Download Mobile 📱
                </MagneticButton>
              </div>
            </FadeUp>

            {/* Right: ecosystem card */}
            <FadeUp delay={0.2}>
              <div className="relative rounded-3xl p-8 overflow-hidden bg-gray-50 border border-gray-100 transition-colors duration-300">

                {/* Yellow glow */}
                <motion.div
                  className="absolute top-0 right-0 w-56 h-56 rounded-full pointer-events-none"
                  style={{
                    background: `radial-gradient(circle, rgba(254,212,3,0.12) 0%, transparent 70%)`,
                    filter: "blur(35px)",
                  }}
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 5, repeat: Infinity }}
                />
                {/* Blue glow */}
                <motion.div
                  className="absolute bottom-0 left-0 w-48 h-48 rounded-full pointer-events-none"
                  style={{
                    background: `radial-gradient(circle, rgba(12,132,253,0.1) 0%, transparent 70%)`,
                    filter: "blur(35px)",
                  }}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 7, repeat: Infinity, delay: 1 }}
                />
                {/* Purple glow */}
                <motion.div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full pointer-events-none"
                  style={{
                    background: `radial-gradient(circle, rgba(145,54,233,0.08) 0%, transparent 70%)`,
                    filter: "blur(45px)",
                  }}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 8, repeat: Infinity, delay: 2 }}
                />

                {/* Header */}
                <p className="text-sm font-bold tracking-wide text-gray-700 mb-6 transition-colors duration-300">
                  The season resets every month
                </p>

                {/* Items */}
                <div className="relative space-y-3">
                  {ECOSYSTEM.map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <motion.div
                        key={item.label}
                        className="relative flex items-center gap-4 rounded-2xl p-4 bg-white border border-gray-100 transition-colors duration-300 group"
                        initial={{ x: -30, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
                        whileHover={{ x: 4 }}
                      >
                        {/* Icon badge */}
                        <div
                          className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:scale-110"
                          style={{
                            background: `${item.color}18`,
                            border: `1px solid ${item.color}30`,
                          }}
                        >
                          <Icon
                            className="w-5 h-5"
                            style={{ color: item.color }}
                          />
                        </div>

                        {/* Text */}
                        <div className="flex-1 min-w-0">
                          <div className="text-gray-900 font-semibold text-sm transition-colors duration-300">
                            {item.label}
                          </div>
                          <div className="text-gray-400 text-xs mt-0.5 transition-colors duration-300">
                            {item.description}
                          </div>
                        </div>

                        {/* Right dot */}
                        <div
                          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                          style={{ background: item.color }}
                        />

                        {/* Connector line between cards */}
                        {i < ECOSYSTEM.length - 1 && (
                          <div
                            className="absolute -bottom-3 left-[1.875rem] w-px h-3"
                            style={{ background: `linear-gradient(to bottom, ${item.color}40, transparent)` }}
                          />
                        )}
                      </motion.div>
                    );
                  })}
                </div>

                {/* Bottom tag */}
                <div className="mt-6 flex items-center justify-center gap-2">
                  <div className="h-px flex-1 bg-gray-100 transition-colors duration-300" />
                  <span className="text-xs text-gray-400 font-medium px-2 transition-colors duration-300">
                    Climb the ranks, earn your spot
                  </span>
                  <div className="h-px flex-1 bg-gray-100 transition-colors duration-300" />
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>
    </section>
  );
}