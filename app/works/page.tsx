import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CustomCursor } from "@/components/custom-cursor"
import { SmoothScroll } from "@/components/smooth-scroll"
import { WorksGrid } from "@/components/works-grid"

export default function WorksPage() {
  return (
    <SmoothScroll>
      <CustomCursor />
      <Navbar />
      <main>
        <WorksGrid />
        <Footer />
      </main>
    </SmoothScroll>
  )
}

