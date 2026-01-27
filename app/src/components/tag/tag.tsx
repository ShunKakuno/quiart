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
            <span key={category} className={styles.tag}>{category}</span>
            ))}
        </div>
        )}
    </>
  )
}