import { useQuiz } from "@/lib/hooks/useQuiz"
import { QuizCard } from "@/components/card/quizCard"
import "@/css/quiz.css"

export function Quiz() {
  const { data, isLoading } = useQuiz()

  return (
    <>
      {!isLoading ? (
        <div>
          {data!.map(q => (
            <div className="quiz-grid" key={q.id}>
              <QuizCard 
                quiz={q}
              />
            </div>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  )
}
