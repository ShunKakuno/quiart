import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useTerm } from "@/lib/hooks/useTerm"
import { PageLayout } from "@/pageLayout"
import { useIncrementTermView } from "@/lib/hooks/useIncrementTermView"
import { HatenaBookMark } from "@/components/util/hatenabookmark"
import "@/css/term.css"

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
      <div className="term-container">
        <h1 className="term-title">{term.term}</h1>

        <div className="term-meta">
          <div className="term-tags">
            {term.category.map((c) => (
              <span key={c} className="term-tag">#{c}</span>
            ))}
          </div>
        </div>

        <div className="term-description">
          {term.description}
        </div>

        <div className="term-explanation">
          {term.explanation}
        </div>
      </div>
      <HatenaBookMark />
    </PageLayout>
  )
}
