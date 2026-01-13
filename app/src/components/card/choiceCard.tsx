import type { Choice } from "@/lib/types/quiz"
import "@/css/ChoiceCard.css"

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

  let className = "choice-card"

  if (showResult) {
    if (isCorrect) className += " correct"
    else if (isSelected) className += " incorrect"
  } else if (isSelected) {
    className += " selected"
  }

  return (
    <button
      onClick={onClick}
      disabled={showResult}
      className={className}
    >
      {choice.text}
    </button>
  )
}
