import { Outlet, Link, useLocation } from "react-router-dom"
import { useEffect } from "react"
import styles from "@/css/appLayout.module.css"

export function AppLayout() {
  const { pathname } = useLocation()

  useEffect(() => {
    const el = document.querySelector(".content")
    el?.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.logo}>eHZ</div>

          <nav className={styles.topNav}>
            <Link to="/">トップ</Link>
            <Link to="/quizList">クイズ一覧</Link>
            <Link to="/terms">用語集</Link>
            <Link to="/articleList">ブログ記事一覧</Link>
          </nav>
        </div>
      </header>

      <main className={`${styles.content} content`}>
        <Outlet />
      </main>
    </div>
  )
}
