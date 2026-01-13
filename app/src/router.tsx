import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Top } from "@/pages/top"
import { AppLayout } from "@/appLayout"

export const Router = () => (
  <BrowserRouter>
    <Routes>
      {/* 外枠 */}
      <Route element={<AppLayout />}>
        <Route path="/" element={<Top />} />
        {/* 今後ここに増やす */}
        {/* <Route path="/quiz" element={<Quiz />} /> */}
      </Route>
    </Routes>
  </BrowserRouter>
)
