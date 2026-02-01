import { useArticleList } from "@/lib/hooks/useArticleList"
import { DeleteArticleButton } from "@/components/util/deleteArticleButton"
import { useAdminDashboard } from "@/lib/hooks/useAdminDashboard"

import styles from "@/css/adminArticleList.module.css"

export function AdminArticleList() {
  const { data } = useArticleList()
  const { data: admin, isLoading } = useAdminDashboard()

  if (isLoading) return <p>読み込み中...</p>
  if (!admin) return <p>ログインしてください</p>

  return (
    <div className={styles.wrapper}>
      <div className={styles.list}>
        {data?.map(a => (
          <div key={a.id} className={styles.item}>
            <span className={styles.title}>{a.title}</span>
            <DeleteArticleButton
              id={a.id}
              className={styles.deleteButton}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

