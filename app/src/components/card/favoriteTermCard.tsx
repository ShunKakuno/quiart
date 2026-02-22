import { useNavigate } from "react-router-dom"
import { Tag } from "@/components/tag/tag"
import { Favorite } from "@/components/favorite/favorite"
import { InlineMarkdown } from "@/components/util/inlineMarkdown"
import styles from "@/css/favoriteTermCard.module.css"
import { useTerm } from "@/lib/hooks/useTerm"

type Props = {
  id: string
}

export function FavoriteTermCard({ id }: Props) {
  const { data, isLoading } = useTerm(id)
  const navigate = useNavigate()
  if (isLoading) return <li className={styles.loading}>Loading...</li>
  if (!data) return null

  return (
    <div
      className={styles.termsContent}
      onClick={() => navigate(`/term/${data.id}`)}
      style={{ cursor: "pointer" }}
    >
      <h2 className={styles.termsTitle}><InlineMarkdown content={data.term} /></h2>
      <Tag categories={data.categories} />
      <Favorite category="term" id={String(data.id)} />
      <div className={styles.termFooter}>
        <span className={styles.termDate}>
          作成日：{new Date(data.createdAt).toLocaleDateString()}
        </span>
      </div>
    </div>
  )
}
