import { useTermsList } from "@/lib/hooks/useTermsList"
import { Link } from "react-router-dom"
import { PageLayout } from "@/pageLayout"
import styles from "@/css/termsList.module.css"

export function TermsList() {
  const { data, isLoading } = useTermsList()

  if (isLoading) return <p>Loading...</p>

  return (
    <PageLayout>
      <div className={styles.termsList}>
        {data!.map(term => (
          <Link
            to={`/term/${term.id}`}
            key={term.id}
            className={styles.termsContent}
          >
            <h2 className={styles.termsTitle}>{term.term}</h2>
          </Link>
        ))}
      </div>
    </PageLayout>
  )
}
