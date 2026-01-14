import { useState } from 'react'
import type { Quiz } from "@/lib/types/quiz"
import { ChoiceGrid } from "@/components/grid/choiceGrid"
import "@/css/QuizCard.css"

type Props = {
  quiz: Quiz
}

export function QuizCard({ quiz }: Props) {
  const [selected, setSelected] = useState<string | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)

  const isCorrect = selected === quiz.correctQuizId

  const handleSelect = (id: string) => {
    setSelected(id)
    setShowExplanation(false) // 選び直したら解説を閉じる
  }

  return (
    <div className="quiz-card">
      <h2>{quiz.title}</h2>

      <ChoiceGrid
        choices={quiz.choices}
        selected={selected}
        correctId={quiz.correctQuizId}
        onSelect={handleSelect}
      />

      {selected && (
        <>
          <div className={isCorrect ? "result correct" : "result incorrect"}>
            <span className="icon">{isCorrect ? "⭕" : "✖️"}</span>
            <span className="text">{isCorrect ? "正解！" : "不正解"}</span>
          </div>
          <button
            className="explanation-button"
            onClick={() => setShowExplanation(prev => !prev)}
          >
            {showExplanation ? "解説を閉じる" : "解説を見る"}
          </button>

          {showExplanation && (
            <div className="explanation">
              {quiz.explanation}
            </div>
          )}
        </>
      )}
    </div>
  )
}
