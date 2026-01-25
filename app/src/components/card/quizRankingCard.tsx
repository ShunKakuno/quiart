import { Link } from "react-router-dom"
import type { Quiz } from "@/lib/types/quiz"
import "@/css/quizRankingCard.css"
import "@/css/tag.css"

type Props = {
  item: Quiz
}

export function QuizRankingCard({ item }: Props) {
  return (
    <Link to={`/quiz/${item.id}`} className="quiz-ranking-card">
    <h2 className="quiz-ranking-title">{item.title}</h2>
    {item.categories.length > 0 && (
      <div className="quiz-tags">
        {item.categories.map(category => (
          <span key={category} className="tag">{category}</span>
        ))}
      </div>
    )}
    <div className="quiz-ranking-footer">
      <span className="quiz-ranking-date">
        作成日：{new Date(item.createdAt).toLocaleDateString()}
      </span>
    </div>
  </Link>
  )
}
