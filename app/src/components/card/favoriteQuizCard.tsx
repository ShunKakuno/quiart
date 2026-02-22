import { useNavigate } from "react-router-dom"
import { Tag } from "@/components/tag/tag"
import { Favorite } from "@/components/favorite/favorite"
import { InlineMarkdown } from "@/components/util/inlineMarkdown"
import styles from "@/css/favoriteQuizCard.module.css"
import { useQuiz } from "@/lib/hooks/useQuiz"

type Props = {
  id: string
}

export function FavoriteQuizCard({ id }: Props) {
  const { data, isLoading } = useQuiz(id)
  const navigate = useNavigate()
  if (isLoading) return <li className={styles.loading}>Loading...</li>
  if (!data) return null

  return (
    <div
      className={styles.quizRankingCard}
      onClick={() => navigate(`/quiz/${data.id}`)}
      style={{ cursor: "pointer" }}
    >
    <h2 className={styles.quizRankingTitle}><InlineMarkdown content={data.title} /></h2>
    <Tag categories={data.categories} />
    <div className={styles.quizRankingFooter}>
      <Favorite category="quiz" id={String(data.id)} />
      <span className={styles.quizRankingDate}>
        作成日：{new Date(data.createdAt).toLocaleDateString()}
      </span>
    </div>
  </div>
  )
}
