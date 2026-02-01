import { useMutation } from "@tanstack/react-query"
import { api } from "@/lib/api"

export const useIncrementChoiceSelect = () => {
  return useMutation({
    mutationFn: async ({ quizId, selectId }: { quizId: number, selectId: string }) => {
      await api(`/choice/${quizId}/${selectId}/select`, {
        method: "POST",
      })
    }
  })
}
