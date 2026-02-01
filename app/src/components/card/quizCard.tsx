import { useState } from 'react'
import type { Quiz } from "@/lib/types/quiz"
import { Tag } from "@/components/tag/tag"
import { ChoiceGrid } from "@/components/grid/choiceGrid"
import { useIncrementChoiceSelect } from "@/lib/hooks/useIncrementChoiceSelect"
import styles from "@/css/quizCard.module.css"
import { ArticleMarkdown } from "@/components/util/articleMarkdown"

type Props = {
  quiz: Quiz
}

export function QuizCard({ quiz }: Props) {
  const [selected, setSelected] = useState<string | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)

  const isCorrect = selected === quiz.correctQuizId

  const totalSelected =
    quiz.choices?.reduce((sum, c) => sum + c.selected, 0) ?? 0

  const correctChoice = quiz.choices?.find(
    c => c.selectId === quiz.correctQuizId
  )

  const correctRateRounded =
    totalSelected > 0 && correctChoice
      ? Math.round((correctChoice.selected / totalSelected) * 100)
      : 0

  const incSelect = useIncrementChoiceSelect()

  const handleSelect = (id: string) => {
    if (selected) return

    setSelected(id)
    setShowExplanation(false)

    incSelect.mutate({ quizId: quiz.id, selectId: id })
  }
  
  const levelNum = Number(quiz.level)
  const levelPercent = levelNum * 20
  const levelLabelMap = ["超簡単", "簡単", "普通", "難しい", "鬼むず"]
  const levelLabel = levelLabelMap[levelNum - 1] ?? "不明"

  return (
    <div className={styles.quizCard}>
      <h2><ArticleMarkdown content={quiz.title} /></h2>
      <div className={styles.tagSpan}>
        <Tag categories={quiz.categories} />
      </div>
      <div className={styles.difficultyWrap}>
        <span className={styles.difficultyLabel}>難易度</span>

        <div className={styles.difficultyBar}>
          <div
            className={styles.difficultyFill}
            style={{ width: `${levelPercent}%` }}
          />
        </div>

        <span className={styles.difficultyText}>
          Lv.{levelNum} / {levelLabel}
        </span>
      </div>
      <ChoiceGrid
        choices={quiz.choices}
        selected={selected}
        correctId={quiz.correctQuizId}
        onSelect={handleSelect}
      />

      {selected && (
        <>
          <div className={`${styles.result} ${isCorrect ? styles.correct : styles.incorrect}`}>
            <span className={styles.icon}>{isCorrect ? "⭕" : "✖️"}</span>
            <span className={styles.text}>{isCorrect ? "正解！" : "不正解"}</span>
          </div>

          <button
            className={styles.explanationButton}
            onClick={() => setShowExplanation(prev => !prev)}
          >
            {showExplanation ? "解説を閉じる" : "解説を見る"}
          </button>

          {showExplanation && (
            <>
              <div className={styles.explanation}><ArticleMarkdown content={quiz.explanation} /></div>

              <div className={styles.correctRateWrap}>
                <div
                  className={styles.rateCircle}
                  style={{ ["--rate" as any]: correctRateRounded }}
                >
                  <span className={styles.rateText}>{correctRateRounded}%</span>
                </div>
                <div className={styles.rateLabel}>正解率</div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  )
}

