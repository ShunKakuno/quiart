import { useMutation } from "@tanstack/react-query"
import { api } from "@/lib/api"

export const useIncrementTermView = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      await api(`/term/${id}/view`, {
        method: "POST",
      })
    },
  })
}
