import { useQuery } from "@tanstack/react-query"
import { api } from "@/lib/api"
import type { Article } from "@/lib/types/article"

export function useArticleByCategory(name?: string) {
  return useQuery<Article[]>({
    queryKey: ["article", name],
    queryFn: async () => {
      if (!name) throw new Error("記事がありません")
      const data = await api<Article[]>(`/articles/category/${name}`)
      return data
    },
    enabled: !!name,
  })
}
