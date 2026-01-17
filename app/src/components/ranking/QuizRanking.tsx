import { QuizRankingCard } from "@/components/card/quizRankingCard"
import "@/css/top.css"
import type { Quiz } from "@/lib/types/quiz"

type QuizRankingProps = {
  quizzes: Quiz[]
  isLoading: boolean
}

export function QuizRanking({ quizzes, isLoading }: QuizRankingProps) {
  return (
    <div className="quiz-section">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {quizzes.map(quiz => (
            <div key={quiz.id} className="quiz-grid">
              <QuizRankingCard item={quiz} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}