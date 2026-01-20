import { useMutation, useQueryClient } from "@tanstack/react-query"
import { api } from "@/lib/api"
import type { QuizCreateInput } from "@/lib/types/quizCreateInput"
import type { Quiz } from "@/lib/types/quiz"

export function useCreateQuiz() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: (data: QuizCreateInput) =>
      api<Quiz>("/admin/quiz", {
        method: "POST",
        body: JSON.stringify(data),
      }),

    // 追加成功したら一覧を自動更新
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["quiz"] })
    },
  })
}
