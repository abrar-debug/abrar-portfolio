import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CustomCursor } from "@/components/custom-cursor"
import { SmoothScroll } from "@/components/smooth-scroll"
import { Github, Linkedin, Mail } from "lucide-react"

const contacts = [
  {
    label: "GitHub",
    href: "https://github.com/abrar-debug",
    Icon: Github,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/mohammed-abrar-hoque-5059b4274",
    Icon: Linkedin,
  },
  {
    label: "Email",
    href: "mailto:hoqueabrar@gmail.com",
    Icon: Mail,
  },
]

export default function ContactPage() {
  return (
    <SmoothScroll>
      <CustomCursor />
      <Navbar />
      <main>
        <section className="relative min-h-screen flex items-center justify-center px-8 md:px-12">
          <ul className="contact-stack gap-8">
            {contacts.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="contact-stack-button"
                  aria-label={label}
                  data-cursor-hover
                >
                  <span>
                    <Icon className="w-8 h-8" />
                  </span>
                  <span>
                    <Icon className="w-8 h-8" />
                  </span>
                  <span>
                    <Icon className="w-8 h-8" />
                  </span>
                  <span>
                    <Icon className="w-8 h-8" />
                  </span>
                  <span>
                    <Icon className="w-8 h-8" />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </section>
        <Footer />
      </main>
    </SmoothScroll>
  )
}

