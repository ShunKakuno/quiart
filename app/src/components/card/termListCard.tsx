import { Link } from "react-router-dom"
import type { Term } from "@/lib/types/term"
import { Tag } from "@/components/tag/tag"
import { InlineMarkdown } from "@/components/util/inlineMarkdown"
import styles from "@/css/termListCard.module.css"

type Props = {
  item: Term
}

export function TermListCard({ item }: Props) {
  return (
    <Link
      to={`/term/${item.id}`}
      key={item.id}
      className={styles.termsContent}
    >
      <h2 className={styles.termsTitle}><InlineMarkdown content={item.term} /></h2>
      <Tag categories={item.categories} />
      <div className={styles.termFooter}>
        <span className={styles.termDate}>
        作成日：{new Date(item.createdAt).toLocaleDateString()}
      </span>
    </div>
    </Link>
  )
}
