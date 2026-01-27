import type { Choice } from "@/lib/types/quiz"
import styles from "@/css/choiceCard.module.css"

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

  const className = [
    styles.choiceCard,
    showResult && isCorrect ? styles.correct : "",
    showResult && !isCorrect && isSelected ? styles.incorrect : "",
    !showResult && isSelected ? styles.selected : "",
  ].join(" ")

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
