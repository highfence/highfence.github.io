import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

const PostBackLink: QuartzComponent = ({ fileData }: QuartzComponentProps) => {
  if (!fileData.slug?.startsWith("posts/")) {
    return null
  }

  return (
    <a class="post-back-link" href="/posts/">
      ← 목록으로
    </a>
  )
}

export default (() => PostBackLink) satisfies QuartzComponentConstructor
