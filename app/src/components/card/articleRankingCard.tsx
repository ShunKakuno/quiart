import { Link } from "react-router-dom"
import type { Article } from "@/lib/types/article"
import "@/css/articleRankingCard.css"

type Props = {
  item: Article
}

export function ArticleRankingCard({ item }: Props) {
  return (
    <Link to={`/article/${item.id}`} className="article-ranking-card">
      <h2 className="article-ranking-title">{item.title}</h2>

      <div className="article-ranking-footer">
        <span className="article-ranking-date">
          {new Date(item.createdAt).toLocaleDateString()}
        </span>
      </div>
    </Link>
  )
}
