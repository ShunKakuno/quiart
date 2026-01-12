import type { Choice } from "@/lib/types/quiz"
import { ChoiceCard } from "@/components/card/choiceCard"



type Props = {
  choices: Choice[]
  selected: string | null
  correctId: string
  onSelect: (id: string) => void
}

export function ChoiceGrid({ choices, selected, correctId, onSelect }: Props) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {choices.map(c => (
        <ChoiceCard
          key={c.id}
          choice={c}
          isSelected={selected === c.id}
          isCorrect={c.id === correctId}
          showResult={selected !== null}
          onClick={() => onSelect(c.id)}
        />
      ))}
    </div>
  )
}
