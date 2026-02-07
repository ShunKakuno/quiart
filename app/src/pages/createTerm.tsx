import { useState } from "react"
import { useCreateTerm } from "@/lib/hooks/useCreateTerm"
import { useAdminDashboard } from "@/lib/hooks/useAdminDashboard"
import { useAdminTermsRecommend } from "@/lib/hooks/useAdminTermsRecommend"
import { normalizeForSearch } from "@/lib/normalizeForSearch"
import styles from "@/css/createTerm.module.css"

export function CreateTerm() {
  const [term, setTerm] = useState("")
  const [description, setDescription] = useState("")
  const [categoryInput, setCategoryInput] = useState("")
  const [categories, setCategories] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  const { data } = useAdminTermsRecommend(term)
  const recommends = data ?? []
  const exactHit = recommends?.find(
    r => normalizeForSearch(r.term) === normalizeForSearch(term)
  )
  const [isFocused, setIsFocused] = useState(false)

  const { data: admin } = useAdminDashboard()
  const post = useCreateTerm()
  
  if (!admin) return <p>ログインしてください</p>

  const addCategory = () => {
    const trimmed = categoryInput.trim()
    if (!trimmed) return
    if (categories.includes(trimmed)) return
    setCategories([...categories, trimmed])
    setCategoryInput("")
  }

  const removeCategory = (name: string) => {
    setCategories(categories.filter(c => c !== name))
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
        await post.mutateAsync({
        term,
        description,
        categories,
        })

        setTerm("")
        setDescription("")
        setCategories([])
        alert("用語を作成しました")
    } finally {
        setLoading(false)
    }
    }

    return (
    <div className={styles.container}>
        <h2 className={styles.title}>用語作成</h2>

        <div className={styles.field}>
        <label className={styles.label}>用語名</label>
<input
  className={styles.input}
  value={term}
  onChange={e => {
    setTerm(e.target.value)
  }}
  onFocus={() => setIsFocused(true)}
  onBlur={() => setTimeout(() => setIsFocused(false), 150)}
/>

{isFocused && term.length >= 2 && recommends?.length > 0 && (
  <div className={styles.suggestBox}>
    {recommends.map(r => (
      <div
        key={r.id}
        className={styles.suggestItem}
        onClick={() => {
          setTerm(r.term)
        }}
      >
        {r.term}
      </div>
    ))}
  </div>
)}

{exactHit && (
  <p className={styles.duplicateWarning}>
    ⚠ この用語は既に登録されています
  </p>
)}

        </div>

        <div className={styles.field}>
        <label className={styles.label}>説明</label>
        <textarea
            className={styles.textarea}
            value={description}
            onChange={e => setDescription(e.target.value)}
        />
        </div>

        <div className={styles.field}>
        <label className={styles.label}>カテゴリ追加</label>
        <div className={styles.categoryRow}>
            <input
            className={styles.input}
            value={categoryInput}
            onChange={e => setCategoryInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && addCategory()}
            />
            <button className={styles.addButton} onClick={addCategory}>
            追加
            </button>
        </div>
        </div>

        <div className={styles.tagList}>
        {categories.map(c => (
            <span
            key={c}
            className={styles.tag}
            onClick={() => removeCategory(c)}
            >
            {c} ×
            </span>
        ))}
        </div>

    <button
    className={styles.submitButton}
    onClick={handleSubmit}
    disabled={loading || !!exactHit}
    >
        {loading ? "作成中..." : "作成"}
        </button>
    </div>
    )
}
