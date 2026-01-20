export function Login() {
  const handleGoogleLogin = () => {
    // バックエンドの OAuth 開始エンドポイントへ
    window.location.href = "/api/auth/google"
  }

  return (
    <div style={styles.container}>
      <h1>ログイン</h1>

      <button onClick={handleGoogleLogin} style={styles.button}>
        Googleでログイン
      </button>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "16px",
  },
  button: {
    padding: "12px 24px",
    fontSize: "16px",
    cursor: "pointer",
  },
}
