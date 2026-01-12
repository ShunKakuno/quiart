export async function api<T>(
  path: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(
    import.meta.env.VITE_API_URL + path,
    {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      ...options,
    }
  )

  if (!res.ok) {
    const text = await res.text()
    throw new Error(text || res.statusText)
  }

  return res.json()
}
