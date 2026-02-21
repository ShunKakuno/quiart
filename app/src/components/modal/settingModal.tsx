import { useState } from "react"
import styles from "@/css/settingModal.module.css"

type Props = {
  onClose: () => void
}

export function SettingModal({ onClose }: Props) {
  const [input, setInput] = useState("")
  const [tags, setTags] = useState<string[]>(() => {
    if (typeof window === "undefined") return []

    const stored = localStorage.getItem("customTags")
    return stored ? JSON.parse(stored) : []
  })

  const addTag = () => {
    if (!input.trim()) return

    const newTags = [...tags, input.trim()]
    setTags(newTags)
    localStorage.setItem("customTags", JSON.stringify(newTags))
    setInput("")
  }

  const removeTag = (tag: string) => {
    const newTags = tags.filter(t => t !== tag)
    setTags(newTags)
    localStorage.setItem("customTags", JSON.stringify(newTags))
  }
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.title}>お気に入りタグ設定</h2>

        <div className={styles.inputRow}>
        <input
          className={styles.input}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault()
              addTag()
            }
          }}
          placeholder="タグを入力"
        />
          <button className={styles.addButton} onClick={addTag}>
            追加
          </button>
        </div>

        <div className={styles.tagList}>
          {tags.map(tag => (
            <span
              key={tag}
              className={styles.tag}
              onClick={() => removeTag(tag)}
            >
              {tag} ×
            </span>
          ))}
        </div>

        <button className={styles.closeButton} onClick={onClose}>
          閉じる
        </button>
      </div>
    </div>
  )
}
