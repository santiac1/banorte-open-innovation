import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"
import { createBrowserClient, createServerClient } from "@supabase/ssr"

type SupabaseCookieOptions = {
  path?: string
  maxAge?: number
  domain?: string
  secure?: boolean
  sameSite?: "lax" | "strict" | "none"
}

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

function ensureSupabaseEnv() {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error(
      "Missing Supabase environment variables. Ensure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set."
    )
  }
}

export function createSupabaseBrowserClient() {
  ensureSupabaseEnv()
  return createBrowserClient(SUPABASE_URL!, SUPABASE_ANON_KEY!)
}

export function createSupabaseServerClient() {
  ensureSupabaseEnv()
  const cookieStore = cookies()
  return createServerClient(SUPABASE_URL!, SUPABASE_ANON_KEY!, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value
      },
      set(name: string, value: string, options: SupabaseCookieOptions = {}) {
        cookieStore.set({ name, value, ...options })
      },
      remove(name: string, options: SupabaseCookieOptions = {}) {
        cookieStore.set({ name, value: "", ...options, maxAge: 0 })
      },
    },
  })
}

export function createSupabaseMiddlewareClient(req: NextRequest, res: NextResponse) {
  ensureSupabaseEnv()
  return createServerClient(SUPABASE_URL!, SUPABASE_ANON_KEY!, {
    cookies: {
      get(name: string) {
        return req.cookies.get(name)?.value
      },
      set(name: string, value: string, options: SupabaseCookieOptions = {}) {
        res.cookies.set({ name, value, ...options })
      },
      remove(name: string, options: SupabaseCookieOptions = {}) {
        res.cookies.set({ name, value: "", ...options, maxAge: 0 })
      },
    },
  })
}
