"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"

const projects = [
  {
    title: "Oracle Gaming",
    tags: ["React", "Woocommerce", "Tailwind"],
    image: "/abstract-neural-network-visualization-dark-theme.jpg",
    year: "2025",
    url: "https://www.oraclegaming.co.za/",
  },
  {
    title: "Invictus Nutrition",
    tags: ["React", "Woocommerce", "Tailwind"],
    image: "/futuristic-data-dashboard-dark-minimal.jpg",
    year: "2025",
    url: "https://www.invictusnutrition.co.za/",
  },
  {
    title: "Radiant Life Aesthetics",
    tags: ["React", "Typescript", "Tailwind"],
    image: "/abstract-memory-storage-visualization.jpg",
    year: "2025",
    url: "https://www.radiantlifeaesthetics.co.za/",
  },
  
]

export function Works() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

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
        <p className="font-mono text-xs tracking-[0.3em] text-muted-foreground mb-4">04 — SELECTED WORKS</p>
        <h2 className="font-sans text-3xl md:text-5xl font-light italic">The Gallery</h2>
      </motion.div>

      {/* Projects List */}
      <div className="relative">
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            className="relative border-t border-white/10 py-8 md:py-12"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <a
              href="#"
              data-cursor-hover
              className="group flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              {/* Year */}
              <span className="font-mono text-xs text-muted-foreground tracking-widest order-1 md:order-none">
                {project.year}
              </span>

              {/* Preview (Website or Image) - appears between year and title */}
              <motion.div
                className="pointer-events-none z-50 overflow-hidden rounded-lg border border-white/20 shadow-2xl bg-black flex-shrink-0"
                initial={{ opacity: 0, scale: 0.8, width: 0, marginLeft: 0, marginRight: 0 }}
                animate={{
                  opacity: hoveredIndex === index ? 1 : 0,
                  scale: hoveredIndex === index ? 1 : 0.8,
                  width: hoveredIndex === index ? (project.url ? "512px" : "256px") : "0px",
                  height: hoveredIndex === index ? (project.url ? "320px" : "160px") : "0px",
                  marginLeft: hoveredIndex === index ? "16px" : "0px",
                  marginRight: hoveredIndex === index ? "16px" : "0px",
                }}
                transition={{ duration: 0.4 }}
              >
                {hoveredIndex === index && (
                  <>
                    {project.url ? (
                      <div className="relative w-full h-full" style={{ transform: "scale(0.4)", transformOrigin: "top left", width: "250%", height: "250%" }}>
                        <iframe
                          src={project.url}
                          className="absolute top-0 left-0 w-full h-full border-0"
                          style={{ width: "1280px", height: "800px" }}
                          loading="lazy"
                        />
                      </div>
                    ) : (
                      <motion.img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                        initial={{ scale: 1.2 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.4 }}
                        style={{
                          filter: "grayscale(50%) contrast(1.1)",
                        }}
                      />
                    )}
                  </>
                )}
              </motion.div>

              {/* Title */}
              <motion.h3
                className="font-sans text-4xl md:text-6xl lg:text-7xl font-light tracking-tight group-hover:text-white/70 transition-colors duration-300 flex-1"
                animate={{
                  x: hoveredIndex === index ? 20 : 0,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {project.title}
              </motion.h3>

              {/* Tags */}
              <div className="flex gap-2 flex-wrap order-2 md:order-none">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[10px] tracking-wider px-3 py-1 border border-white/20 rounded-full text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </a>
          </motion.div>
        ))}
      </div>

      {/* Bottom Border */}
      <div className="border-t border-white/10" />
    </section>
  )
}
