import { useTop } from "@/lib/hooks/useTop"
import { QuizCard } from "@/components/card/quizCard"
import "@/css/top.css"

export function Top() {
  const { data, isLoading } = useTop()

  return (
    <div>
      <h1>今日のクイズ</h1>
      {!isLoading ? (
        <div>
          {data!.map(q => (
            <div key={q.id} className="quiz-grid">
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
