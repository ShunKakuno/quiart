import { useQuery } from "@tanstack/react-query"
import { api } from "@/lib/api"
import type { Article } from "@/lib/types/article"

export function useArticle(id?: string) {
  return useQuery<Article>({
    queryKey: ["article", id],
    queryFn: async () => {
      if (!id) throw new Error("記事IDがありません")
      const data = await api<Article>(`/article/${id}`)
      return data
    },
    enabled: !!id,
  })
}
