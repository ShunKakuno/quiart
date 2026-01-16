import { useState } from "react"
import { usePostArticle } from "@/lib/hooks/usePostArticle"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import "@/css/postArticle.css"
import "@/css/article.css"

export function PostArticle() {
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [tagsInput, setTagsInput] = useState("")
  const [tags, setTagss] = useState<string[]>([])
  const post = usePostArticle()

  const addtags = () => {
    const t = tagsInput.trim()
    if (!t || tags.includes(t)) return
    setTagss([...tags, t])
    setTagsInput("")
  }

  const removetags = (t: string) => {
    setTagss(tags.filter(tag => tag !== t))
  }

  return (
    <div className="article-container">
      <h1 className="article-title">記事作成</h1>

      <input
        className="article-input"
        placeholder="タイトル"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      {/* ===== エディタ + プレビュー ===== */}
      <div className="editor-wrapper">
        <textarea
          className="article-textarea"
          placeholder="本文（Markdown可）"
          value={body}
          onChange={e => setBody(e.target.value)}
          onKeyDown={e => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault()
              setBody(prev => prev + "  \n")
            }
          }}
        />
        <div className="article-preview">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
          >
            {body || "ここにプレビューが表示されます"}
          </ReactMarkdown>
        </div>
      </div>

      {/* ===== タグ入力 ===== */}
      <div className="tags-box">
        <input
          className="tags-input"
          placeholder="タグを入力してEnter"
          value={tagsInput}
          onChange={e => setTagsInput(e.target.value)}
          onKeyDown={e => {
            if (e.key === "Enter") {
              e.preventDefault()
              addtags()
            }
          }}
        />
        <div className="tags-list">
          {tags.map(t => (
            <span key={t} className="tags-chip" onClick={() => removetags(t)}>
              #{t} ×
            </span>
          ))}
        </div>
      </div>

      <button
        onClick={() => post.mutate({ title, body, tags })}
        className="article-button"
      >
        Qiitaに投稿
      </button>

      {post.isSuccess && <p className="article-success">投稿完了！</p>}
      {post.isError && <p className="article-error">エラーが発生しました</p>}
    </div>
  )
}
