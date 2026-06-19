(function () {
  const root = document.documentElement
  const button = document.querySelector("[data-theme-toggle]")
  const icon = document.querySelector("[data-theme-icon]")

  function setTheme(theme) {
    root.dataset.theme = theme
    try {
      localStorage.setItem("hf-theme", theme)
    } catch (_) {}
    if (button) {
      button.setAttribute("aria-label", theme === "dark" ? "라이트 모드로 전환" : "다크 모드로 전환")
    }
    if (icon) {
      icon.textContent = theme === "dark" ? "☾" : "☼"
    }
  }

  if (button) {
    button.addEventListener("click", function () {
      setTheme(root.dataset.theme === "dark" ? "light" : "dark")
    })
  }

  setTheme(root.dataset.theme || "light")

  const toc = document.querySelector("[data-toc]")
  const tocList = document.querySelector("[data-toc-list]")
  const content = document.querySelector(".post-content")
  if (toc && tocList && content) {
    const headings = Array.from(content.querySelectorAll("h2, h3"))
    if (headings.length === 0) {
      toc.classList.add("is-empty")
    } else {
      headings.forEach(function (heading, index) {
        if (!heading.id) {
          heading.id = heading.textContent
            .trim()
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^\w가-힣-]/g, "") || "section-" + index
        }
        const item = document.createElement("li")
        item.className = heading.tagName === "H3" ? "depth-3" : "depth-2"
        const link = document.createElement("a")
        link.href = "#" + heading.id
        link.textContent = heading.textContent
        item.appendChild(link)
        tocList.appendChild(item)
      })
    }
  }

  document.querySelectorAll(".highlighter-rouge").forEach(function (block) {
    if (block.closest(".code-frame")) return
    const pre = block.querySelector("pre")
    if (!pre) return

    const langClass = Array.from(block.classList).find(function (className) {
      return className.indexOf("language-") === 0
    })
    const label = langClass ? langClass.replace("language-", "") : "code"
    const frame = document.createElement("div")
    frame.className = "code-frame"
    const bar = document.createElement("div")
    bar.className = "code-bar"
    const name = document.createElement("span")
    name.textContent = label
    const copy = document.createElement("button")
    copy.type = "button"
    copy.className = "copy-code"
    copy.textContent = "copy"
    copy.addEventListener("click", function () {
      navigator.clipboard.writeText(pre.textContent || "")
      copy.textContent = "copied"
      window.setTimeout(function () {
        copy.textContent = "copy"
      }, 1200)
    })
    bar.appendChild(name)
    bar.appendChild(copy)
    block.parentNode.insertBefore(frame, block)
    frame.appendChild(bar)
    frame.appendChild(block)
  })
})()
