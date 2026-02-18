import { useParams } from "react-router-dom"
import { useArticleByCategory } from "@/lib/hooks/useArticleByCategory"
import { useQuizByCategory } from "@/lib/hooks/useQuizByCategory"
import { PageLayout } from "@/pageLayout"
import { ArticleListCard } from "@/components/card/articleListCard"
import { QuizListCard } from "@/components/card/quizListCard"
import styles from "@/css/searchResult.module.css"
import type { Article as ArticleType } from "@/lib/types/article"
import type { Quiz as QuizType } from "@/lib/types/quiz"

export function SearchResult() {
  const { name } = useParams<{ name: string }>()
  const { data: articleData, isLoading: isArticleLoading } = useArticleByCategory(name)
  const { data: quizData, isLoading: isQuizLoading } = useQuizByCategory(name)
  return (
    <PageLayout>
      <p>「{name}」の検索結果</p>
      {isArticleLoading ? (
        <p className="loading">Loading...</p>
      ) : (
        articleData?.length != 0 && (
          <div className={styles.articleList}>
            <h1>記事一覧</h1>
            {articleData!.map((article: ArticleType) => (
              <div key={article.id}>
                <ArticleListCard item={article} />
              </div>
            ))}
          </div>
        )
      )}
      {isQuizLoading ? (
        <p className="loading">Loading...</p>
      ) : (
        quizData?.length != 0 && (
          <div className={styles.quizList}>
            <h1>クイズ一覧</h1>
            {quizData!.map((quiz: QuizType) => (
              <div key={quiz.id}>
                <QuizListCard item={quiz} />
              </div>
            ))}
          </div>
        )
      )}
    </PageLayout>
  )
}
