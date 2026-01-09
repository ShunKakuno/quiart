// src/pages/Top.tsx
import { useNavigate } from 'react-router-dom'

export default function Top() {
  const navigate = useNavigate()

  return (
    <div>
      <h1>エンジニア理解度チェック</h1>
      <button onClick={() => navigate('/quiz')}>a
        まず5問解いてください（3分）
      </button>
    </div>
  )
}
