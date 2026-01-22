import { useQuery } from "@tanstack/react-query"
import { api } from "@/lib/api"
import type { Term } from "@/lib/types/term"

export function useTerm(id?: string) {
  return useQuery<Term>({
    queryKey: ["term", id],
    queryFn: async () => {
      if (!id) throw new Error("用語がありません")
      const data = await api<Term>(`/term/${id}`)
      return data
    },
    enabled: !!id,
  })
}
