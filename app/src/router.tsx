import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Top } from "@/pages/top"
import { QuizList } from "@/pages/quizList"
import { Quiz } from "@/pages/quiz"
import { ArticleList } from "@/pages/articleList"
import { Article } from "@/pages/article"
import { PostArticle } from "@/pages/postArticle"
import { AppLayout } from "@/appLayout"

export const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Top />} />
        <Route path="/quiz" element={<QuizList />} />
        <Route path="/quiz/:id" element={<Quiz />} />
        <Route path="/articleList" element={<ArticleList />} />
        <Route path="/article/:id" element={<Article />} />
        <Route path="/postArticle" element={<PostArticle />} />
      </Route>
    </Routes>
  </BrowserRouter>
)
