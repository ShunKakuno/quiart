import { useMemo } from "react"
import { Link } from "react-router-dom"
import { PageLayout } from "@/pageLayout"
import { FavoriteArticleCard } from "@/components/card/favoriteArticleCard"
import { FavoriteQuizCard } from "@/components/card/favoriteQuizCard"
import { FavoriteTermCard } from "@/components/card/favoriteTermCard"
import styles from "@/css/mypage.module.css"

export function Mypage() {
  const {
    favoriteQuizzes,
    favoriteArticles,
    favoriteTerms,
    customTags
  } = useMemo(() => {
    if (typeof window === "undefined") {
      return {
        favoriteQuizzes: [],
        favoriteArticles: [],
        favoriteTerms: [],
        customTags: []
      }
    }
   
    return {
      favoriteQuizzes: JSON.parse(localStorage.getItem("favoriteQuizzes") ?? "[]"),
      favoriteArticles: JSON.parse(localStorage.getItem("favoriteArticles") ?? "[]"),
      favoriteTerms: JSON.parse(localStorage.getItem("favoriteTerms") ?? "[]"),
      customTags: JSON.parse(localStorage.getItem("customTags") ?? "[]"),
    }
  }, [])

  return (
    <PageLayout>
      <div className={styles.myPage}>

        <h2>お気に入りクイズ</h2>
        <ul>
        {favoriteQuizzes.map((id: string) => (
            <FavoriteQuizCard key={id} id={id} />
        ))}
        </ul>

        <h2>お気に入り記事</h2>
        <ul>
        {favoriteArticles.map((id: string) => (
            <FavoriteArticleCard key={id} id={id} />
        ))}
        </ul>

        <h2>お気に入り用語</h2>
        <ul>
            {favoriteTerms.map((id: string) => (
                <FavoriteTermCard key={id} id={id} />
            ))}
        </ul>

        <h2>お気に入りタグ</h2>
        <div className={styles.favoriteTags}>
        {customTags.map((tag: string) => (
            <Link
                key={tag}
                to={`/category/${encodeURIComponent(tag)}`}
                onClick={(e) => e.stopPropagation()}
            >
                <span key={tag} className={styles.favoriteTag}>
                {tag}
                </span>
            </Link>
        ))}
        </div>

      </div>
    </PageLayout>
  )
}
