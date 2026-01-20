import { Outlet, Link } from "react-router-dom"

import "@/css/appLayout.css"

export function AppLayout() {
  return (
    <div className="app">
      <header className="header">
        <div className="logo">eHZ</div>
      </header>

      <div className="body">
        <aside className="sidebar">
          <nav>
            <Link to="/">トップ</Link>
            <Link to="/quiz">クイズ一覧</Link>
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
