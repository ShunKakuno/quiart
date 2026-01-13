import { Outlet } from "react-router-dom"
import "@/css/appLayout.css"

export function AppLayout() {
  return (
    <div className="app">
      <header className="header">
        <div className="logo">My Quiz App</div>
      </header>

      <div className="body">
        <aside className="sidebar">
          <nav>
            <a href="/">Home</a>
            <a href="/quiz">Quiz</a>
            <a href="/admin">Admin</a>
          </nav>
        </aside>

        <main className="content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
