import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

import { createSupabaseMiddlewareClient } from "@/lib/supabase"

const DASHBOARD_ROUTES = ["/dashboard", "/transactions", "/simulator"]

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createSupabaseMiddlewareClient(req, res)
  const {
    data: { session },
  } = await supabase.auth.getSession()

  const path = req.nextUrl.pathname
  const isProtected = DASHBOARD_ROUTES.some((route) => path.startsWith(route))

  if (isProtected && !session) {
    const redirectUrl = req.nextUrl.clone()
    redirectUrl.pathname = "/login"
    redirectUrl.searchParams.set("redirectedFrom", path)
    return NextResponse.redirect(redirectUrl)
  }

  if ((path === "/login" || path === "/signup") && session) {
    const redirectUrl = req.nextUrl.clone()
    redirectUrl.pathname = "/dashboard"
    return NextResponse.redirect(redirectUrl)
  }

  return res
}

export const config = {
  matcher: ["/((dashboard|transactions|simulator).*)", "/login", "/signup"],
}
