import { useQuery } from "@tanstack/react-query"
import { api } from "@/lib/api"
import type { Quiz } from "@/lib/types/quiz"
import type { Article } from "@/lib/types/article"

export function useLatestQuiz() {

  return useQuery({
    queryKey: ["latestquiz"],
    queryFn: () => api<Quiz[]>("/latestQuiz"),
  })
}

export function useLatestArticle() {

  return useQuery({
    queryKey: ["latestArticle"],
    queryFn: () => api<Article[]>("/latestArticle"),
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
