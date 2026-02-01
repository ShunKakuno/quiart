import { useTermsList } from "@/lib/hooks/useTermsList"
import { DeleteTermButton } from "@/components/util/deleteTermButton"
import { useAdminDashboard } from "@/lib/hooks/useAdminDashboard"

import styles from "@/css/adminTermList.module.css"

export function AdminTermList() {
  const { data } = useTermsList()
  const { data: admin, isLoading } = useAdminDashboard()

  if (isLoading) return <p>読み込み中...</p>
  if (!admin) return <p>ログインしてください</p>

  return (
    <div className={styles.wrapper}>
      <div className={styles.list}>
        {data?.map(a => (
          <div key={a.id} className={styles.item}>
            <span className={styles.title}>{a.term}</span>
            <DeleteTermButton
              id={a.id}
              className={styles.deleteButton}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

