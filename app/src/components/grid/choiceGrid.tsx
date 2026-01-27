import type { Choice } from "@/lib/types/quiz"
import { ChoiceCard } from "@/components/card/choiceCard"
import styles from "@/css/choiceGrid.module.css"

type Props = {
  choices?: Choice[]          // ← optional にする
  selected: string | null
  correctId: string
  onSelect: (id: string) => void
}

export function ChoiceGrid({
  choices = [],               // ← デフォルト空配列
  selected,
  correctId,
  onSelect,
}: Props) {
  return (
    <div className={styles.choiceGrid}>
      {choices.map(c => (
        <ChoiceCard
          key={c.selectId}
          choice={c}
          isSelected={selected === c.selectId}
          isCorrect={c.selectId === correctId}
          showResult={selected !== null}
          onClick={() => onSelect(c.selectId)}
        />
      ))}
    </div>
  )
}
