import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const pathname = req.nextUrl.pathname

    if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
      if (!token) {
        return NextResponse.redirect(new URL('/admin/login', req.url))
      }
      if (token.role !== 'ADMIN' && token.role !== 'SUPER_ADMIN') {
        return NextResponse.redirect(new URL('/admin/login', req.url))
      }
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const pathname = req.nextUrl.pathname
        if (pathname.startsWith('/admin/login')) return true
        if (pathname.startsWith('/admin')) return !!token
        return true
      },
    },
  }
)

export const config = {
  matcher: ['/admin/:path*'],
}
