import { useNavigate } from "react-router-dom"
import { Tag } from "@/components/tag/tag"
import { Favorite } from "@/components/favorite/favorite"
import { InlineMarkdown } from "@/components/util/inlineMarkdown"
import styles from "@/css/favoriteArticleCard.module.css"
import { useArticle } from "@/lib/hooks/useArticle"

type Props = {
  id: string
}

export function FavoriteArticleCard({ id }: Props) {
  const { data, isLoading } = useArticle(id)
  const navigate = useNavigate()
  if (isLoading) return <li className={styles.loading}>Loading...</li>
  if (!data) return null

  return (
    <div
      className={styles.articleRankingCard}
      onClick={() => navigate(`/article/${data.id}`)}
      style={{ cursor: "pointer" }}
    >
      <h2 className={styles.articleRankingTitle}>
        <InlineMarkdown content={data.title} />
      </h2>

      <Tag categories={data.categories} />

      <div className={styles.articleRankingFooter}>
        <Favorite category="article" id={String(data.id)} />
        <span className={styles.articleRankingDate}>
          更新日：{new Date(data.updatedAt).toLocaleDateString()}
        </span>
      </div>
    </div>
  )
}