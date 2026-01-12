import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const app = new Hono()

app.get('/questions', async c => {
  const questions = await prisma.question.findMany()
  return c.json(questions)
})

app.post('/questions', async c => {
  const data = await c.req.json()
  const q = await prisma.question.create({ data })
  return c.json(q)
})

export default app
