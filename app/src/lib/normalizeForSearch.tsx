export function normalizeForSearch(text: string) {
  return text
    .normalize("NFKC")
    .toUpperCase()
    .replace(/[ぁ-ん]/g, s =>
      String.fromCharCode(s.charCodeAt(0) + 0x60)
    )
}
