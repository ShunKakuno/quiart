import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeHighlight from "rehype-highlight"
import styles from "@/css/inlineMarkdown.module.css"
import hljs from "highlight.js/lib/core"

type Props = {
  content: string
}

export function InlineMarkdown({ content }: Props) {
  return (
    <div className={styles.inlineMarkdown}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[[rehypeHighlight, { hljs }]]}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
