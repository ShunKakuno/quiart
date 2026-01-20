import { Hono } from 'hono'
import { cors } from "hono/cors"
import bcrypt from "bcrypt"
import { z } from "zod"
import { Context } from "hono"
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

api.post("/admin/quiz", async (c) => {
  const body = await c.req.json()

  const quiz = await prisma.quiz.create({
    data: {
      title: body.title,
      tag: body.tag,
      level: body.level,
      explanation: body.explanation,
      categories: body.categories,
      correctQuizId: body.correctQuizId,
      choices: {
        create: body.choices.map((c: any) => ({
          selectId: c.selectId,
          text: c.text,
          selected: 0,
        })),
      },
    },
  })

  return c.json(quiz)
})

api.get("/quizList", async c => {
  const quizList = await prisma.quiz.findMany({
    orderBy: {
      createdAt: "desc",
    },
  }
  )
  return c.json(quizList)
})

api.get("/latestQuiz", async c => {
  const quizList = await prisma.quiz.findMany({
    where: {
      choices: {
        some: {}
      }
    },
    include: {
      choices: true
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 5
  }
  )
  return c.json(quizList)
})

api.get("/quiz/:id", async c => {
  const id = Number(c.req.param("id"))
  const quiz = await prisma.quiz.findUnique({
    where: { id },
    include: {
      choices: true,
    },
  })
  if (!quiz) {
    return c.json({ error: "Quiz not found" }, 404)
  }
  return c.json(quiz)
})

api.post("/quiz/:id/view", async (c) => {
  const id = Number(c.req.param("id"))

  await prisma.quiz.update({
    where: { id },
    data: {
      view: { increment: 1 },
    },
  })

  return c.json({ ok: true })
})


api.get("/popularQuizRanking", async c => {
  const quizList = await prisma.quiz.findMany({
    orderBy: {
      view: "desc",
    },
    take: 3
  })
  return c.json(quizList)
})

api.get("/unpopularQuizRanking", async c => {
  const quizList = await prisma.quiz.findMany({
    orderBy: {
      view: "asc",
    },
    take: 3,
  })
  return c.json(quizList)
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
  })
  return c.json(articleList)
})

api.get("/latestArticle", async c => {
  const articleList = await prisma.article.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 5
  }
  )
  return c.json(articleList)
})

api.get("/popularArticleRanking", async c => {
  const articleList = await prisma.article.findMany({
    orderBy: {
      view: "desc",
    },
    take: 3
  })
  return c.json(articleList)
})

api.get("/unpopularArticleRanking", async c => {
  const articleList = await prisma.article.findMany({
    orderBy: {
      view: "asc",
    },
    take: 3
  })
  return c.json(articleList)
})

type QiitaItem = {
  id: string
}

api.post("/admin/article", async c => {
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

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
})

api.post("/admin/login", async (c) => {
  const body = loginSchema.parse(await c.req.json())
  const { email, password } = body

  const admin = await prisma.admin.findUnique({ where: { email } })
  if (!admin) return c.text("Unauthorized", 401)

  const ok = await bcrypt.compare(password, admin.passwordHash)
  if (!ok) return c.text("Unauthorized", 401)

  const session = await prisma.adminSession.create({
    data: {
      adminId: admin.id,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 8), // 8時間
    },
  })

  const secure = process.env.NODE_ENV === "production" ? "; Secure" : ""

  c.header(
    "Set-Cookie",
    `admin_session=${session.id}; HttpOnly; Path=/; Max-Age=28800; SameSite=None; Secure`
  )

  return c.json({ ok: true })
})

export async function requireAdmin(c: Context) {
  const cookieHeader = c.req.header("cookie")
  if (!cookieHeader) return null // ログインしていない

  const match = cookieHeader.match(/admin_session=([^;]+)/)
  const sessionId = match?.[1]
  if (!sessionId) return null

  const session = await prisma.adminSession.findUnique({
    where: { id: sessionId },
    include: { admin: true },
  })

  if (!session || session.expiresAt < new Date()) return null

  return session.admin
}

api.post("/admin/logout", async (c) => {
  const cookieHeader = c.req.header("cookie")
  const match = cookieHeader?.match(/admin_session=([^;]+)/)
  const sessionId = match?.[1]

  if (sessionId) await prisma.adminSession.delete({ where: { id: sessionId } })

  c.header("Set-Cookie", "admin_session=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax")

  return c.json({ ok: true })
})

api.get("/admin/me", async (c) => {
  const admin = await requireAdmin(c)
  if (!admin) {
    return c.json({ error: "Unauthorized" }, 401)
  }

  return c.json(
    { id: admin.id, email: admin.email },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    }
  )
})

export default app
