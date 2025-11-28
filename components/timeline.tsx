"use client"

import { motion } from "framer-motion"

const timelineItems = [
  {
    period: "2022-2024",
    title: "Bsc Computer Science",
    location: "Varsity College Sandton",
    type: "education",
  },
  {
    period: "2025",
    title: "Bsc Hons Computer Science",
    location: "Varsity College Midrand",
    type: "education",
  },
  {
    period: "2025 Jan",
    title: "Intern",
    location: "Kaizentech",
    type: "work",
  },
  {
    period: "2025 Nov",
    title: "Junior Software Engineer",
    location: "Kaizentech",
    type: "work",
  },
]

export function Timeline() {
  return (
    <section className="relative py-32 px-8 md:px-12 md:py-24">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mb-24"
      >
        <p className="font-mono text-xs tracking-[0.3em] text-muted-foreground mb-4">06 — TIMELINE</p>
        <h2 className="font-sans text-3xl md:text-5xl font-light italic">Journey</h2>
      </motion.div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-8 md:left-12 top-0 bottom-0 w-px bg-white/10" />

        {/* Timeline Items */}
        <div className="space-y-16 md:space-y-24">
          {timelineItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="relative pl-16 md:pl-24"
            >
              {/* Timeline Dot */}
              <div className="absolute left-6 md:left-10 top-2 w-4 h-4 rounded-full border-2 border-white/30 bg-black -translate-x-1/2" />

              {/* Content */}
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                {/* Period */}
                <div className="flex-shrink-0">
                  <span className="font-mono text-xs text-muted-foreground tracking-widest">
                    {item.period}
                  </span>
                </div>

                {/* Title and Location */}
                <div className="flex-1">
                  <h3 className="font-sans text-2xl md:text-3xl font-light tracking-tight mb-2">
                    {item.title}
                  </h3>
                  <p className="font-mono text-sm text-muted-foreground tracking-wide">
                    {item.location}
                  </p>
                </div>

                {/* Type Badge */}
                <div className="flex-shrink-0">
                  <span
                    className={`font-mono text-[10px] tracking-wider px-3 py-1 border rounded-full ${
                      item.type === "work"
                        ? "border-white/20 text-white/70"
                        : "border-white/10 text-muted-foreground"
                    }`}
                  >
                    {item.type === "work" ? "WORK" : "EDUCATION"}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom Border */}
      <div className="border-t border-white/10 mt-24" />
    </section>
  )
}

