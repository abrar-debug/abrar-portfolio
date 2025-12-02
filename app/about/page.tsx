import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CustomCursor } from "@/components/custom-cursor"
import { SmoothScroll } from "@/components/smooth-scroll"

export default function AboutPage() {
  return (
    <SmoothScroll>
      <CustomCursor />
      <Navbar />
      <main>
        <section className="relative py-32 px-8 md:px-12 md:py-24 max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <p className="font-mono text-xs tracking-[0.3em] text-muted-foreground">ABOUT</p>
            <Link
              href="/"
              className="font-mono text-[10px] tracking-[0.25em] text-muted-foreground hover:text-foreground transition-colors duration-300 uppercase"
            >
              ← BACK HOME
            </Link>
          </div>
          <h1 className="font-sans text-3xl md:text-5xl lg:text-6xl font-light tracking-tight mb-10">
            Building thoughtful digital systems at the edge of{" "}
            <span className="italic">design and computer science</span>.
          </h1>

          <div className="space-y-10 text-sm md:text-base text-muted-foreground leading-relaxed">
            <p>
              I&apos;m a Computer Science graduate and Junior Software Engineer based in South Africa, currently working
              at Kaizentech. My background in BSc Computer Science and BSc Hons Computer Science from Varsity College
              taught me how to think in systems – from low-level fundamentals to high-level product design.
            </p>

            <p>
              I care deeply about interfaces that feel calm, intentional, and precise. Most of my work lives at the
              intersection of <span className="text-foreground">React, TypeScript, Next.js, .NET, SQL</span>, and modern
              frontend tooling. I enjoy taking products from vague idea to polished experience – from data models and
              APIs all the way through to motion, typography, and micro-interactions.
            </p>

            <p>
              Recently, I&apos;ve been working on production e‑commerce and brand experiences like{" "}
              <span className="text-foreground">Oracle Gaming</span>,{" "}
              <span className="text-foreground">Invictus Nutrition</span>, and{" "}
              <span className="text-foreground">Radiant Life Aesthetics</span> – focusing on performance, reliability,
              and a premium feel across devices.
            </p>

            <p>
              Outside of shipping features, I&apos;m interested in how teams work: clean version control, sensible
              branching strategies, clear communication, and small, reversible changes. Good engineering, to me, is
              equal parts discipline and taste.
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3 text-xs md:text-sm">
            <div>
              <p className="font-mono tracking-[0.25em] text-muted-foreground mb-2 uppercase">CURRENTLY</p>
              <p className="text-foreground">Junior Software Engineer @ Kaizentech</p>
            </div>
            <div>
              <p className="font-mono tracking-[0.25em] text-muted-foreground mb-2 uppercase">FOCUS</p>
              <p className="text-foreground">Full‑stack product work, e‑commerce, design‑driven interfaces</p>
            </div>
            <div>
              <p className="font-mono tracking-[0.25em] text-muted-foreground mb-2 uppercase">STACK</p>
              <p className="text-foreground">React, Next.js, TypeScript, .NET, SQL, Tailwind</p>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </SmoothScroll>
  )
}


