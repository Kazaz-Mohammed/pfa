import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createClient } from '@/lib/db'

export async function GET() {
  try {
    const cookieStore = await cookies()
    const sessionId = cookieStore.get('session_id')?.value

    if (!sessionId) {
      return NextResponse.json({ user: null }, { status: 401 })
    }

    const db = createClient()

    // Get session with user
    const { rows } = await db.query(
      `SELECT u.id, u.name, u.email 
       FROM sessions s 
       JOIN userss u ON s.user_id = u.id 
       WHERE s.id = $1 AND s.expires_at > NOW()
       LIMIT 1`,
      [sessionId],
    )

    if (rows.length === 0) {
      // Invalid or expired session
      return NextResponse.json({ user: null }, { status: 401 })
    }

    // Return user data without sensitive information
    return NextResponse.json({ user: rows[0] })
  } catch (error) {
    console.error('Get current user error:', error)
    return NextResponse.json(
      { error: 'Authentication check failed' },
      { status: 500 }
    )
  }
}