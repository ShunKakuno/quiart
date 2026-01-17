import { 
  useDailyQuiz, 
  usePopularQuizRanking, 
  useUnpopularQuizRanking, 
  usePopularArticleRanking, 
  useUnpopularArticleRanking 
} from "@/lib/hooks/useTop"
import { QuizCard } from "@/components/card/quizCard"
import { ArticleRanking } from "@/components/ranking/ArticleRanking"
import { QuizRanking } from "@/components/ranking/QuizRanking"
import "@/css/top.css"

export function Top() {
  const { data: dailyQuizData, isLoading: isDailyQuizLoading } = useDailyQuiz()
  const { data: popularQuizRankingData, isLoading: isPopularQuizRankingLoading } = usePopularQuizRanking()
  const { data: unpopularQuizRankingData, isLoading: isUnpopularQuizRankingLoading } = useUnpopularQuizRanking()
  const { data: popularArticleRankingData, isLoading: isPopularArticleRankingLoading } = usePopularArticleRanking()
  const { data: unpopularArticleRankingData, isLoading: isUnpopularArticleRankingLoading } = useUnpopularArticleRanking()

  return (
    <div>
      <h1>今日のクイズ</h1>
      {!isDailyQuizLoading ? (
        <div>
          {dailyQuizData!.map(q => (
            <div key={q.id} className="quiz-grid">
              <QuizCard 
                quiz={q}
              />
            </div>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <h1>クイズアクセス数ランキング</h1>
        {!isPopularQuizRankingLoading ? (
        <div>
          <div className="quiz-grid">
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
            <div className="quiz-grid">
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
          <div className="quiz-grid">
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
            <div key={a.id} className="quiz-grid">
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
  )
}
