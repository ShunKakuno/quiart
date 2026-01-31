import { useAdminDashboard } from "@/lib/hooks/useAdminDashboard"
import { useAdminLogin } from "@/lib/hooks/useAdminLogin"
import { Link } from "react-router-dom"
import styles from "@/css/adminDashboard.module.css"

export function AdminDashboard() {
  const { data: admin, isLoading } = useAdminDashboard()
  const { logout } = useAdminLogin()

  if (isLoading) return <p className={styles.adminDashboardLoading}>読み込み中...</p>

  return (
    <div className={styles.adminDashboard}>
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}>
        <h1>{admin?.email} の管理者ダッシュボード</h1>
            <Link to="/admin/postArticle">ブログ記事作成</Link>
            <Link to="/admin/createQuiz">クイズ作成</Link>
            <Link to="/admin/createTerm">用語作成</Link>
        <button onClick={logout} style={{ marginTop: 20, padding: 10 }}>ログアウト</button>
        </div>
    </div>
  )
}
