import { useTermsList } from "@/lib/hooks/useTermsList"
import { PageLayout } from "@/pageLayout"
import { TermListCard } from "@/components/card/termListCard"
import styles from "@/css/termsList.module.css"

export function TermsList() {
  const { data, isLoading } = useTermsList()

  if (isLoading) return <p>Loading...</p>

  return (
    <PageLayout>
      <div className={styles.termsList}>
        {data!.map(term => (
          <TermListCard key={term.id} item={term} />
        ))}
      </div>
    </PageLayout>
  )
}
