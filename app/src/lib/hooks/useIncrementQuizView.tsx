import { useMutation } from "@tanstack/react-query"
import { api } from "@/lib/api"

export const useIncrementQuizView = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      await api(`/quiz/${id}/view`, {
        method: "POST",
      })
    },
  })
}
