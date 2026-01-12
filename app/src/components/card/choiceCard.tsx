import type { Choice } from "@/lib/types/quiz"

type Props = {
  choice: Choice
  isSelected: boolean
  isCorrect: boolean
  showResult: boolean
  onClick: () => void
}

export function ChoiceCard({
  choice,
  isSelected,
  isCorrect,
  showResult,
  onClick
}: Props) {
  let color = "border-gray-200 hover:border-blue-400"

  if (showResult) {
    if (isCorrect) color = "border-green-500 bg-green-50"
    else if (isSelected) color = "border-red-500 bg-red-50"
  }

  return (
    <button
      onClick={onClick}
      disabled={showResult}
      className={`p-4 border-2 rounded-xl transition-all text-left ${color}`}
    >
      {choice.text}
    </button>
  )
}
