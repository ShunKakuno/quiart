import { useState } from 'react';

import type { Quiz } from "@/lib/types/quiz"
import { ChoiceGrid } from "@/components/grid/choiceGrid"


type Props = {
  quiz: Quiz
}

export function QuizCard({ quiz }: Props) {
  const [selected, setSelected] = useState<string | null>(null)

  const isCorrect = selected === quiz.correctQuizId

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 w-[420px]">
      <h2 className="text-xl font-bold mb-4">
        {quiz.title}
      </h2>

      <ChoiceGrid
        choices={quiz.choices}
        selected={selected}
        correctId={quiz.correctQuizId}
        onSelect={setSelected}
      />

      {selected && (
        <div className="mt-4 text-center font-bold">
          {isCorrect ? "🎉 正解！" : "❌ 不正解"}
        </div>
      )}
    </div>
  )
}
