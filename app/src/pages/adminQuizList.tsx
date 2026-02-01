import { useQuizList } from "@/lib/hooks/useQuizList"
import { DeleteQuizButton } from "@/components/util/deleteQuizButton"
import { useAdminDashboard } from "@/lib/hooks/useAdminDashboard"

import styles from "@/css/adminQuizList.module.css"

export function AdminQuizList() {
  const { data } = useQuizList()
  const { data: admin, isLoading } = useAdminDashboard()

  if (isLoading) return <p>読み込み中...</p>
  if (!admin) return <p>ログインしてください</p>

  return (
    <div className={styles.wrapper}>
      <div className={styles.list}>
        {data?.map(a => (
          <div key={a.id} className={styles.item}>
            <span className={styles.title}>{a.title}</span>
            <DeleteQuizButton
              id={a.id}
              className={styles.deleteButton}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

