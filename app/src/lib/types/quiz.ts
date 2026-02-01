export type Choice = {
  id: string
  quizId: string
  selectId: string
  text: string
  selected: number
}

export type Quiz = {
  id: number
  title: string
  categories: string[]
  level: string
  explanation: string
  createdAt: string
  correctQuizId: string
  view: number
  choices: Choice[]
}
