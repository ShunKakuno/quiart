import { useQuery } from "@tanstack/react-query"
import { api } from "@/lib/api"
import type { Quiz } from "@/lib/types/quiz"

export function useQuizWithArticle(id?: string) {
  return useQuery<Quiz[]>({
    queryKey: ["article-quizzes", id],
    queryFn: async () => {
      if (!id) throw new Error("記事IDがありません")
      return await api<Quiz[]>(`/article-with-quiz/${id}`)
    },
    enabled: !!id,
  })
}
