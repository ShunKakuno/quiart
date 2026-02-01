import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Top } from "@/pages/top"
import { QuizList } from "@/pages/quizList"
import { Quiz } from "@/pages/quiz"
import { ArticleList } from "@/pages/articleList"
import { Article } from "@/pages/article"
import { TermsList } from "@/pages/termsList"
import { Term } from "@/pages/term"
import { AdminArticleList } from "@/pages/adminArticleList"
import { AdminQuizList } from "@/pages/adminQuizList"
import { AdminTermList } from "@/pages/adminTermList"
import { PostArticle } from "@/pages/postArticle"
import { CreateTerm } from "@/pages/createTerm"
import { CreateQuiz } from "@/pages/createQuiz"
import { AdminLogin } from "@/pages/adminLogin"
import { AdminDashboard } from "@/pages/adminDashboard"
import { TermsOfService } from "@/pages/termsOfService"
import { PrivacyPolicy } from "@/pages/privacyPolicy"
import { AppLayout } from "@/appLayout"

export const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Top />} />
        <Route path="/quizList" element={<QuizList />} />
        <Route path="/quiz/:id" element={<Quiz />} />
        <Route path="/articleList" element={<ArticleList />} />
        <Route path="/article/:id" element={<Article />} />
        <Route path="/terms" element={<TermsList />} />
        <Route path="/term/:id" element={<Term />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/admin/articleList" element={<AdminArticleList />} />
        <Route path="/admin/quizList" element={<AdminQuizList />} />
        <Route path="/admin/termList" element={<AdminTermList />} />
        <Route path="/admin/postArticle" element={<PostArticle />} />
        <Route path="/admin/createQuiz" element={<CreateQuiz />} />
        <Route path="/admin/createTerm" element={<CreateTerm />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Route>
    </Routes>
  </BrowserRouter>
)
