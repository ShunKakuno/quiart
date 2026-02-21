import { useState } from 'react'
import styles from "@/css/favorite.module.css"
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

type Props = {
  id: string
  category: "article" | "quiz" | "term"
}

const storageKeyMap = {
  quiz: "favoriteQuizzes",
  article: "favoriteArticles",
  term: "favoriteTerms",
} as const

export function Favorite({ category, id }: Props) {
  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation()

    const key = storageKeyMap[category]
    const stored = localStorage.getItem(key)
    let arr: string[] = stored ? JSON.parse(stored) : []

    if (arr.includes(id)) {
      arr = arr.filter(v => v !== id)
      setIsFavorite(false)
    } else {
      arr.push(id)
      setIsFavorite(true)
    }

    localStorage.setItem(key, JSON.stringify(arr))
  }

  const [isFavorite, setIsFavorite] = useState(() => {
    if (typeof window === "undefined") return false

    const key = storageKeyMap[category]
    const stored = localStorage.getItem(key)
    if (!stored) return false

    const arr: string[] = JSON.parse(stored)
    return arr.includes(id)
  })

  return (
    <div onClick={toggleFavorite} className={styles.heart} style={{ cursor: "pointer" }}>
      {isFavorite ? (
        <AiFillHeart color="red" size={20} />
      ) : (
        <AiOutlineHeart size={20} />
      )}
    </div>
  )
}
