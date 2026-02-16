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

api.post("/admin/quiz", async c => {
  const body = await c.req.json()
  const {
    title,
    level,
    explanation,
    correctQuizId,
    articleId,
    choices,
    categories,
  } = body

  const quiz = await prisma.quiz.create({
    data: {
      title,
      level,
      explanation,
      correctQuizId,
      articleId,
      choices: {
        create: choices,
      },
    },
  })

  for (const name of categories) {
    const category = await prisma.category.upsert({
      where: { name },
      update: {},
      create: { name },
    })

    await prisma.quizCategory.create({
      data: {
        quizId: quiz.id,
        categoryId: category.id,
      },
    })
  }

  return c.json(quiz, 201)
})


api.get("/quizList", async c => {
  const quizList = await prisma.quiz.findMany({
    where: { deleted: "0" },
    include: {
      quizLinks: {
        include: {
          category: true,
        },
      },
    },
  })

  const result = quizList.map(q => ({
    id: q.id,
    title: q.title,
    level: q.level,
    explanation: q.explanation,
    correctQuizId: q.correctQuizId,
    createdAt: q.createdAt.toISOString(),
    deleted: q.deleted,
    view: q.view,
    categories: q.quizLinks.map(l => l.category.name),
  }))

  return c.json(result)
})

