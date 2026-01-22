import { useTermsList } from "@/lib/hooks/useTermsList"
import { Link } from "react-router-dom"
import { PageLayout } from "@/pageLayout"
import "@/css/termsList.css"

export function TermsList() {
  const { data, isLoading } = useTermsList()

  if (isLoading) return <p>Loading...</p>

  return (
    <PageLayout>
      <div className="terms-list">
        {data!.map(term => (
          <Link
            to={`/term/${term.id}`}
            key={term.id}
            className="terms-content"
          >
            <h2 className="terms-title">{term.term}</h2>
          </Link>
        ))}
      </div>
    </PageLayout>
  )
}
