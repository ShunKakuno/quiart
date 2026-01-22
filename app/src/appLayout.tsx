import { Outlet, Link, useLocation } from "react-router-dom"
import { useEffect } from "react"
import "@/css/appLayout.css"

export function AppLayout() {
  const { pathname } = useLocation()

  useEffect(() => {
    const el = document.querySelector(".content")
    el?.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="app">
      <header className="header">
        <div className="logo">eHZ</div>
      </header>

      <div className="body">
        <aside className="sidebar">
          <nav>
            <Link to="/">トップ</Link>
            <Link to="/quizList">クイズ一覧</Link>
            <Link to="/terms">用語集</Link>
            <Link to="/articleList">ブログ記事一覧</Link>
          </nav>
        </aside>
        <main className="content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
