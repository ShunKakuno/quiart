import { useParams } from "react-router-dom"
import { useEffect } from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { useArticle } from "@/lib/hooks/useArticle"
import { useIncrementArticleView } from "@/lib/hooks/useIncrementArticleView"
import { PageLayout } from "@/pageLayout"
import "@/css/article.css"

export function Article() {
  const { id } = useParams<{ id: string }>()
  const { data: article, isLoading, error } = useArticle(id)
  const incrementView = useIncrementArticleView()

  useEffect(() => {
    if (!id) return
    incrementView.mutate(id)
  }, [id])

  if (isLoading) return <p className="loading">Loading...</p>
  if (error || !article) return <p className="loading">記事が見つかりません</p>

  return (
    <PageLayout>
      <div className="article-detail">
        <h1 className="article-title">{article.title}</h1>
        <p className="article-date">
          更新日: {article.updatedAt.slice(0, 10).replace(/\//g, "年").replace("年", "年").replace("年", "年")}
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
    </PageLayout>
  )
}
