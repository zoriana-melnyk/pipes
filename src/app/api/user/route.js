import dbConnect from '@/app/lib/dbConnect';
import { UserModel } from '@/app/models';
import { NextResponse } from 'next/server';

export async function GET() {
  await dbConnect();
  const list = await UserModel.find();
  return NextResponse.json({ message: 'Hello from Next.js!', data: list });
}

export async function POST(req, res) {
  await dbConnect();
  const data = await req.json();

  const result = await UserModel.create(data);

  return NextResponse.json({ message: 'Hello from Next.js!', data: result });
}
