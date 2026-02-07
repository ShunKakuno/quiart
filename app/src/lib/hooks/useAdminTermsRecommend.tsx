import { useQuery } from "@tanstack/react-query"
import { api } from "@/lib/api"
import type { Term } from "@/lib/types/term"

export function useAdminTermsRecommend(q: string) {
  return useQuery<Term[]>({
    queryKey: ["terms-recommend", q],
    queryFn: async () => {
      const data = await api<Term[]>(
        `/admin/termRecommend?q=${encodeURIComponent(q)}`
      )
      return data
    },
    enabled: q.length > 0,
    staleTime: 1000 * 30,
  })
}
