import { useState } from "react"
import { useCreateQuiz } from "@/lib/hooks/useCreateQuiz"
import { useAdminDashboard } from "@/lib/hooks/useAdminDashboard"
import type { QuizCreateInput } from "@/lib/types/quizCreateInput"
import "@/css/createQuiz.css"

export function CreateQuiz() {
  const { data: admin } = useAdminDashboard()
  const post = useCreateQuiz()

  if (!admin) return <p>ログインしてください</p>

  const initialForm: QuizCreateInput = {
    title: "",
    tag: "",
    level: "",
    explanation: "",
    categories: [],
    correctQuizId: "",
    articleId: null,
    choices: [
      { selectId: "1", text: "" },
      { selectId: "2", text: "" },
      { selectId: "3", text: "" },
      { selectId: "4", text: "" },
    ],
  }

  const [form, setForm] = useState<QuizCreateInput>(initialForm)
  const [categoryInput, setCategoryInput] = useState("")

  const updateChoice = (index: number, text: string) => {
    const next = [...form.choices]
    next[index].text = text
    setForm({ ...form, choices: next })
  }

  const handleAddCategory = () => {
    const t = categoryInput.trim()
    if (!t || form.categories.includes(t)) return
    setForm({
      ...form,
      categories: [...form.categories, t],
    })
    setCategoryInput("")
  }

  return (
    <>
      <h1>クイズ作成</h1>

      <div className="create-quiz">
        {/* タイトル */}
        <h3>タイトル</h3>
        <input
          placeholder="タイトル"
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
        />

        {/* 難易度 */}
        <h3>難易度</h3>
        <select
          value={form.level}
          onChange={e => setForm({ ...form, level: e.target.value })}
        >
          <option value="">選択してください</option>
          <option value="1">Lv.1（超簡単）</option>
          <option value="2">Lv.2（簡単）</option>
          <option value="3">Lv.3（普通）</option>
          <option value="4">Lv.4（難しい）</option>
          <option value="5">Lv.5（鬼むず）</option>
        </select>

        {/* 解説 */}
        <h3>解説</h3>
        <textarea
          placeholder="解説"
          value={form.explanation}
          onChange={e => setForm({ ...form, explanation: e.target.value })}
        />

        {/* 選択肢 */}
        <h3>選択肢</h3>
        <div className="choice-list">
          {form.choices.map((c, i) => (
            <div key={c.selectId} className="choice-item">
              <input
                placeholder={`選択肢 ${c.selectId}`}
                value={c.text}
                onChange={e => updateChoice(i, e.target.value)}
              />
              <input
                type="radio"
                name="correct"
                checked={form.correctQuizId === c.selectId}
                onChange={() =>
                  setForm({ ...form, correctQuizId: c.selectId })
                }
              />
            </div>
          ))}
        </div>

        {/* カテゴリ */}
        <h3>カテゴリ</h3>
        <div className="category-input">
          <input
            placeholder="カテゴリを入力してEnter"
            value={categoryInput}
            onChange={e => setCategoryInput(e.target.value)}
            onKeyDown={e => {
              if (e.key === "Enter") {
                e.preventDefault()
                handleAddCategory()
              }
            }}
          />

          <div className="category-tags">
            {form.categories.map(c => (
              <span
                key={c}
                className="category-tag"
                onClick={() =>
                  setForm({
                    ...form,
                    categories: form.categories.filter(x => x !== c),
                  })
                }
              >
                #{c} ×
              </span>
            ))}
          </div>
        </div>

        {/* 記事ID（任意） */}
        <h3>記事ID</h3>
        <div>
          <input
            type="number"
            placeholder="記事ID（任意）"
            value={form.articleId ?? ""}
            onChange={e =>
              setForm({
                ...form,
                articleId:
                  e.target.value === "" ? null : Number(e.target.value),
              })
            }
          />
        </div>

        {/* 作成ボタン */}
        <button
          disabled={
            !form.level ||
            !form.correctQuizId ||
            form.choices.some(c => c.text.trim() === "")
          }
          onClick={() =>
            post.mutate(form, {
              onSuccess: () => {
                setForm(initialForm)
                setCategoryInput("")
              },
            })
          }
        >
          作成
        </button>

        {post.isSuccess && (
          <p className="quiz-success">作成完了！</p>
        )}
        {post.isError && (
          <p className="quiz-error">エラーが発生しました</p>
        )}
      </div>
    </>
  )
}
