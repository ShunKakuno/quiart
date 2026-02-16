import { Link } from "react-router-dom"
import styles from "@/css/tag.module.css"

type Categories = {
  categories: string[]
}

export function Tag({ categories }: Categories) {
  return (
    <>
      {categories.length > 0 && (
        <div className={styles.tags}>
          {categories.map(category => (
            <Link
              key={category}
              to={`/category/${encodeURIComponent(category)}`}
              className={styles.tag}
              onClick={(e) => e.stopPropagation()}
            >
              {category}
            </Link>
          ))}
        </div>
      )}
    </>
  )
}
