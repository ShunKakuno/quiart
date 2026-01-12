export type Choice = {
  id: string
  quizId: string
  text: string
}

export type Quiz = {
  id: string
  title: string
  tag: string
  level: string
  mistakeReason: string
  createdAt: string
  correctQuizId: string
  choices: Choice[]
}
