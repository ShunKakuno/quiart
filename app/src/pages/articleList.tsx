import { useArticleList } from "@/lib/hooks/useArticleList"
import { PageLayout } from "@/pageLayout"
import { ArticleListCard } from "@/components/card/articleListCard"
import styles from "@/css/articleList.module.css"
import type { Article as ArticleType } from "@/lib/types/article"

export function ArticleList() {
  const { data, isLoading } = useArticleList()

  return (
    <PageLayout>
      {isLoading ? (
        <p className="loading">Loading...</p>
      ) : (
        <div className={styles.articleList}>
          {data!.map((article: ArticleType) => (
            <div key={article.id} className={styles.articleGrid}>
              <ArticleListCard item={article} />
            </div>
          ))}
        </div>
      )}
    </PageLayout>
  )
}
