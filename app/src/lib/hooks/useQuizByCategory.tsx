import { useQuery } from "@tanstack/react-query"
import { api } from "@/lib/api"
import type { Quiz } from "@/lib/types/quiz"

export function useQuizByCategory(name?: string) {
  return useQuery<Quiz[]>({
    queryKey: ["quiz", name],
    queryFn: async () => {
      if (!name) throw new Error("クイズがありません")
      const data = await api<Quiz[]>(`/quiz/category/${name}`)
      return data
    },
    enabled: !!name,
  })
}
