import { useMutation, useQueryClient } from "@tanstack/react-query"
import { api } from "@/lib/api"

export function useDeleteArticle() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) =>
      api(`/admin/article/${id}`, { method: "DELETE" }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] })
    },
  })
}

export function useDeleteTerm() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) =>
      api(`/admin/term/${id}`, { method: "DELETE" }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["terms"] })
    },
  })
}

export function useDeleteQuiz() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) =>
      api(`/admin/quiz/${id}`, { method: "DELETE" }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quiz"] })
    },
  })
}