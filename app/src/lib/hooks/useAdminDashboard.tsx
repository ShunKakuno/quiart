import { useQuery } from "@tanstack/react-query"
import { api } from "@/lib/api"

export type Admin = {
  id: string
  email: string
}

export function useAdminDashboard() {
  return useQuery<Admin>({
    queryKey: ["admin"],
    queryFn: async () => {
      try {
        const data = await api<Admin>("/admin/me")
        console.log("data:", data)
        return data
      } catch (err) {
        // 認証エラー想定でログインへ
        window.location.href = "/admin/login"
        throw err
      }
    },
  })
}
