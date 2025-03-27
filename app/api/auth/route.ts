import { NextResponse } from 'next/server';
import { Pool } from 'pg';
import { loginUser, registerUser } from "@/lib/auth-actions";



export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, email, password, name } = body;

    if (action === 'login') {
      // Handle login
        const result = await loginUser({ email, password });
        return NextResponse.json(result);

    } else if (action === 'register') {
      // Handle registration
        const result = await registerUser({ name, email, password });
        return NextResponse.json(result);
    }

    return NextResponse.json({ success: false, message: 'Invalid action' });
  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json({ success: false, message: 'Server error' });
  }
}