api.get("/latestQuiz", async c => {
  const quizList = await prisma.quiz.findMany({
    where: {
      deleted: "0" ,
      choices: {
        some: {}
      }
    },
    select: {
      id: true,
      title: true,
      explanation: true,
      level: true,
      correctQuizId: true,
      createdAt: true,
      choices: {
        select: {
          selectId: true,
          text: true,
          selected: true,
        }
      },
      quizLinks: {
        select: {
          category: {
            select: { name: true }
          }
        }
      }
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 5
  })

  return c.json(
    quizList.map(q => ({
      ...q,
      createdAt: q.createdAt.toISOString(),
      categories: q.quizLinks.map(l => l.category.name),
    }))
  )
})

api.get("/quiz/:id", async c => {
  const id = Number(c.req.param("id"))

  const q = await prisma.quiz.findFirst({
    where: {
      id,
      deleted: "0",
      choices: {
        some: {}
      }
    },
    select: {
      id: true,
      title: true,
      level: true,
      explanation: true,
      correctQuizId: true,
      createdAt: true,
      choices: {
        select: {
          selectId: true,
          text: true,
          selected: true,
        }
      },
      quizLinks: {
        select: {
          category: {
            select: { name: true }
          }
        }
      }
    }
  })

  if (!q) return c.json(null, 404)

  return c.json({
    id: q.id,
    title: q.title,
    level: q.level,
    explanation: q.explanation,
    correctQuizId: q.correctQuizId,
    createdAt: q.createdAt.toISOString(),
    choices: q.choices,
    categories: q.quizLinks.map(l => l.category.name),
  })
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

api.post("/choice/:quizId/:selectId/select", async (c) => {
  const quizId = Number(c.req.param("quizId"))
  const selectId = c.req.param("selectId")

  await prisma.choice.updateMany({
    where: {
      quizId,
      selectId,
    },
    data: {
      selected: { increment: 1 },
    },
  })

  return c.json({ ok: true })
})

api.get("/popularQuizRanking", async c => {
  const quizList = await prisma.quiz.findMany({
    include: {
      quizLinks: {
        include: {
          category: true,
        },
      },
    },
    where: { deleted: "0" },
    orderBy: {
      view: "desc",
    },
    take: 3
  })

  const result = quizList.map(q => ({
    id: q.id,
    title: q.title,
    level: q.level,
    explanation: q.explanation,
    correctQuizId: q.correctQuizId,
    createdAt: q.createdAt.toISOString(),
    deleted: q.deleted,
    view: q.view,
    categories: q.quizLinks.map(l => l.category.name),
  }))

  return c.json(result)
})

api.get("/unpopularQuizRanking", async c => {
  const quizList = await prisma.quiz.findMany({
    include: {
      quizLinks: {
        include: {
          category: true,
        },
      },
    },
    where: { deleted: "0" },
    orderBy: {
      view: "desc",
    },
    take: 3
  })

  const result = quizList.map(q => ({
    id: q.id,
    title: q.title,
    level: q.level,
    explanation: q.explanation,
    correctQuizId: q.correctQuizId,
    createdAt: q.createdAt.toISOString(),
    deleted: q.deleted,
    view: q.view,
    categories: q.quizLinks.map(l => l.category.name),
  }))

  return c.json(result)
})

api.get("/article/:id", async c => {
  const id = Number(c.req.param("id"))

  const article = await prisma.article.findUnique({
    where: { 
      id ,
      deleted: "0" 
    },
    include: {
      articleLinks: {
        include: {
          category: true,
        },
      },
    },
  })

  if (!article) return c.json({ error: "not found" }, 404)

  const categories = article.articleLinks.map(l => l.category.name)

  return c.json({
    ...article,
    categories,
  })
})

api.get("/article-with-quiz/:id", async c => {
  const articleId = Number(c.req.param("id"))

  if (Number.isNaN(articleId)) {
    return c.json({ error: "invalid article id" }, 400)
  }

  const quizzes = await prisma.quiz.findMany({
    where: { 
      articleId,
      deleted: "0" 
    },
    select: {
      id: true,
      title: true,
      explanation: true,
      correctQuizId: true,
      createdAt: true,
      choices: {
        select: {
          selectId: true,
          text: true,
          selected: true,
        }
      },
      quizLinks: {
        select: {
          category: {
            select: { name: true }
          }
        }
      }
    },
    orderBy: { createdAt: "asc" }
  })

  return c.json(
    quizzes.map(q => ({
      id: q.id,
      title: q.title,
      explanation: q.explanation,
      correctQuizId: q.correctQuizId,
      createdAt: q.createdAt.toISOString(),
      categories: q.quizLinks.map(l => l.category.name), // ← 追加
      choices: q.choices.map(c => ({
        selectId: c.selectId,
        text: c.text,
        selected: c.selected,
      })),
    }))
  )
})

api.post("/article/:id/view", async (c) => {
  const id = Number(c.req.param("id"))

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
    include: {
      articleLinks: {
        include: {
          category: true,
        },
      },
    },
    where: { deleted: "0" },
    orderBy: {
      updatedAt: "desc",
    },
  })

  const result = articleList.map(a => ({
    id: a.id,
    title: a.title,
    content: a.content,
    qiitaId: a.qiitaId ?? undefined,
    createdAt: a.createdAt.toISOString(),
    updatedAt: a.updatedAt.toISOString(),
    view: a.view,
    categories: a.articleLinks.map(l => l.category.name),
  }))

  return c.json(result)
})

api.get("/latestArticle", async c => {
  const articleList = await prisma.article.findMany({
    include: {
      articleLinks: {
        include: {
          category: true,
        },
      },
    },
    where: { deleted: "0" },
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
  })

  const result = articleList.map(a => ({
    id: a.id,
    title: a.title,
    content: a.content,
    qiitaId: a.qiitaId ?? undefined,
    createdAt: a.createdAt.toISOString(),
    updatedAt: a.updatedAt.toISOString(),
    view: a.view,
    categories: a.articleLinks.map(l => l.category.name),
  }))

  return c.json(result)
})

api.get("/category/:name/articles", async c => {
  const name = c.req.param("name")

  const articles = await prisma.article.findMany({
    where: {
      deleted: "0",
      articleLinks: {
        some: {
          category: {
            name,
          },
        },
      },
    },
  })

  return c.json(articles)
})

api.get("/popularArticleRanking", async c => {
  const articleList = await prisma.article.findMany({
    include: {
      articleLinks: {
        include: {
          category: true,
        },
      },
    },
    where: { deleted: "0" },
    orderBy: {
      view: "desc",
    },
    take: 3
  })

  const result = articleList.map(a => ({
    id: a.id,
    title: a.title,
    content: a.content,
    qiitaId: a.qiitaId ?? undefined,
    createdAt: a.createdAt.toISOString(),
    updatedAt: a.updatedAt.toISOString(),
    view: a.view,
    categories: a.articleLinks.map(l => l.category.name),
  }))

  return c.json(result)
})

api.get("/unpopularArticleRanking", async c => {
      const articleList = await prisma.article.findMany({
    include: {
      articleLinks: {
        include: {
          category: true,
        },
      },
    },
    where: { deleted: "0" },
    orderBy: {
      view: "asc",
    },
    take: 3
  })

  const result = articleList.map(a => ({
    id: a.id,
    title: a.title,
    content: a.content,
    qiitaId: a.qiitaId ?? undefined,
    createdAt: a.createdAt.toISOString(),
    updatedAt: a.updatedAt.toISOString(),
    view: a.view,
    categories: a.articleLinks.map(l => l.category.name),
  }))

  return c.json(result)
})

api.get("/articles/category/:name", async (c) => {
  const categoryName = c.req.param("name")

  const category = await prisma.category.findFirst({
    where: {
      name: {
        equals: categoryName,
        mode: "insensitive",
      },
    },
  })

  if (!category) return c.json([])

  const articles = await prisma.article.findMany({
    where: {
      deleted: "0",
      articleLinks: {
        some: {
          categoryId: category.id,
        },
      },
    },
    include: {
      articleLinks: {
        include: {
          category: true,
        },
      },
    },
  })

  const result = articles.map(a => ({
    id: a.id,
    title: a.title,
    content: a.content,
    qiitaId: a.qiitaId ?? undefined,
    createdAt: a.createdAt.toISOString(),
    updatedAt: a.updatedAt.toISOString(),
    view: a.view,
    categories: a.articleLinks.map(l => l.category.name),
  }))

  return c.json(result)
})

api.get("/quiz/category/:name", async (c) => {
  const categoryName = c.req.param("name")

  const category = await prisma.category.findFirst({
    where: {
      name: {
        equals: categoryName,
        mode: "insensitive",
      },
    },
  })

  if (!category) return c.json([])

  const quiz = await prisma.quiz.findMany({
    where: {
      deleted: "0",
      quizLinks: {
        some: {
          categoryId: category.id,
        },
      },
    },
    include: {
      quizLinks: {
        include: {
          category: true,
        },
      },
    },
  })

  const result = quiz.map(q => ({
    id: q.id,
    title: q.title,
    level: q.level,
    explanation: q.explanation,
    correctQuizId: q.correctQuizId,
    createdAt: q.createdAt.toISOString(),
    deleted: q.deleted,
    view: q.view,
    categories: q.quizLinks.map(l => l.category.name),
  }))

  return c.json(result)
})

type QiitaItem = {
  id: string
}

api.delete("/admin/article/:id", async c => {
  const id = Number(c.req.param("id"))

  await prisma.article.update({
    where: { id },
    data: { deleted: "1" },
  })

  return c.json({ ok: true })
})

api.delete("/admin/term/:id", async c => {
  const id = Number(c.req.param("id"))

  await prisma.terms.update({
    where: { id },
    data: { deleted: "1" },
  })

  return c.json({ ok: true })
})

api.delete("/admin/quiz/:id", async c => {
  const id = Number(c.req.param("id"))

  await prisma.quiz.update({
    where: { id },
    data: { deleted: "1" },
  })

  return c.json({ ok: true })
})

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
      },
    })

    for (const name of tags) {
      const category = await prisma.category.upsert({
        where: { name },
        update: {},
        create: { name },
      })

      await prisma.articleCategory.create({
        data: {
          articleId: article.id,
          categoryId: category.id,
        },
      })
    }

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
        tags: tags.map(t => ({ name: t })),
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
    console.error("POST /admin/article crashed:", e)
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

