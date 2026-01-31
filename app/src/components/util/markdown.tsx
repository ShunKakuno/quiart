import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeHighlight from "rehype-highlight"
import "highlight.js/styles/github-dark.css"
import "github-markdown-css/github-markdown.css"
import styles from "@/css/markdown.module.css"

import hljs from "highlight.js/lib/core"
import javascript from "highlight.js/lib/languages/javascript"
import typescript from "highlight.js/lib/languages/typescript"
import python from "highlight.js/lib/languages/python"
import java from "highlight.js/lib/languages/java"
import sql from "highlight.js/lib/languages/sql"
import bash from "highlight.js/lib/languages/bash"
import json from "highlight.js/lib/languages/json"

hljs.registerLanguage("javascript", javascript)
hljs.registerLanguage("js", javascript)
hljs.registerLanguage("typescript", typescript)
hljs.registerLanguage("ts", typescript)
hljs.registerLanguage("python", python)
hljs.registerLanguage("java", java)
hljs.registerLanguage("sql", sql)
hljs.registerLanguage("bash", bash)
hljs.registerLanguage("json", json)

type Props = {
  content: string
}

export function Markdown({ content }: Props) {
  return (
    <div className={`${styles.markdownBody} markdown-body`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[[rehypeHighlight, { hljs }]]}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
