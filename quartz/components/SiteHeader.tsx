import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

const SiteHeader: QuartzComponent = ({ fileData }: QuartzComponentProps) => {
  const slug = fileData.slug!
  const navItems = [
    { label: "글", href: "/posts/", active: slug.startsWith("posts") },
    { label: "태그", href: "/tags/", active: slug.startsWith("tags") },
    { label: "소개", href: "/about/", active: slug === "about" },
  ]

  return (
    <>
      <a class="hf-logo" href="/" aria-label="highfence devlog home">
        <span>highfence</span>
        <span class="hf-logo-accent">_</span>
        <span class="hf-logo-cursor">█</span>
      </a>
      <nav class="hf-nav" aria-label="Primary navigation">
        {navItems.map((item) => (
          <a class={item.active ? "active" : undefined} href={item.href}>
            {item.label}
          </a>
        ))}
        <a href="/index.xml">RSS</a>
        <a href="https://github.com/highfence">GitHub</a>
      </nav>
    </>
  )
}

export default (() => SiteHeader) satisfies QuartzComponentConstructor
