import { useParams } from "react-router-dom"
import { useEffect } from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { useArticle } from "@/lib/hooks/useArticle"
import { useQuizWithArticle } from "@/lib/hooks/useQuizWithArticle"
import { useIncrementArticleView } from "@/lib/hooks/useIncrementArticleView"
import { PageLayout } from "@/pageLayout"
import { QuizCard } from "@/components/card/quizCard"
import "@/css/article.css"

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
      <div className="article-detail">
        <h1 className="article-title">{article.title}</h1>

        <p className="article-date">
          更新日: {article.updatedAt.slice(0, 10)}
        </p>

        {article.tags.length > 0 && (
          <div className="article-tags">
            {article.tags.map(tag => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>
        )}

        <div className="article-content markdown">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {article.content}
          </ReactMarkdown>
        </div>
      </div>
      {quizzes && quizzes.length > 0 && (
      <div className="quiz-grid">
        {quizzes.map(q => (
          <QuizCard key={q.id} quiz={q} />
        ))}
      </div>
      )}
    </PageLayout>
  )
}
