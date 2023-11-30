import { NextResponse } from 'next/server';
import connectDB from '../lib/dbConnect';

export default async function middleware(req) {
  console.log('....middleware...');
  // You can modify the request or create a new response here
  const res = NextResponse.next();
  res.headers.set('X-Middleware', 'Applied');
  await connectDB()

  return res;
}