import { useQuizList } from "@/lib/hooks/useQuizList"
import { Link } from "react-router-dom"
import { PageLayout } from "@/pageLayout"
import { Markdown } from "@/components/util/markdown"
import styles from "@/css/quizList.module.css"

export function QuizList() {
  const { data, isLoading } = useQuizList()

  if (isLoading) return <p>Loading...</p>

  return (
    <PageLayout>
      <div className={styles.quizList}>
        {data!.map(quiz => (
          <Link
            to={`/quiz/${quiz.id}`}
            key={quiz.id}
            className={styles.quizContent}
          >
            <h2 className={styles.quizTitle}><Markdown content={quiz.title} /></h2>
          </Link>
        ))}
      </div>
    </PageLayout>
  )
}
