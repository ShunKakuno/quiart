import { useQuery } from "@tanstack/react-query"
import { api } from "@/lib/api"
import type { Quiz } from "@/lib/types/quiz"

export function useQuizList() {

  return useQuery({
    queryKey: ["quiz"],
    queryFn: () => api<Quiz[]>("/quizList"),
  })
}
