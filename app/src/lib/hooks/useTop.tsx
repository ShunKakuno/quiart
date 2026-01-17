import { useQuery } from "@tanstack/react-query"
import { api } from "@/lib/api"
import type { Quiz } from "@/lib/types/quiz"
import type { Article } from "@/lib/types/article"

export function useDailyQuiz() {

  return useQuery({
    queryKey: ["Dailyquiz"],
    queryFn: () => api<Quiz[]>("/quiz"),
  })
}

export function usePopularQuizRanking() {

  return useQuery({
    queryKey: ["popularQuizRanking"],
    queryFn: () => api<Quiz[]>("/popularQuizRanking"),
  })
}

export function useUnpopularQuizRanking() {

  return useQuery({
    queryKey: ["unpopularQuizRanking"],
    queryFn: () => api<Quiz[]>("/unpopularQuizRanking"),
  })
}

export function usePopularArticleRanking() {

  return useQuery({
    queryKey: ["popularArticleRanking"],
    queryFn: () => api<Article[]>("/popularArticleRanking"),
  })
}

export function useUnpopularArticleRanking() {

  return useQuery({
    queryKey: ["unpopularArticleRanking"],
    queryFn: () => api<Article[]>("/unpopularArticleRanking"),
  })
}
