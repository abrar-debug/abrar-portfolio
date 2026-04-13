import Link from "next/link"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CustomCursor } from "@/components/custom-cursor"
import { SmoothScroll } from "@/components/smooth-scroll"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

const pillars = [
  {
    title: "Point of Sale",
    description:
      "Fast and reliable checkout software designed for retail counters, quick-service environments, and customer-first operations.",
  },
  {
    title: "Inventory & Operations",
    description:
      "Unified tools for stock visibility, product control, and daily operational workflows that keep teams aligned in real time.",
  },
  {
    title: "Business Intelligence",
    description:
      "Clear reporting across sales, product movement, and customer behavior so owners can make smarter day-to-day decisions.",
  },
]

const offerings = [
  {
    id: "nova",
    name: "Sentiosk Nova",
    subtitle: "Restaurant POS System",
    status: "In Production",
    description:
      "Built for restaurants and food service teams, Nova supports fast order flow, table-based operations, and high-volume service periods without slowing down.",
  },
  {
    id: "mira",
    name: "Sentiosk Mira",
    subtitle: "Retail POS System",
    status: "In Development",
    description:
      "Designed for retail environments, Mira streamlines checkout, product lookup, and inventory-linked selling for stores that need speed and accuracy at the counter.",
  },
  {
    id: "luna",
    name: "Sentiosk Luna",
    subtitle: "Tablet POS for Kiosks & Small Stores",
    status: "In Early Development",
    description:
      "A lightweight tablet-first POS experience for kiosks and small stores, balancing ease of use with dependable daily transaction performance.",
  },
  {
    id: "hq",
    name: "Sentiosk HQ",
    subtitle: "Multi-Store Admin Dashboard",
    status: "In Production",
    description:
      "Admin dashboard for sales and inventory management across all Sentiosk POS terminals, giving owners and operators one control center for multi-store operations.",
  },
]

const novaGalleryImages = [
  "/sentiosk/nova/Screenshot 2026-04-13 135601.png",
  "/sentiosk/nova/Screenshot 2026-04-13 135812.png",
  "/sentiosk/nova/Screenshot 2026-04-13 135504.png",
  "/sentiosk/nova/Screenshot 2026-04-13 135447.png",
  "/sentiosk/nova/Screenshot 2026-04-13 135530.png",
  "/sentiosk/nova/Screenshot 2026-04-13 135540.png",
  "/sentiosk/nova/Screenshot 2026-04-13 135458.png",
  "/sentiosk/nova/Screenshot 2026-04-13 135513.png",
]

const miraGalleryImages = [
  "/sentiosk/mira/Screenshot 2026-04-13 141019.png",
  "/sentiosk/mira/Screenshot 2026-04-13 140926.png",
  "/sentiosk/mira/Screenshot 2026-04-13 141050.png",
  "/sentiosk/mira/Screenshot 2026-04-13 140912.png",
  "/sentiosk/mira/Screenshot 2026-04-13 141012.png",
  "/sentiosk/mira/Screenshot 2026-04-13 140854.png",
]

const hqGalleryImages = [
  "/sentiosk/hq/Screenshot 2026-04-13 141532.png",
  "/sentiosk/hq/Screenshot 2026-04-13 141547.png",
  "/sentiosk/hq/Screenshot 2026-04-13 141634.png",
  "/sentiosk/hq/Screenshot 2026-04-13 141619.png",
  "/sentiosk/hq/Screenshot 2026-04-13 141658.png",
  "/sentiosk/hq/Screenshot 2026-04-13 141601.png",
  "/sentiosk/hq/Screenshot 2026-04-13 141609.png",
]

