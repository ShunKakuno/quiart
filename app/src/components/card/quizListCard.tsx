import { Link } from "react-router-dom"
import type { Quiz } from "@/lib/types/quiz"
import { Tag } from "@/components/tag/tag"
import { InlineMarkdown } from "@/components/util/inlineMarkdown"
import styles from "@/css/quizListCard.module.css"

type Props = {
  item: Quiz
}

export function QuizListCard({ item }: Props) {
  return (
    <Link to={`/quiz/${item.id}`} className={styles.quizRankingCard}>
    <h2 className={styles.quizRankingTitle}><InlineMarkdown content={item.title} /></h2>
    <Tag categories={item.categories} />
    <div className={styles.quizRankingFooter}>
      <span className={styles.quizRankingDate}>
        作成日：{new Date(item.createdAt).toLocaleDateString()}
      </span>
    </div>
  </Link>
  )
}
