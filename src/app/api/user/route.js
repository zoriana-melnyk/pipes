import { NextResponse } from "next/server"

export function GET() {
    return NextResponse.json({ message: 'Hello from Next.js!' })
}