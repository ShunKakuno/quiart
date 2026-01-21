import { Link } from "react-router-dom"
import "@/css/pageLayout.css"

type Props = {
  children: React.ReactNode
}

export function PageLayout({ children }: Props) {
  return (
    <div className="page">
      <main className="page-content">
        {children}
      </main>

      <footer className="page-footer">
        <p className="page-footer-copy">© eHZ</p>
        <nav className="page-footer-nav">
          <Link to="/terms-of-service">利用規約</Link>
          <Link to="/privacy-policy">プライバシーポリシー</Link>
        </nav>
      </footer>
    </div>
  )
}
