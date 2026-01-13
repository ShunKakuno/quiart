import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Top } from "@/pages/top"
import { Quiz } from "@/pages/quiz"
import { PostArticle } from "@/pages/postArticle"
import { AppLayout } from "@/appLayout"

export const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Top />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/article" element={<PostArticle />} />
      </Route>
    </Routes>
  </BrowserRouter>
)
