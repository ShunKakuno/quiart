import { Link } from "react-router-dom"
import type { Quiz } from "@/lib/types/quiz"
import "@/css/quizRankingCard.css"

type Props = {
  item: Quiz
}

export function QuizRankingCard({ item }: Props) {
  return (
    <Link to={`/quiz/${item.id}`} className="quiz-ranking-card">
      <h2 className="quiz-ranking-title">{item.title}</h2>
    </Link>
  )
}
