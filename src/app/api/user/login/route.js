import dbConnect from '@/app/lib/dbConnect';
import { CartModel, UserModel } from '@/app/models';
import { NextResponse } from 'next/server';
import connectDB from '@/app/lib/dbConnect';

export async function POST(req, res) {
  await connectDB();
  // next.js post route handler to login user
  // get data from request body
  const data = await req.json();
  // get email and password from data
  const { email, password } = data;
  // check if email and password is provided
  if (!email || !password) {
    return NextResponse.json(
      {
        message: 'Please provide email and password',
        ok: false,
      },
      {
        status: 400,
      }
    );
  }
  // connect to database
  await dbConnect();
  // find user by email in database by using mongoose model
  const fondUser = await UserModel.findOne({ email });
  if (!fondUser) {
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

  const isMatch = await fondUser.comparePassword(password);
  if (!fondUser.cart) {
    const userCart = await CartModel.create({ author: fondUser._id, name: fondUser.email, products: [] });
    fondUser.cart = userCart._id;
    fondUser.cartName = fondUser.email;
    await fondUser.save();
  }

  if (!isMatch) {
    return NextResponse.json(
      {
        message: 'Password Failed',
        ok: false,
      },
      {
        status: 401,
      }
    );
  }
  const updatedUser = await fondUser.generateToken();

  return NextResponse.json(
    { data: updatedUser, ok: true },
    { headers: { 'Set-Cookie': `token=${updatedUser.token}` } }
  );
}
