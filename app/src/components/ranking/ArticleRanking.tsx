import type { Article } from "@/lib/types/article"
import { ArticleRankingCard } from "@/components/card/articleRankingCard"
import styles from "@/css/articleRanking.module.css"

type ArticleRankingProps = {
  articles: Article[]
  isLoading: boolean
}

export function ArticleRanking({ articles, isLoading }: ArticleRankingProps) {
  return (
    <div className={styles.quizSection}>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {articles.map(article => (
            <div key={article.id} className={styles.articleGrid}>
              <ArticleRankingCard item={article} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