export default function SentioskPage() {
  return (
    <SmoothScroll>
      <CustomCursor />
      <Navbar />
      <main>
        <section className="relative py-32 px-8 md:px-12 md:py-24">
          <div className="flex items-center justify-between mb-4">
            <p className="font-mono text-xs tracking-[0.3em] text-muted-foreground">SENTIOSK</p>
            <Link
              href="/"
              className="font-mono text-[10px] tracking-[0.25em] text-muted-foreground hover:text-foreground transition-colors duration-300 uppercase"
            >
              ← BACK HOME
            </Link>
          </div>

          <h1 className="font-sans text-3xl md:text-5xl lg:text-6xl font-light tracking-tight mb-8">
            Sentiosk is a modern <span className="italic">Point of Sale company</span> building practical software for
            businesses that move fast.
          </h1>

          <p className="max-w-3xl text-sm md:text-base text-muted-foreground leading-relaxed">
            We focus on clean interfaces, reliable transaction flow, and connected operations from checkout to reporting.
            Sentiosk is designed to support teams that need speed at the counter and clarity in the back office.
          </p>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {pillars.map((pillar) => (
              <article key={pillar.title} className="border border-white/10 rounded-xl p-6 bg-white/[0.02]">
                <h2 className="font-sans text-xl md:text-2xl font-light tracking-tight mb-3">{pillar.title}</h2>
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{pillar.description}</p>
              </article>
            ))}
          </div>

          <div className="mt-20 border-t border-white/10 pt-12">
            <p className="font-mono text-xs tracking-[0.3em] text-muted-foreground mb-4">OFFERINGS</p>
            <h2 className="font-sans text-2xl md:text-4xl font-light tracking-tight mb-10">
              Sentiosk product suite
            </h2>

            <div className="grid gap-6 md:gap-8">
              {offerings.map((offering) => (
                <section key={offering.id} className="border border-white/10 rounded-xl p-6 md:p-8 bg-white/[0.02]">
                  <div
                    className={
                      offering.id === "nova" || offering.id === "mira" || offering.id === "hq"
                        ? "grid gap-6 md:gap-8 lg:grid-cols-2 lg:items-start"
                        : ""
                    }
                  >
                    <div className={offering.id === "mira" ? "lg:order-2" : ""}>
                      <div className="flex flex-wrap items-center gap-3">
                        <p className="font-sans text-xl md:text-3xl font-light tracking-tight">{offering.name}</p>
                        {offering.status && (
                          <span className="font-mono text-[10px] tracking-wider px-3 py-1 border border-accent/50 rounded-full text-accent uppercase">
                            {offering.status}
                          </span>
                        )}
                      </div>
                      <p className="mt-2 font-mono text-[10px] md:text-xs tracking-[0.2em] text-muted-foreground uppercase">
                        {offering.subtitle}
                      </p>
                      <p className="mt-5 text-xs md:text-sm text-muted-foreground leading-relaxed max-w-3xl">
                        {offering.description}
                      </p>
                      {offering.id === "nova" && (
                        <div className="mt-4">
                          <span className="inline-flex font-mono text-[10px] tracking-wider px-3 py-1 border border-accent/50 rounded-full text-accent uppercase">
                            New Nova Version in Development & Testing (Electron + .NET)
                          </span>
                        </div>
                      )}
                      {offering.id === "nova" && (
                        <div className="mt-6 border border-white/10 rounded-xl p-5 md:p-6 bg-white/[0.02] max-w-3xl">
                          <p className="font-mono text-[10px] md:text-xs tracking-[0.2em] text-muted-foreground uppercase mb-3">
                            Nova Tech Stack
                          </p>
                          <ul className="space-y-2 text-xs md:text-sm text-muted-foreground">
                            <li>.NET POS terminal</li>
                            <li>Node.js API</li>
                            <li>TypeScript admin dashboard (Sentiosk HQ)</li>
                            <li>Hosted on AWS</li>
                          </ul>
                        </div>
                      )}
                      {offering.id === "mira" && (
                        <div className="mt-6 border border-white/10 rounded-xl p-5 md:p-6 bg-white/[0.02] max-w-3xl">
                          <p className="font-mono text-[10px] md:text-xs tracking-[0.2em] text-muted-foreground uppercase mb-3">
                            Mira Tech Stack
                          </p>
                          <ul className="space-y-2 text-xs md:text-sm text-muted-foreground">
                            <li>Electron + .NET</li>
                            <li>Node.js API</li>
                            <li>TypeScript admin dashboard</li>
                            <li>AWS</li>
                          </ul>
                        </div>
                      )}
                      {offering.id === "hq" && (
                        <div className="mt-6 border border-white/10 rounded-xl p-5 md:p-6 bg-white/[0.02] max-w-3xl">
                          <p className="font-mono text-[10px] md:text-xs tracking-[0.2em] text-muted-foreground uppercase mb-3">
                            HQ Tech Stack
                          </p>
                          <ul className="space-y-2 text-xs md:text-sm text-muted-foreground">
                            <li>TypeScript</li>
                            <li>Node.js</li>
                            <li>Argon2id</li>
                            <li>AWS</li>
                            <li>Nginx</li>
                            <li>Docker</li>
                          </ul>
                        </div>
                      )}
                    </div>

                    {offering.id === "nova" && (
                      <div className="relative px-10 md:px-12">
                        <Carousel
                          opts={{ align: "start", loop: true }}
                          className="w-full"
                        >
                          <CarouselContent className="-ml-0">
                            {novaGalleryImages.map((imageSrc) => (
                              <CarouselItem key={imageSrc} className="pl-0">
                                <div className="group relative overflow-hidden rounded-lg border border-white/10 bg-black/40">
                                  <Image
                                    src={imageSrc}
                                    alt="Sentiosk Nova interface screenshot"
                                    width={1200}
                                    height={800}
                                    className="h-auto w-full transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                                  />
                                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 to-transparent opacity-35 transition-opacity duration-300 group-hover:opacity-10" />
                                </div>
                              </CarouselItem>
                            ))}
                          </CarouselContent>
                          <CarouselPrevious className="left-0 border-white/20 bg-black/60 hover:bg-black/80" />
                          <CarouselNext className="right-0 border-white/20 bg-black/60 hover:bg-black/80" />
                        </Carousel>
                      </div>
                    )}
                    {offering.id === "mira" && (
                      <div className="relative px-10 md:px-12 lg:order-1">
                        <Carousel
                          opts={{ align: "start", loop: true }}
                          className="w-full"
                        >
                          <CarouselContent className="-ml-0">
                            {miraGalleryImages.map((imageSrc) => (
                              <CarouselItem key={imageSrc} className="pl-0">
                                <div className="group relative overflow-hidden rounded-lg border border-white/10 bg-black/40">
                                  <Image
                                    src={imageSrc}
                                    alt="Sentiosk Mira interface screenshot"
                                    width={1200}
                                    height={800}
                                    className="h-auto w-full transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                                  />
                                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 to-transparent opacity-35 transition-opacity duration-300 group-hover:opacity-10" />
                                </div>
                              </CarouselItem>
                            ))}
                          </CarouselContent>
                          <CarouselPrevious className="left-0 border-white/20 bg-black/60 hover:bg-black/80" />
                          <CarouselNext className="right-0 border-white/20 bg-black/60 hover:bg-black/80" />
                        </Carousel>
                      </div>
                    )}
                    {offering.id === "hq" && (
                      <div className="relative px-10 md:px-12">
                        <Carousel
                          opts={{ align: "start", loop: true }}
                          className="w-full"
                        >
                          <CarouselContent className="-ml-0">
                            {hqGalleryImages.map((imageSrc) => (
                              <CarouselItem key={imageSrc} className="pl-0">
                                <div className="group relative overflow-hidden rounded-lg border border-white/10 bg-black/40">
                                  <Image
                                    src={imageSrc}
                                    alt="Sentiosk HQ dashboard screenshot"
                                    width={1200}
                                    height={800}
                                    className="h-auto w-full transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                                  />
                                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 to-transparent opacity-35 transition-opacity duration-300 group-hover:opacity-10" />
                                </div>
                              </CarouselItem>
                            ))}
                          </CarouselContent>
                          <CarouselPrevious className="left-0 border-white/20 bg-black/60 hover:bg-black/80" />
                          <CarouselNext className="right-0 border-white/20 bg-black/60 hover:bg-black/80" />
                        </Carousel>
                      </div>
                    )}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </SmoothScroll>
  )
}
