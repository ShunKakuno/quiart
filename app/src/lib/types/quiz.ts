export type Choice = {
  id: string
  quizId: string
  selectId: string
  text: string
}

export type Quiz = {
  id: string
  title: string
  tag: string
  level: string
  explanation: string
  createdAt: string
  correctQuizId: string
  choices: Choice[]
}
