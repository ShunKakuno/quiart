import { useState } from "react"
import { useCreateQuiz } from "@/lib/hooks/useCreateQuiz"
import type { QuizCreateInput } from "@/lib/types/quizCreateInput"
import "@/css/createQuiz.css"

export function CreateQuiz() {
  const post = useCreateQuiz()
  const [form, setForm] = useState<QuizCreateInput>({
    title: "",
    tag: "",
    level: "",
    explanation: "",
    categories: [],
    correctQuizId: "",
    choices: [
      { selectId: "1", text: "" },
      { selectId: "2", text: "" },
      { selectId: "3", text: "" },
      { selectId: "4", text: "" },
    ],
  })

  const updateChoice = (index: number, text: string) => {
    const next = [...form.choices]
    next[index].text = text
    setForm({ ...form, choices: next })
  }

  return (
    <>
      <h1>クイズ作成</h1>
      <div className="create-quiz">
        <input
          placeholder="タイトル"
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
        />

        <textarea
          placeholder="解説"
          value={form.explanation}
          onChange={e => setForm({ ...form, explanation: e.target.value })}
        />

        <h3>選択肢</h3>
        <div className="choice-list">
        {form.choices.map((c, i) => (
          <div key={c.selectId} className="choice-item">
            <input
              key={c.selectId}
              placeholder={`選択肢 ${c.selectId}`}
              value={c.text}
              onChange={e => updateChoice(i, e.target.value)}
            />
          </div>
        ))}
        </div>
        <button onClick={() => post.mutate(form)}>作成</button>   
      </div>
    </>
  )
}
