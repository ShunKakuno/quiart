import { Hono } from 'hono'
import { cors } from "hono/cors"
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const app = new Hono()
const api = app.basePath("/api")

const FRONTEND_URL =
  process.env.FRONTEND_URL ?? "http://localhost:5173"

api.use(
  "*",
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  })
)

api.get("/quiz", async c => {
  const quiz = await prisma.quiz.findMany({
    where: {
      choices: {
        some: {}
      }
    },
    include: {
      choices: true
    }
  })
  return c.json(quiz)
})

api.post('/quiz', async c => {
  const data = await c.req.json()
  const q = await prisma.quiz.create({ data })
  return c.json(q)
})

api.get("/article/:id", async c => {
  const id = c.req.param("id")
  const article = await prisma.article.findUnique({
    where: { id },
  })
  return c.json(article)
})

api.post("/article/:id/view", async (c) => {
  const id = c.req.param("id")

  await prisma.article.update({
    where: { id },
    data: {
      view: { increment: 1 },
    },
  })

  return c.json({ ok: true })
})

api.get("/articleList", async c => {
  const articleList = await prisma.article.findMany({
    orderBy: {
      updatedAt: "desc",
    },
  }
  )
  return c.json(articleList)
})

type QiitaItem = {
  id: string
}

api.post("/article", async c => {
  try {
    const { title, body, tags } = await c.req.json() as {
      title: string
      body: string
      tags: string[]
    }

    const article = await prisma.article.create({
      data: {
        title,
        content: body,
        tags
      },
    })

    const qiitaRes = await fetch("https://qiita.com/api/v2/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.QIITA_TOKEN}`,
      },
      body: JSON.stringify({
        title,
        body,
        private: false,
        tags: tags.map(t => ({ name: t }))
      }),
    })

    if (!qiitaRes.ok) {
      const t = await qiitaRes.text()
      console.error("Qiita error:", t)
      return c.json({ error: t }, 500)
    }

    const qiita = (await qiitaRes.json()) as QiitaItem

    await prisma.article.update({
      where: { id: article.id },
      data: { qiitaId: qiita.id },
    })

    return c.json({ ok: true, qiitaId: qiita.id })
  } catch (e) {
    console.error("POST /api/article crashed:", e)
    return c.json({ error: String(e) }, 500)
  }
})

export default app
