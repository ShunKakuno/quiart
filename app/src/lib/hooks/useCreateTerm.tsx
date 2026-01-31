import { useMutation, useQueryClient } from "@tanstack/react-query"
import { api } from "@/lib/api"
import type { TermCreateInput } from "@/lib/types/termCreateInput"
import type { Term } from "@/lib/types/term"

export function useCreateTerm() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: (data: TermCreateInput) =>
      api<Term>("/admin/term", {
        method: "POST",
        body: JSON.stringify(data),
      }),

    // 追加成功したら一覧を自動更新
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["term"] })
    },
  })
}
