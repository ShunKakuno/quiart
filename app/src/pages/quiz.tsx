import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useQuiz } from "@/lib/hooks/useQuiz"
import { QuizCard } from "@/components/card/quizCard"
import { useIncrementQuizView } from "@/lib/hooks/useIncrementQuizView"

export function Quiz() {
  const { id } = useParams<{ id: string }>()
  const { data: quiz, isLoading, error } = useQuiz(id)
  const incrementView = useIncrementQuizView()
  
  useEffect(() => {
    if (!id) return
    incrementView.mutate(id)
  }, [id])

  if (isLoading) return <p className="loading">Loading...</p>
  if (error || !quiz) return <p className="loading">クイズが見つかりません</p>

  return (
    <div>
      {!isLoading ? (
        <div>
              <QuizCard 
                quiz={quiz}
              />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )

}
