import { useParams } from "react-router-dom"
import { useEffect } from "react"
import { useArticle } from "@/lib/hooks/useArticle"
import { useQuizWithArticle } from "@/lib/hooks/useQuizWithArticle"
import { useIncrementArticleView } from "@/lib/hooks/useIncrementArticleView"
import { PageLayout } from "@/pageLayout"
import { QuizCard } from "@/components/card/quizCard"
import { Tag } from "@/components/tag/tag"
import { ArticleMarkdown } from "@/components/util/articleMarkdown"
import { HatenaBookMark } from "@/components/util/hatenabookmark"
import styles from "@/css/article.module.css"

export function Article() {
  const { id } = useParams<{ id: string }>()

  const { data: article, isLoading: isArticleLoading, error: articleError } =
    useArticle(id)

  const {
    data: quizzes,
    isLoading: isQuizLoading,
    error: quizError,
  } = useQuizWithArticle(id)

  const incrementView = useIncrementArticleView()

  useEffect(() => {
    if (!id) return
    incrementView.mutate(id)
  }, [id])

  if (isArticleLoading || isQuizLoading) {
    return <p className="loading">Loading...</p>
  }

  if (articleError || !article) {
    return <p className="loading">記事が見つかりません</p>
  }

  if (quizError) {
    return <p className="loading">クイズの取得に失敗しました</p>
  }

  return (
    <PageLayout>
      <div className={styles.articleDetail}>
        <h1 className={styles.articleTitle}>{article.title}</h1>
        <p className={styles.articleDate}>
          更新日: {article.updatedAt.slice(0, 10)}
        </p>
        <Tag categories={article.categories} />
        <div className={styles.articleContent}>
          <ArticleMarkdown content={article.content} />
        </div>
      </div>
      <div>
        {quizzes && quizzes.length > 0 && (
        <div className={styles.quizGrid}>
          {quizzes.map(q => (
            <QuizCard key={q.id} quiz={q} />
          ))}
        </div>
        )}
      </div>
      <HatenaBookMark />
    </PageLayout>
  )
}
