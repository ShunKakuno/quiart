import "@/css/top.css"
import type { Article } from "@/lib/types/article"
import { ArticleRankingCard } from "@/components/card/articleRankingCard"

type ArticleRankingProps = {
  articles: Article[]
  isLoading: boolean
}

export function ArticleRanking({ articles, isLoading }: ArticleRankingProps) {
  return (
    <div className="quiz-section">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {articles.map(article => (
            <div key={article.id} className="article-grid">
              <ArticleRankingCard item={article} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
