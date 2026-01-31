import { useState } from "react"
import { useAdminDashboard } from "@/lib/hooks/useAdminDashboard"
import { usePostArticle } from "@/lib/hooks/usePostArticle"
import { ArticleMarkdown } from "@/components/util/articleMarkdown"
import styles from "@/css/postArticle.module.css"

export function PostArticle() {
  const { data: admin, isLoading } = useAdminDashboard()
  if (isLoading) return <p>読み込み中...</p>
  if (!admin) return <p>ログインしてください</p>
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
    <div className={styles.articleContainer}>
      <h1 className={styles.articleTitle}>記事作成</h1>

      <input
        className={styles.articleInput}
        placeholder="タイトル"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      {/* ===== エディタ + プレビュー ===== */}
      <div className={styles.editorWrapper}>
        <textarea
          className={styles.articleTextarea}
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
        <div className={styles.articlePreview}>
          <ArticleMarkdown content={body || "ここにプレビューが表示されます"} />
        </div>
      </div>

      {/* ===== タグ入力 ===== */}
      <div className={styles.tagsBox}>
        <input
          className={styles.tagsInput}
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
        <div className={styles.tagsList}>
          {tags.map(t => (
            <span key={t} className={styles.tagsChip} onClick={() => removetags(t)}>
              #{t} ×
            </span>
          ))}
        </div>
      </div>

      <button
        onClick={() => post.mutate({ title, body, tags })}
        className={styles.articleButton}
      >
        Qiitaに投稿
      </button>

      {post.isSuccess && <p className={styles.articleSuccess}>投稿完了！</p>}
      {post.isError && <p className={styles.articlError}>エラーが発生しました</p>}
    </div>
  )
}
