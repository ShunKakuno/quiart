import { useAdminDashboard } from "@/lib/hooks/useAdminDashboard"
import { useAdminLogin } from "@/lib/hooks/useAdminLogin"
import { Link } from "react-router-dom"
import "@/css/adminDashboard.css"

export function AdminDashboard() {
  const { data: admin, isLoading } = useAdminDashboard()
  const { logout } = useAdminLogin()

  if (isLoading) return <p className="admin-dashboard-loading">読み込み中...</p>

  return (
    <div className="admin-dashboard">
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}>
        <h1>{admin?.email} の管理者ダッシュボード</h1>
            <Link to="/admin/postArticle">ブログ記事作成</Link>
            <Link to="/admin/createQuiz">クイズ作成</Link>
        <button onClick={logout} style={{ marginTop: 20, padding: 10 }}>ログアウト</button>
        </div>
    </div>
  )
}
