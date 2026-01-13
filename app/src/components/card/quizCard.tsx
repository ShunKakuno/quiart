import { useState } from 'react';
import type { Quiz } from "@/lib/types/quiz"
import { ChoiceGrid } from "@/components/grid/choiceGrid"
import "@/css/QuizCard.css"

type Props = {
  quiz: Quiz
}

export function QuizCard({ quiz }: Props) {
  const [selected, setSelected] = useState<string | null>(null)
  const isCorrect = selected === quiz.correctQuizId

  return (
    <div className="quiz-card">
      <h2>{quiz.title}</h2>

      <ChoiceGrid
        choices={quiz.choices}
        selected={selected}
        correctId={quiz.correctQuizId}
        onSelect={setSelected}
      />

      {selected && (
        <div className={isCorrect ? "correct" : "incorrect"}>
          {isCorrect ? "🎉 正解！" : "❌ 不正解"}
        </div>
      )}
    </div>
  )
}
