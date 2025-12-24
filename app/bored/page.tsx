"use client"
import { Navbar } from "@/components/navbar"
import { CustomCursor } from "@/components/custom-cursor"
import { SmoothScroll } from "@/components/smooth-scroll"
import { motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"

export default function BoredPage() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [x, setX] = useState(0)
  const xRef = useRef(0)
  const [bounds, setBounds] = useState({ width: 0, maxX: 0 })
  const boundsRef = useRef({ width: 0, maxX: 0 })
  const keys = useRef({ left: false, right: false })
  const last = useRef<number | null>(null)

  useEffect(() => {
    const measure = () => {
      const w =
        containerRef.current?.clientWidth ||
        window.innerWidth ||
        document.documentElement.clientWidth ||
        0
      const shipW = 48
      const maxX = Math.max(0, w - shipW)
      const next = { width: w, maxX }
      boundsRef.current = next
      setBounds(next)
      const startX = Math.max(0, Math.min(maxX, Math.floor(w / 2 - shipW / 2)))
      xRef.current = startX
      setX(startX)
    }
    const id = requestAnimationFrame(measure)
    const onResize = () => measure()
    window.addEventListener("resize", onResize)
    return () => {
      cancelAnimationFrame(id)
      window.removeEventListener("resize", onResize)
    }
  }, [])

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase()
      if (k === "a") keys.current.left = true
      if (k === "d") keys.current.right = true
    }
    const up = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase()
      if (k === "a") keys.current.left = false
      if (k === "d") keys.current.right = false
    }
    window.addEventListener("keydown", down)
    window.addEventListener("keyup", up)
    return () => {
      window.removeEventListener("keydown", down)
      window.removeEventListener("keyup", up)
    }
  }, [])

  useEffect(() => {
    const loop = (t: number) => {
      const speed = 360
      if (last.current == null) last.current = t
      const dt = (t - last.current) / 1000
      last.current = t
      let dir = 0
      if (keys.current.left) dir -= 1
      if (keys.current.right) dir += 1
      if (dir !== 0) {
        const maxX = boundsRef.current.maxX
        const nx = Math.max(0, Math.min(maxX, xRef.current + dir * speed * dt))
        if (nx !== xRef.current) {
          xRef.current = nx
          setX(nx)
        }
      }
      requestAnimationFrame(loop)
    }
    const id = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(id)
  }, [])

  return (
    <SmoothScroll>
      <CustomCursor />
      <Navbar />
      <main ref={containerRef} className="relative h-screen w-screen overflow-hidden bg-[#050505]">
        <motion.div
          style={{ x }}
          className="absolute bottom-8 left-0 w-12 h-6 rounded-sm bg-gradient-to-b from-white/70 to-white/30 shadow-[0_0_20px_rgba(255,255,255,0.25)]"
        />
      </main>
    </SmoothScroll>
  )
}
