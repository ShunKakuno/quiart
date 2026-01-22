// QuizCreateInput.ts
export type ChoiceInput = {
  selectId: string
  text: string
}

export type QuizCreateInput = {
  title: string
  tag: string
  level: string
  explanation: string
  categories: string[]
  correctQuizId: string
  articleId?: number | null 
  choices: ChoiceInput[]
}
