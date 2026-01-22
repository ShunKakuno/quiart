import "@/css/hatenabookmark.css"

export function HatenaBookMark() {
  const url = encodeURIComponent(window.location.href)

  return (
    <a
      href={`https://b.hatena.ne.jp/entry/${url}`}
      target="_blank"
      rel="noopener noreferrer"
      className="hatena-bookmark-floating"
    >
      <span className="hatena-icon">B!</span>
      <span className="hatena-text">ブックマーク</span>
    </a>
  )
}

