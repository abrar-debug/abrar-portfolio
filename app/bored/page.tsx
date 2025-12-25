"use client"
import { Navbar } from "@/components/navbar"
import { CustomCursor } from "@/components/custom-cursor"
import { SmoothScroll } from "@/components/smooth-scroll"
import { motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { EnemyEasy, EnemyMedium, EnemyHard } from "./enemies"
import { PlayerShip } from "./player-ship"

export default function BoredPage() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [x, setX] = useState(0)
  const xRef = useRef(0)
  const [bounds, setBounds] = useState({ width: 0, maxX: 0 })
  const boundsRef = useRef({ width: 0, maxX: 0 })
  const [bullets, setBullets] = useState<{ id: number; x: number; y: number }[]>([])
  const bulletsRef = useRef<{ id: number; x: number; y: number }[]>([])
  const [enemies, setEnemies] = useState<{ id: number; x: number; y: number; vx: number; vy: number; type: 'easy' | 'medium' | 'hard'; health: number }[]>([])
  const enemiesRef = useRef<{ id: number; x: number; y: number; vx: number; vy: number; type: 'easy' | 'medium' | 'hard'; health: number }[]>([])
  const keys = useRef({ left: false, right: false, shoot: false })
  const [playing, setPlaying] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(0)
  const scoreRef = useRef(0)
  const playingRef = useRef(false)
  const last = useRef<number | null>(null)
  const lastShot = useRef(0)

  const getEnemySize = (type: 'easy' | 'medium' | 'hard') => {
    switch(type) {
      case 'medium': return 60
      case 'hard': return 90
      default: return 40
    }
  }

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
      const enemyY = 100
      const speed = 150
      // Check if enemies already exist to avoid resetting them on resize
      if (enemiesRef.current.length === 0) {
        const easyW = getEnemySize('easy')
        const newEnemies = [
          { id: 1, x: w * 0.25 - easyW / 2, y: enemyY, vx: speed, vy: 50, type: 'easy' as const, health: 1 },
          { id: 2, x: w * 0.5 - easyW / 2, y: enemyY, vx: -speed, vy: 50, type: 'easy' as const, health: 1 },
          { id: 3, x: w * 0.75 - easyW / 2, y: enemyY, vx: speed, vy: 50, type: 'easy' as const, health: 1 },
        ]
        setEnemies(newEnemies)
        enemiesRef.current = newEnemies
      }
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

      if (!playingRef.current) {
        requestAnimationFrame(loop)
        return
      }

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

      // Move Enemies
      if (enemiesRef.current.length > 0) {
        const nextEnemies = enemiesRef.current.map((e) => {
          const enemyW = getEnemySize(e.type)
          const maxX = boundsRef.current.width - enemyW
          
          let nx = e.x + e.vx * dt
          let ny = e.y + e.vy * dt
          let nvx = e.vx
          if (nx <= 0) {
            nx = 0
            nvx = -nvx
          } else if (nx >= maxX) {
            nx = maxX
            nvx = -nvx
          }
          return { ...e, x: nx, y: ny, vx: nvx }
        })
        
        let changed = nextEnemies.some((e, i) => {
           const prev = enemiesRef.current[i]
           return e.x !== prev.x || e.y !== prev.y
        })

        // Check for player collision
        const playerX = xRef.current
        const playerY = window.innerHeight - 32 - 24 // bottom-8 + h-6
        const playerW = 48
        const playerH = 24
        
        for (const enemy of nextEnemies) {
          const enemyW = getEnemySize(enemy.type)
          const enemyH = enemyW // Square enemies
          if (
            enemy.x < playerX + playerW &&
            enemy.x + enemyW > playerX &&
            enemy.y < playerY + playerH &&
            enemy.y + enemyH > playerY
          ) {
             setGameOver(true)
             setPlaying(false)
             playingRef.current = false
             requestAnimationFrame(loop)
             return // Stop current frame logic, but keep loop alive
          }
        }

        if (changed) {
          enemiesRef.current = nextEnemies
          setEnemies(nextEnemies)
        }
      }

      // Spawner logic
      if (enemiesRef.current.length < 5 && Math.random() < 0.02) {
         const w = boundsRef.current.width
         const enemyY = -90 // Start above (max size 90)
         const speed = 150 + Math.random() * 100
         
         const rand = Math.random()
         let type: 'easy' | 'medium' | 'hard' = 'easy'
         let health = 1
         
         // Weighted spawning:
         // Total weight = 1 (easy) + 0.7 (medium) + 0.5 (hard) = 2.2
         // Easy: < 0.45 (1/2.2)
         // Medium: < 0.77 (1.7/2.2)
         // Hard: >= 0.77
         if (rand > 0.77) {
            type = 'hard'
            health = 4
         } else if (rand > 0.45) {
            type = 'medium'
            health = 2
         }

         const enemyW = getEnemySize(type)

         const newEnemy = {
           id: Date.now() + Math.random(),
           x: Math.random() * (w - enemyW),
           y: enemyY,
           vx: Math.random() > 0.5 ? speed : -speed,
           vy: 50 + Math.random() * 50,
           type,
           health
         }
         enemiesRef.current.push(newEnemy)
         setEnemies([...enemiesRef.current])
      }
      
      // Cleanup off-screen enemies
      if (enemiesRef.current.some(e => e.y > window.innerHeight)) {
        enemiesRef.current = enemiesRef.current.filter(e => e.y <= window.innerHeight)
        setEnemies([...enemiesRef.current])
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
        const bulletW = 4
        const bulletH = 12

        // Move bullets
        let activeBullets = bulletsRef.current
          .map((b) => ({ ...b, y: b.y + bulletSpeed * dt }))
          .filter((b) => b.y < window.innerHeight)

        // Collision detection
        if (enemiesRef.current.length > 0) {
          const nextEnemies: typeof enemiesRef.current = []
          const destroyedBulletIds = new Set<number>()

          for (const enemy of enemiesRef.current) {
            const enemyW = getEnemySize(enemy.type)
            const enemyH = enemyW
            let hit = false
            for (const bullet of activeBullets) {
              if (destroyedBulletIds.has(bullet.id)) continue

              // Simple AABB collision
              // Bullet y is distance from bottom, enemy y is distance from top
              const bulletTop = window.innerHeight - (bullet.y + bulletH)
              const bulletBottom = window.innerHeight - bullet.y
              const bulletLeft = bullet.x
              const bulletRight = bullet.x + bulletW

              const enemyTop = enemy.y
              const enemyBottom = enemy.y + enemyH
              const enemyLeft = enemy.x
              const enemyRight = enemy.x + enemyW

              if (
                bulletLeft < enemyRight &&
                bulletRight > enemyLeft &&
                bulletTop < enemyBottom &&
                bulletBottom > enemyTop
              ) {
                hit = true
                destroyedBulletIds.add(bullet.id)
                
                // Damage logic
                enemy.health -= 1
                if (enemy.health <= 0) {
                    let points = 0
                    if (enemy.type === 'easy') points = 1
                    else if (enemy.type === 'medium') points = 2
                    else if (enemy.type === 'hard') points = 3
                    
                    console.log('Enemy destroyed:', enemy.type, 'Points:', points)
                    setScore(s => {
                        console.log('Updating score from', s, 'to', s + points)
                        return s + points
                    })
                    break // Destroyed
                } else {
                    hit = false // Bullet destroyed, enemy survives
                    // We need to stop checking bullets for this enemy if we only want 1 bullet per frame?
                    // But we already added bullet to destroyed set, so it won't hit others.
                    // But if we continue inner loop, other bullets might hit this same enemy in same frame.
                    // That is acceptable.
                }
              }
            }
            if (!hit || enemy.health > 0) {
              nextEnemies.push(enemy)
            }
          }

          if (destroyedBulletIds.size > 0) {
            activeBullets = activeBullets.filter((b) => !destroyedBulletIds.has(b.id))
            enemiesRef.current = nextEnemies
            setEnemies(nextEnemies)
          }
        }

        bulletsRef.current = activeBullets
        setBullets([...bulletsRef.current])
      }

      requestAnimationFrame(loop)
    }
    const id = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(id)
  }, [])

 const startGame = () => {
    // Reset game state
    setGameOver(false)
    setScore(0)
    scoreRef.current = 0
    const w = boundsRef.current.width
    const enemyY = 100
    const speed = 150
    const easyW = getEnemySize('easy')
    const startEnemies = [
      { id: 1, x: w * 0.25 - easyW / 2, y: enemyY, vx: speed, vy: 50, type: 'easy' as const, health: 1 },
      { id: 2, x: w * 0.5 - easyW / 2, y: enemyY, vx: -speed, vy: 50, type: 'easy' as const, health: 1 },
      { id: 3, x: w * 0.75 - easyW / 2, y: enemyY, vx: speed, vy: 50, type: 'easy' as const, health: 1 },
    ]
    enemiesRef.current = startEnemies
    setEnemies(startEnemies)
    bulletsRef.current = []
    setBullets([])
    xRef.current = Math.floor(w / 2 - 24)
    setX(xRef.current)
    
    setPlaying(true)
    playingRef.current = true
  }

  return (
    <SmoothScroll>
      <CustomCursor />
      <Navbar />
      <main ref={containerRef} className="relative h-screen w-screen overflow-hidden bg-[#050505]">
        <div className="fixed top-24 left-8 z-[60] pointer-events-none mix-blend-difference">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/50">Score</span>
            <span className="text-4xl font-bold tracking-tighter text-white tabular-nums">
              {score.toString().padStart(6, '0')}
            </span>
          </div>
        </div>

        {(!playing || gameOver) && (
          <div className="fixed bottom-0 left-0 z-50 flex w-full items-center justify-between border-t border-white/10 bg-black/90 px-8 py-6 backdrop-blur-md">
            <div className="flex items-center gap-8 text-sm text-white/60">
              <h1 className="text-xl font-bold tracking-tighter text-white">
                {gameOver ? `GAME OVER - SCORE: ${score}` : "VOID SHOOTER"}
              </h1>
              <div className="h-4 w-px bg-white/10" />
              <p>
                <span className="font-bold text-white">A / D</span> to Move
              </p>
              <p>
                <span className="font-bold text-white">SPACE</span> to Shoot
              </p>
            </div>
            <button
              onClick={startGame}
              className="group relative px-8 py-2 text-sm font-bold uppercase tracking-widest text-white transition-colors hover:text-black"
            >
              <div className="absolute inset-0 border border-white transition-all group-hover:bg-white" />
              <span className="relative">{gameOver ? "RETRY" : "PLAY"}</span>
            </button>
          </div>
        )}
        {enemies.map((e) => {
          const size = getEnemySize(e.type)
          return (
            <div
              key={e.id}
              className="absolute top-0 left-0"
              style={{ 
                width: size,
                height: size,
                transform: `translate(${e.x}px, ${e.y}px)` 
              }}
            >
              {e.type === 'easy' && <EnemyEasy className="w-full h-full text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]" />}
              {e.type === 'medium' && <EnemyMedium className="w-full h-full text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]" />}
              {e.type === 'hard' && <EnemyHard className="w-full h-full text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]" />}
            </div>
          )
        })}
        {bullets.map((b) => (
          <div
            key={b.id}
            className="absolute bottom-0 left-0 w-1 h-3 bg-red-500 shadow-[0_0_10px_rgba(255,50,50,0.8)]"
            style={{ transform: `translate(${b.x}px, -${b.y}px)` }}
          />
        ))}
        <div
          style={{ transform: `translateX(${x}px)` }}
          className={`absolute left-0 w-12 h-12 transition-[bottom] duration-500 ${
            playing ? "bottom-8" : "bottom-32"
          }`}
        >
          <PlayerShip className="w-full h-full text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]" />
        </div>
      </main>
    </SmoothScroll>
  )
}
