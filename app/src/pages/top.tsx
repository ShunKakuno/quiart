import { useQuiz } from "@/lib/hooks/useQuiz"
import { QuizCard } from "@/components/card/quizCard"

export function Top() {
  const { data, isLoading } = useQuiz()

  return (
    <div>
      <h1>今日のクイズ</h1>
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
    </div>
  )
}
