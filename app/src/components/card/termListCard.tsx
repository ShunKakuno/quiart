import { useNavigate } from "react-router-dom"
import type { Term } from "@/lib/types/term"
import { Tag } from "@/components/tag/tag"
import { InlineMarkdown } from "@/components/util/inlineMarkdown"
import styles from "@/css/termListCard.module.css"

type Props = {
  item: Term
}

export function TermListCard({ item }: Props) {
  const navigate = useNavigate()
  return (
    <div
      className={styles.termsContent}
      onClick={() => navigate(`/term/${item.id}`)}
      style={{ cursor: "pointer" }}
    >
      <h2 className={styles.termsTitle}><InlineMarkdown content={item.term} /></h2>
      <Tag categories={item.categories} />
      <div className={styles.termFooter}>
        <span className={styles.termDate}>
          作成日：{new Date(item.createdAt).toLocaleDateString()}
        </span>
      </div>
    </div>
  )
}
