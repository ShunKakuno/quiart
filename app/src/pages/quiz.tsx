import { useQuiz } from "@/lib/hooks/useQuiz"
import { QuizCard } from "@/components/card/quizCard"

export function Quiz() {
  const { data, isLoading } = useQuiz()

  return (
    <>
      {!isLoading ? (
        <div>
          {data!.map(q => (
            <div key={q.id}>
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
