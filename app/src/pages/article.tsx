import { useParams } from "react-router-dom"
import { useArticle } from "@/lib/hooks/useArticle"
import "@/css/article.css"

export function Article() {
  const { id } = useParams<{ id: string }>()
  const { data: article, isLoading, error } = useArticle(id)

  if (isLoading) return <p className="loading">Loading...</p>
  if (error || !article) return <p className="loading">記事が見つかりません</p>

  return (
    <div className="article-detail">
      <h1 className="article-title">{article.title}</h1>
      <p className="article-date">
        作成日: {new Date(article.createdAt).toLocaleDateString()}
      </p>
      {article.tags.length > 0 && (
        <div className="article-tags">
          {article.tags.map(tag => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
      )}
      <div className="article-content">
        {article.content.split("\n").map((line, i) => (
          <p key={i}>{line}</p>
        ))}
      </div>
    </div>
  )
}
