import { Link } from "react-router-dom"
import type { Article } from "@/lib/types/article"
import "@/css/articleRankingCard.css"
import "@/css/tag.css"

type Props = {
  item: Article
}

export function ArticleRankingCard({ item }: Props) {
  return (
    <Link to={`/article/${item.id}`} className="article-ranking-card">
      <h2 className="article-ranking-title">{item.title}</h2>
      {item.categories.length > 0 && (
        <div className="article-tags">
          {item.categories.map(category => (
            <span key={category} className="tag">{category}</span>
          ))}
        </div>
      )}
      <div className="article-ranking-footer">
        <span className="article-ranking-date">
          更新日：{new Date(item.updatedAt).toLocaleDateString()}
        </span>
      </div>
    </Link>
  )
}
