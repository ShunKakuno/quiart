import { useQuery } from "@tanstack/react-query"
import { api } from "@/lib/api"
import type { Article } from "@/lib/types/article"

export function useArticleList() {

  return useQuery({
    queryKey: ["articleList"],
    queryFn: () => api<Article[]>("/articleList"),
  })
}
