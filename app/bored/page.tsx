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
  const [bullets, setBullets] = useState<{ id: number; x: number; y: number }[]>([])
  const bulletsRef = useRef<{ id: number; x: number; y: number }[]>([])
  const [enemies, setEnemies] = useState<{ id: number; x: number; y: number }[]>([])
  const keys = useRef({ left: false, right: false, shoot: false })
  const last = useRef<number | null>(null)
  const lastShot = useRef(0)

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

      // Enemies
      const enemyW = 40
      const enemyY = 100
      setEnemies([
        { id: 1, x: w * 0.25 - enemyW / 2, y: enemyY },
        { id: 2, x: w * 0.5 - enemyW / 2, y: enemyY },
        { id: 3, x: w * 0.75 - enemyW / 2, y: enemyY },
      ])
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
      if (k === " ") keys.current.shoot = true
    }
    const up = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase()
      if (k === "a") keys.current.left = false
      if (k === "d") keys.current.right = false
      if (k === " ") keys.current.shoot = false
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

      // Bullets
      if (keys.current.shoot && t - lastShot.current > 200) {
        const bulletX = xRef.current + 24 - 2 // center of ship (48px) - half bullet (4px)
        const bulletY = 32 + 24 // bottom-8 (32px) + h-6 (24px)
        bulletsRef.current.push({ id: t, x: bulletX, y: bulletY })
        lastShot.current = t
      }

      if (bulletsRef.current.length > 0) {
        const bulletSpeed = 800
        bulletsRef.current = bulletsRef.current
          .map((b) => ({ ...b, y: b.y + bulletSpeed * dt }))
          .filter((b) => b.y < window.innerHeight)
        setBullets([...bulletsRef.current])
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
        {enemies.map((e) => (
          <div
            key={e.id}
            className="absolute top-0 left-0 w-10 h-10 bg-green-500 shadow-[0_0_15px_rgba(50,255,50,0.6)] [clip-path:polygon(50%_100%,0%_0%,100%_0%)]"
            style={{ transform: `translate(${e.x}px, ${e.y}px)` }}
          />
        ))}
        {bullets.map((b) => (
          <div
            key={b.id}
            className="absolute bottom-0 left-0 w-1 h-3 bg-red-500 shadow-[0_0_10px_rgba(255,50,50,0.8)]"
            style={{ transform: `translate(${b.x}px, -${b.y}px)` }}
          />
        ))}
        <motion.div
          style={{ x }}
          className="absolute bottom-8 left-0 w-12 h-6 rounded-sm bg-gradient-to-b from-white/70 to-white/30 shadow-[0_0_20px_rgba(255,255,255,0.25)]"
        />
      </main>
    </SmoothScroll>
  )
}
