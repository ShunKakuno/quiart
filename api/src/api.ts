import { Hono } from 'hono'
import { cors } from "hono/cors"
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const app = new Hono()

const FRONTEND_URL =
  process.env.FRONTEND_URL ?? "http://localhost:5173"

app.use(
  "*",
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  })
)

app.get('/quiz', async c => {
  const quiz = await prisma.quiz.findMany()
  return c.json(quiz)
})

app.post('/quiz', async c => {
  const data = await c.req.json()
  const q = await prisma.quiz.create({ data })
  return c.json(q)
})

export default app
