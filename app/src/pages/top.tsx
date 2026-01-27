import { 
  useLatestQuiz, 
  useLatestArticle,
  usePopularQuizRanking, 
  useUnpopularQuizRanking, 
  usePopularArticleRanking, 
  useUnpopularArticleRanking 
} from "@/lib/hooks/useTop"
import { QuizCard } from "@/components/card/quizCard"
import { ArticleRanking } from "@/components/ranking/articleRanking"
import { QuizRanking } from "@/components/ranking/quizRanking"
import { PageLayout } from "@/pageLayout"
import styles from "@/css/top.module.css"

export function Top() {
  const { data: latestQuizData, isLoading: isLatestQuizLoading } = useLatestQuiz()
  const { data: latestArticleData, isLoading: isLatestArticleLoading } = useLatestArticle()
  const { data: popularQuizRankingData, isLoading: isPopularQuizRankingLoading } = usePopularQuizRanking()
  const { data: unpopularQuizRankingData, isLoading: isUnpopularQuizRankingLoading } = useUnpopularQuizRanking()
  const { data: popularArticleRankingData, isLoading: isPopularArticleRankingLoading } = usePopularArticleRanking()
  const { data: unpopularArticleRankingData, isLoading: isUnpopularArticleRankingLoading } = useUnpopularArticleRanking()

  return (
    <PageLayout>
      <div>
        <h1>最新のクイズ</h1>
        {!isLatestQuizLoading ? (
          <div>
            {latestQuizData!.map(q => (
              <div key={q.id} className={styles.quizGrid}>
                <QuizCard 
                  quiz={q}
                />
              </div>
            ))}
          </div>
        ) : (
          <p>Loading...</p>
        )}
        <h1>最新の記事</h1>
          {!isLatestArticleLoading ? (
          <div>
              <div className={styles.quizGrid}>
                <ArticleRanking 
                  articles={latestArticleData || []}
                  isLoading={isLatestArticleLoading}
                />
              </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
        <h1>クイズアクセス数ランキング</h1>
          {!isPopularQuizRankingLoading ? (
          <div>
            <div className={styles.quizGrid}>
              <QuizRanking 
                quizzes={popularQuizRankingData || []}
                isLoading={isPopularQuizRankingLoading}
              />
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
        <h1>記事アクセス数ランキング</h1>
          {!isPopularArticleRankingLoading ? (
          <div>
              <div className={styles.quizGrid}>
                <ArticleRanking 
                  articles={popularArticleRankingData || []}
                  isLoading={isPopularArticleRankingLoading}
                />
              </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
        <h1>不人気クイズランキング</h1>
          {!isUnpopularQuizRankingLoading ? (
          <div>
            <div className={styles.quizGrid}>
              <QuizRanking 
                quizzes={unpopularQuizRankingData || []}
                isLoading={isUnpopularQuizRankingLoading}
              />
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
        <h1>不人気記事ランキング</h1>
          {!isUnpopularArticleRankingLoading ? (
          <div>
            {unpopularArticleRankingData!.map(a => (
              <div key={a.id} className={styles.quizGrid}>
                <ArticleRanking 
                  articles={unpopularArticleRankingData || []}
                  isLoading={isUnpopularArticleRankingLoading}
                />
              </div>
            ))}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </PageLayout>
  )
}
