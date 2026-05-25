"use client";

import { Counter } from "../ui/Counter";
import { FadeUp } from "../ui/FadeUp";

const stats = [
  { value: 50, suffix: "K+", label: "Active Users" },
  { value: 300, suffix: "+", label: "Brand Partners" },
  { value: 98, suffix: "%", label: "Satisfaction Rate" },
  { value: 2, suffix: "M+", label: "Tasks Completed" },
];

export function Stats() {
  return (
    <section className="py-20 px-6 md:px-16" id="about">
      <div className="mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map(({ value, suffix, label }, i) => (
          <FadeUp key={label} delay={i * 0.1}>
            <div className="text-center">
              <div className="font-display text-4xl md:text-5xl font-black mb-1" style={{ color: "#0C84FD" }}>
                <Counter to={value} suffix={suffix} />
              </div>
              <div className="text-sm text-slate-500 font-medium tracking-wide">{label}</div>
            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}