import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useTerm } from "@/lib/hooks/useTerm"
import { PageLayout } from "@/pageLayout"
import { useIncrementTermView } from "@/lib/hooks/useIncrementTermView"
import { Tag } from "@/components/tag/tag"
import { HatenaBookMark } from "@/components/util/hatenabookmark"
import { Markdown } from "@/components/util/markdown"
import styles from "@/css/term.module.css"

export function Term() {
  const { id } = useParams<{ id: string }>()
  const { data: term, isLoading, error } = useTerm(id)
  const incrementView = useIncrementTermView()

  useEffect(() => {
    if (!id) return
    incrementView.mutate(id)
  }, [id])

  if (isLoading) return <p className="loading">Loading...</p>
  if (error || !term) return <p className="loading">用語が見つかりません</p>

  return (
    <PageLayout>
      <div className={styles.termContainer}>
        <h1 className={styles.termTitle}>{term.term}</h1>
        <div className={styles.tagSpan}>
          <Tag categories={term.categories} />
        </div>
        <div className={styles.termDescription}>
          <Markdown content={term.description} />
        </div>
        <div className={styles.termExplanation}>
          <Markdown content={term.explanation} />
        </div>
      </div>
      <HatenaBookMark />
    </PageLayout>
  )
}
