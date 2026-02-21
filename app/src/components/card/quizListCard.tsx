import { useNavigate } from "react-router-dom"
import type { Quiz } from "@/lib/types/quiz"
import { Tag } from "@/components/tag/tag"
import { Favorite } from "@/components/favorite/favorite"
import { InlineMarkdown } from "@/components/util/inlineMarkdown"
import styles from "@/css/quizListCard.module.css"

type Props = {
  item: Quiz
}

export function QuizListCard({ item }: Props) {
  const navigate = useNavigate()
  return (
    <div
      className={styles.quizRankingCard}
      onClick={() => navigate(`/quiz/${item.id}`)}
      style={{ cursor: "pointer" }}
    >
    <h2 className={styles.quizRankingTitle}><InlineMarkdown content={item.title} /></h2>
    <Tag categories={item.categories} />
    <div className={styles.quizRankingFooter}>
      <Favorite category="quiz" id={String(item.id)} />
      <span className={styles.quizRankingDate}>
        作成日：{new Date(item.createdAt).toLocaleDateString()}
      </span>
    </div>
  </div>
  )
}
