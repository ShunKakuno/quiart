import { useState } from "react"
import { api } from "@/lib/api"

export function useAdminLogin() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const login = async (email: string, password: string) => {
    setLoading(true)
    setError(null)
    try {
      await api("/admin/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      })
      setLoading(false)
      return true
    } catch (e: any) {
      setError(e.message || "ログインに失敗しました")
      setLoading(false)
      return false
    }
  }

  const logout = async () => {
    await api("/admin/logout", { method: "POST" })
    window.location.href = "/admin/login"
  }

  return { login, logout, loading, error }
}