api.get("/terms", async c => {
  const terms = await prisma.terms.findMany({
    where: { deleted: "0" },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      term: true,
      description: true,
      createdAt: true,
      view: true,
      termLinks: {
        select: {
          category: {
            select: { name: true }
          }
        }
      }
    }
  })

  return c.json(
    terms.map(t => ({
      id: t.id,
      term: t.term,
      description: t.description,
      createdAt: t.createdAt.toISOString(),
      view: t.view,
      categories: t.termLinks.map(l => l.category.name),
    }))
  )
})

api.get("/term/:id", async c => {
  const id = Number(c.req.param("id"))

  const t = await prisma.terms.findFirst({
    where: { 
      id,
      deleted: "0"
    },
    select: {
      id: true,
      term: true,
      description: true,
      createdAt: true,
      termLinks: {
        select: {
          category: {
            select: { name: true }
          }
        }
      }
    }
  })

  if (!t) {
    return c.json({ error: "terms not found" }, 404)
  }

  return c.json({
    id: t.id,
    term: t.term,
    description: t.description,
    createdAt: t.createdAt.toISOString(),
    categories: t.termLinks.map(l => l.category.name),
  })
})

api.post("/term/:id/view", async (c) => {
  const id = Number(c.req.param("id"))

  await prisma.terms.update({
    where: { id },
    data: {
      view: { increment: 1 },
    },
  })

  return c.json({ ok: true })
})

function normalizeForSearch(text: string) {
  return text
    .normalize("NFKC")
    .toUpperCase()
    .replace(/[ぁ-ん]/g, s =>
      String.fromCharCode(s.charCodeAt(0) + 0x60)
    )
}

api.post("/admin/term", async c => {
  const body = await c.req.json()
  const {
    term,
    description,
    categories,
  } = body

  const createTerm = await prisma.terms.create({
    data: {
      term,
      term_normalized: normalizeForSearch(term),
      description,
    },
  })

  for (const name of categories) {
    const category = await prisma.category.upsert({
      where: { name },
      update: {},
      create: { name },
    })

    await prisma.termCategory.create({
      data: {
        termId: createTerm.id,
        categoryId: category.id,
      },
    })
  }

  return c.json(createTerm, 201)
})

api.get("/admin/termRecommend", async c => {
  const raw = c.req.query("q") ?? ""
  if (raw.length < 2) return c.json([])

  const q = normalizeForSearch(raw)

  const terms = await prisma.terms.findMany({
    where: {
      term_normalized: {
        contains: q,
      },
    },
    take: 10,
  })

  return c.json(terms)
})

export default app
