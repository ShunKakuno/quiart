import { Link } from "react-router-dom"
import type { Article } from "@/lib/types/article"
import { Tag } from "@/components/tag/tag"
import { InlineMarkdown } from "@/components/util/inlineMarkdown"
import styles from "@/css/articleListCard.module.css"

type Props = {
  item: Article
}

export function ArticleListCard({ item }: Props) {
  return (
    <Link to={`/article/${item.id}`} className={styles.articleRankingCard}>
      <h2 className={styles.articleRankingTitle}><InlineMarkdown content={item.title} /></h2>
      <Tag categories={item.categories} />
      <div className={styles.articleRankingFooter}>
        <span className={styles.articleRankingDate}>
          更新日：{new Date(item.updatedAt).toLocaleDateString()}
        </span>
      </div>
    </Link>
  )
}
