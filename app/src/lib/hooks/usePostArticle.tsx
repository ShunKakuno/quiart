import { useMutation } from "@tanstack/react-query"
import { api } from "@/lib/api"

type CreateArticleInput = {
  title: string
  body: string
  tags: string[]
}

export function usePostArticle() {
  return useMutation({
    mutationFn: (data: CreateArticleInput) =>
      api("/article", {
        method: "POST",
        body: JSON.stringify(data),
      }),
  })
}
