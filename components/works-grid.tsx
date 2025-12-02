"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import alrafahiaImg from "@/app/works/devImages/alrafahia.png"
import owagImg from "@/app/works/devImages/Owag.png"
import { projects } from "./works"

// Dev-only image set for in‑progress work
const devImages = [
  {
    title: "Al-Rafahia",
    summary: "Al-Rafahia is a custom manufacturing company that produces laser cut wall art, signage and braai accessories.",
    tags: ["React", "WooCommerce", "PHP"],
    year: "2025",
    image: alrafahiaImg,
  },
  {
    title: "OH! What a Gift",
    summary: "Oh! What a Gift is a custom embroidery business that produces custom embroidered towels and gifts sets.",
    tags: ["React", "WooCommerce", "PHP"],
    year: "2025",
    image: owagImg,
  },
]

export function WorksGrid() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section className="relative py-32 px-8 md:px-12 md:py-24">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mb-16"
      >
        <p className="font-mono text-xs tracking-[0.3em] text-muted-foreground mb-4">WORKS</p>
        <h1 className="font-sans text-3xl md:text-5xl lg:text-6xl font-light tracking-tight">
          All shipped work
        </h1>
        <p className="mt-4 max-w-2xl font-mono text-[11px] md:text-xs tracking-widest text-muted-foreground">
          A complete view of the interfaces, products, and commerce experiences I&apos;ve helped bring to life.
        </p>
      </motion.div>

      {/* Grid */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <motion.a
            key={project.title}
            href={project.url || "#"}
            target={project.url ? "_blank" : undefined}
            rel={project.url ? "noopener noreferrer" : undefined}
            data-cursor-hover
            className="group relative flex flex-col border border-white/10 rounded-xl overflow-hidden bg-gradient-to-b from-white/[0.03] to-white/[0.01] hover:border-white/30 transition-colors duration-300 min-h-[260px]"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.05 }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* Banner / Preview (only renders website on hover) */}
            <div className="relative h-32 md:h-40 overflow-hidden bg-black">
              <motion.div
                className="absolute inset-0"
                animate={{
                  scale: hoveredIndex === index ? 1.03 : 1,
                  y: hoveredIndex === index ? -2 : 0,
                }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
              >
                {hoveredIndex === index && project.url ? (
                  <div
                    className="relative w-full h-full"
                    style={{
                      transform: "scale(0.5)",
                      transformOrigin: "top left",
                      width: "200%",
                      height: "200%",
                    }}
                  >
                    <iframe
                      src={project.url}
                      className="absolute top-0 left-0 w-full h-full border-0"
                      style={{ width: "1280px", height: "800px" }}
                      loading="lazy"
                    />
                  </div>
                ) : (
                  <div className="w-full h-full bg-[radial-gradient(circle_at_top,_#111_0,_#000_60%)]" />
                )}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"
                  animate={{
                    opacity: hoveredIndex === index ? 0.4 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>

              <div className="absolute inset-x-4 bottom-3 flex items-center justify-between text-[10px] md:text-xs font-mono text-white/80 pointer-events-none">
                <span className="tracking-widest">{project.year}</span>
                {project.url && (
                  <span className="tracking-[0.2em] opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                    VIEW SITE →
                  </span>
                )}
              </div>
            </div>

            {/* Body (text shrinks toward bottom on hover) */}
            <motion.div
              className="p-5 md:p-6 flex flex-col gap-4 mt-auto"
              animate={{
                y: hoveredIndex === index ? 10 : 0,
                scale: hoveredIndex === index ? 0.9 : 1,
              }}
              transition={{ type: "spring", stiffness: 250, damping: 22 }}
            >
              <h2 className="font-sans text-xl md:text-2xl lg:text-3xl font-light tracking-tight group-hover:text-white/90 transition-colors duration-300">
                {project.title}
              </h2>

              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed line-clamp-3">
                {project.summary}
              </p>

              <div className="mt-2 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[10px] tracking-wider px-3 py-1 border border-white/15 rounded-full text-muted-foreground group-hover:border-white/30 transition-colors duration-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.a>
        ))}
      </div>

      {/* Currently Working On */}
      <div className="mt-24 border-t border-white/10 pt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-10"
        >
          <p className="font-mono text-xs tracking-[0.3em] text-muted-foreground mb-4">
            CURRENTLY IN DEVELOPMENT
          </p>
          <h2 className="font-sans text-2xl md:text-4xl font-light tracking-tight">
            The Projects I'm Currently Working On
          </h2>
        </motion.div>

        <div className="space-y-8">
          {devImages.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative border-t border-white/10 pt-6 md:pt-8"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                {/* Year */}
                <span className="font-mono text-[10px] md:text-xs text-muted-foreground tracking-widest">
                  {item.year}
                </span>

                {/* Preview image */}
                <motion.div
                  className="relative w-full md:w-80 h-32 md:h-40 overflow-hidden rounded-lg border border-white/15 bg-black"
                  whileHover={{ scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 220, damping: 22 }}
                >
                  <motion.div
                    className="relative w-full h-full"
                    initial={{ scale: 1.1 }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                      style={{ filter: "grayscale(50%) contrast(1.1)" }}
                    />
                  </motion.div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                </motion.div>

                {/* Text */}
                <div className="flex-1 min-w-0 md:pl-4">
                  <h3 className="font-sans text-xl md:text-2xl font-light tracking-tight mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed max-w-xl">
                    {item.summary}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[10px] tracking-wider px-3 py-1 border border-white/20 rounded-full text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

    </section>
  )
}


