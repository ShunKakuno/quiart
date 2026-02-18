import { useNavigate } from "react-router-dom"
import type { Article } from "@/lib/types/article"
import { Tag } from "@/components/tag/tag"
import { InlineMarkdown } from "@/components/util/inlineMarkdown"
import styles from "@/css/articleListCard.module.css"

type Props = {
  item: Article
}

export function ArticleListCard({ item }: Props) {
  const navigate = useNavigate()

  return (
    <div
      className={styles.articleRankingCard}
      onClick={() => navigate(`/article/${item.id}`)}
      style={{ cursor: "pointer" }}
    >
      <h2 className={styles.articleRankingTitle}>
        <InlineMarkdown content={item.title} />
      </h2>

      <Tag categories={item.categories} />

      <div className={styles.articleRankingFooter}>
        <span className={styles.articleRankingDate}>
          更新日：{new Date(item.updatedAt).toLocaleDateString()}
        </span>
      </div>
    </div>
  )
}
