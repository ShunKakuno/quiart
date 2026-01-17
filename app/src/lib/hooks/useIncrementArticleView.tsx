import { useMutation } from "@tanstack/react-query"
import { api } from "@/lib/api"

export const useIncrementArticleView = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      await api(`/article/${id}/view`, {
        method: "POST",
      })
    },
  })
}
