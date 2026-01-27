import { Link } from "react-router-dom"
import type { Article } from "@/lib/types/article"
import { Tag } from "@/components/tag/tag"
import styles from "@/css/articleRankingCard.module.css"

type Props = {
  item: Article
}

export function ArticleRankingCard({ item }: Props) {
  return (
    <Link to={`/article/${item.id}`} className={styles.articleRankingCard}>
      <h2 className={styles.articleRankingTitle}>{item.title}</h2>
      <Tag categories={item.categories} />
      <div className={styles.articleRankingFooter}>
        <span className={styles.articleRankingDate}>
          更新日：{new Date(item.updatedAt).toLocaleDateString()}
        </span>
      </div>
    </Link>
  )
}
