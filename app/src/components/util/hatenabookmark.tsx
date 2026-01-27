import styles from "@/css/hatenabookmark.module.css"

export function HatenaBookMark() {
  const url = encodeURIComponent(window.location.href)

  return (
    <a
      href={`https://b.hatena.ne.jp/entry/${url}`}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.hatenaBookmarkFloating}
    >
      <span className={styles.hatenaIcon}>B!</span>
      <span className={styles.hatenaText}>ブックマーク</span>
    </a>
  )
}

