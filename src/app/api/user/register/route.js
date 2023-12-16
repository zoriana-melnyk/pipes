// auth route that creates a new user via email or third party provider by using Next.js API Routes
import dbConnect from '@/app/lib/dbConnect';
import { UserModel } from '@/app/models';
import { NextResponse } from 'next/server';
import { hashPassword } from '@/app/lib/auth';

export async function POST(req, res) {
  await dbConnect();
  const data = await req.json();

  const hashedPassword = await hashPassword(data.password);

  try {
    const result = await UserModel.create({
      ...data,
      password: hashedPassword,
    });
    return NextResponse.json({ message: 'ok', data: result });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 404 });
  }
}
