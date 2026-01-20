import { useState } from "react"
import { useAdminLogin } from "@/lib/hooks/useAdminLogin"
import "@/css/adminLogin.css"

export function AdminLogin() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { login, error, loading } = useAdminLogin()

  const handleSubmit = async () => {
    const ok = await login(email, password)
    if (ok) {
      window.location.href = "/admin/dashboard"
    }
  }

  return (
    <div className="admin-login">
      <h1>管理者ログイン</h1>

      <input
        type="email"
        placeholder="メールアドレス"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="パスワード"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "ログイン中..." : "ログイン"}
      </button>

      {error && <p className="error">{error}</p>}
    </div>
  )
}
