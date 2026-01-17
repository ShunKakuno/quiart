import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
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

/**
 * POST /quiz
 */
type CreatequizInput = {
  id: string
  title: string
  tag: string
  level: string
  explanation: string
  choices: {
    text: string
    isCorrect: boolean
  }[]
}

export function useCreatequiz() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: (data: CreatequizInput) =>
      api<Quiz>("/quiz", {
        method: "POST",
        body: JSON.stringify(data),
      }),

    // 追加成功したら一覧を自動更新
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["quiz"] })
    },
  })
}
