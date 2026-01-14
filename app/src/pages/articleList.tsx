import { useArticleList } from "@/lib/hooks/useArticleList"
import { Link } from "react-router-dom"
import "@/css/articleList.css"
import type { Article as ArticleType } from "@/lib/types/article"

export function ArticleList() {
  const { data, isLoading } = useArticleList()

  return (
    <>
      {isLoading ? (
        <p className="loading">Loading...</p>
      ) : (
        <div className="article-list">
          {data!.map((article: ArticleType) => (
            <Link
              to={`/article/${article.id}`} 
              key={article.id} 
              className="article-card"
            >
              <h2 className="article-title">{article.title}</h2>
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
            </Link>
          ))}
        </div>
      )}
    </>
  )
}
