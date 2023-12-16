import dbConnect from '@/app/lib/dbConnect';
import { UserModel } from '@/app/models';
import { NextResponse } from 'next/server';

export async function POST(req, res) {
  await dbConnect();
  const { token } = await req.json();
  const user = await UserModel.findByToken(token);
  await user.populate({
    path: 'cart',
    populate: { path: 'items', populate: { path: 'product' } },
  });
  if (!user) {
    return NextResponse.json(
      {
        message: 'User not found',
        ok: false,
      },
      {
        status: 404,
      }
    );
  }

  return NextResponse.json({ data: user, ok: true });
}
