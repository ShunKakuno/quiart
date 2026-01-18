import { useQuery } from "@tanstack/react-query"
import { api } from "@/lib/api"
import type { Quiz } from "@/lib/types/quiz"

/**
 * GET /quiz
 */
export function useQuiz(id?: string) {
  return useQuery<Quiz>({
    queryKey: ["quiz", id],
    queryFn: async () => {
      if (!id) throw new Error("クイズIDがありません")
      const data = await api<Quiz>(`/quiz/${id}`)
      return data
    },
    enabled: !!id,
  })
}
