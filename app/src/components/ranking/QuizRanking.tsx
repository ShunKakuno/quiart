import { QuizListCard } from "@/components/card/quizListCard"
import type { Quiz } from "@/lib/types/quiz"
import styles from "@/css/quizRanking.module.css"

type QuizRankingProps = {
  quizzes: Quiz[]
  isLoading: boolean
}

export function QuizRanking({ quizzes, isLoading }: QuizRankingProps) {
  return (
    <div className={styles.quizSection}>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {quizzes.map(quiz => (
            <div key={quiz.id} className={styles.quizGrid}>
              <QuizListCard item={quiz} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
