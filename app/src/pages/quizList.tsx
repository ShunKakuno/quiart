import { useQuizList } from "@/lib/hooks/useQuizList"
import { PageLayout } from "@/pageLayout"
import { QuizListCard } from "@/components/card/quizListCard"
import styles from "@/css/quizList.module.css"

export function QuizList() {
  const { data, isLoading } = useQuizList()

  if (isLoading) return <p>Loading...</p>

  return (
    <PageLayout>
      <div className={styles.quizList}>
        {data!.map(quiz => (
          <QuizListCard key={quiz.id} item={quiz} />
        ))}
      </div>
    </PageLayout>
  )
}
