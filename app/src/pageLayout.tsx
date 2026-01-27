import { Link } from "react-router-dom"
import styles from "@/css/pageLayout.module.css"

type Props = {
  children: React.ReactNode
}

export function PageLayout({ children }: Props) {
  return (
    <div className={styles.page}>
      <main className={styles.pageContent}>
        {children}
      </main>
      <footer className={styles.pageFooter}>
        <p className={styles.pageFooterCopy}>© eHZ</p>
        <nav className={styles.pageFooterNav}>
          <Link to="/terms-of-service">利用規約</Link>
          <Link to="/privacy-policy">プライバシーポリシー</Link>
        </nav>
      </footer>
    </div>
  )
}
