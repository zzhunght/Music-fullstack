'use client'
import type { NextRequest } from 'next/server'
import { STORAGE_KEY } from './constants'

export function middleware(request: NextRequest) {
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem(STORAGE_KEY.AccessToken)
        if (!token) return Response.redirect(new URL('/login', request.url))
    }

}

export const config = {
    matcher: [
        '/albums',
        '/artists',
        '/categories',
        '/playlists',
        '/songs',
    ],
}