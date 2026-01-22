import { useQuery } from "@tanstack/react-query"
import { api } from "@/lib/api"
import type { Term } from "@/lib/types/term"

export function useTermsList() {

  return useQuery({
    queryKey: ["terms"],
    queryFn: () => api<Term[]>("/terms"),
  })
}
