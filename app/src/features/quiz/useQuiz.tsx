import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { api } from "@/lib/api"

/**
 * Prismaのモデルと一致させる
 */
export type Choice = {
  id: string
  quizId: string
  text: string
  isCorrect: boolean
  index: number
}

export type Quiz = {
  id: string
  title: string
  tag: string
  level: string
  mistakeReason: string
  choices: Choice[]
  createdAt: string // APIはISO文字列で来る
}

/**
 * GET /quiz
 */
export function useQuiz() {

  return useQuery({
    queryKey: ["quiz"],
    queryFn: () => api<Quiz[]>("/quiz"),
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
  mistakeReason: string
  choices: {
    text: string
    isCorrect: boolean
    index: number
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
