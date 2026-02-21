import { Link } from "react-router-dom"
import { useMemo } from "react"
import styles from "@/css/tag.module.css"

type Categories = {
  categories: string[]
}

export function Tag({ categories }: Categories) {

  const customTags = useMemo(() => {
    if (typeof window === "undefined") return []
    const stored = localStorage.getItem("customTags")
    return stored ? JSON.parse(stored) as string[] : []
  }, [])

  return (
    <>
      {categories.length > 0 && (
        <div className={styles.tags}>
          {categories.map(category => {
            const isCustom = customTags.some(
              t => t.toLowerCase() === category.toLowerCase()
            )

            return (
              <Link
                key={category}
                to={`/category/${encodeURIComponent(category)}`}
                className={`${styles.tag} ${isCustom ? styles.customTag : ""}`}
                onClick={(e) => e.stopPropagation()}
              >
                {category}
              </Link>
            )
          })}
        </div>
      )}
    </>
  )
}
