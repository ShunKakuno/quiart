import { useQuizList } from "@/lib/hooks/useQuizList"
import { Link } from "react-router-dom"
import { PageLayout } from "@/pageLayout"
import "@/css/quizList.css"

export function QuizList() {
  const { data, isLoading } = useQuizList()

  if (isLoading) return <p>Loading...</p>

  return (
    <PageLayout>
      <div className="quiz-list">
        {data!.map(quiz => (
          <Link
            to={`/quiz/${quiz.id}`}
            key={quiz.id}
            className="quiz-content"
          >
            <h2 className="quiz-title">{quiz.title}</h2>
          </Link>
        ))}
      </div>
    </PageLayout>
  )
}
