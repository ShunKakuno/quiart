import { useArticleList } from "@/lib/hooks/useArticleList"
import { Link } from "react-router-dom"
import { PageLayout } from "@/pageLayout"
import { Tag } from "@/components/tag/tag"
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
            <Link
              to={`/article/${article.id}`} 
              key={article.id} 
              className={styles.articleCard}
            >
              <h2 className={styles.articleTitle}>{article.title}</h2>
              <p className={styles.articleDate}>
                更新日: {article.updatedAt.slice(0, 10).replace(/\//g, "年").replace("年", "年").replace("年", "年")}
              </p>
              <Tag categories={article.categories} />
            </Link>
          ))}
        </div>
      )}
    </PageLayout>
  )
}
