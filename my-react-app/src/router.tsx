// src/router.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Top from './pages/top'

export const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Top />} />
    </Routes>
  </BrowserRouter>
)
