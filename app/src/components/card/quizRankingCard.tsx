import { Link } from "react-router-dom"
import type { Quiz } from "@/lib/types/quiz"
import { Tag } from "@/components/tag/tag"
import { Markdown } from "@/components/util/markdown"
import styles from "@/css/quizRankingCard.module.css"

type Props = {
  item: Quiz
}

export function QuizRankingCard({ item }: Props) {
  return (
    <Link to={`/quiz/${item.id}`} className={styles.quizRankingCard}>
    <h2 className={styles.quizRankingTitle}><Markdown content={item.title} /></h2>
    <Tag categories={item.categories} />
    <div className={styles.quizRankingFooter}>
      <span className={styles.quizRankingDate}>
        作成日：{new Date(item.createdAt).toLocaleDateString()}
      </span>
    </div>
  </Link>
  )
}
