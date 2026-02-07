import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import remarkBreaks from "remark-breaks"
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
        remarkPlugins={[remarkGfm, remarkBreaks]}
        rehypePlugins={[[rehypeHighlight, { hljs }]]}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
