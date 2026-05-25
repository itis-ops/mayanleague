import { timingSafeEqual } from 'node:crypto'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import {
  isPreviewAccessEnabled,
  PREVIEW_ACCESS_COOKIE,
} from '@/lib/previewAccess'

const COOKIE_MAX_AGE = 60 * 60 * 24 * 14 // 14 days

function passwordsMatch(submitted: string, expected: string): boolean {
  const a = Buffer.from(submitted)
  const b = Buffer.from(expected)
  if (a.length !== b.length) return false
  return timingSafeEqual(a, b)
}

export async function POST(request: Request) {
  if (!isPreviewAccessEnabled()) {
    return NextResponse.json({ error: 'Preview access is not configured.' }, { status: 503 })
  }

  let password = ''
  try {
    const body = (await request.json()) as { password?: string }
    password = typeof body.password === 'string' ? body.password : ''
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  const expectedPassword = process.env.PREVIEW_ACCESS_PASSWORD!.trim()
  const token = process.env.PREVIEW_ACCESS_TOKEN!.trim()

  if (!passwordsMatch(password, expectedPassword)) {
    return NextResponse.json({ error: 'Invalid password.' }, { status: 401 })
  }

  const cookieStore = await cookies()
  cookieStore.set(PREVIEW_ACCESS_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: COOKIE_MAX_AGE,
  })

  return NextResponse.json({ ok: true })
}

export async function DELETE() {
  const cookieStore = await cookies()
  cookieStore.delete(PREVIEW_ACCESS_COOKIE)
  return NextResponse.json({ ok: true })
}
