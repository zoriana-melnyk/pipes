import dbConnect from '@/app/lib/dbConnect';
import { UserModel } from '@/app/models';
import { NextResponse } from 'next/server';
import { verifyPassword } from '@/app/lib/auth';

export async function POST(req, res) {
  // next.js post route handler to login user
  // get data from request body
  const data = await req.json();
  // get email and password from data
  const { email, password } = data;
  // check if email and password is provided
  if (!email || !password) {
    return NextResponse.next({
      status: 400,
      message: 'Please provide email and password',
    });
  }
  // connect to database
  await dbConnect();
  // find user by email in database by using mongoose model
  const fondUser = await UserModel.findOne({ email });

  // check if user is found and password is correct
  if (!fondUser || !(await verifyPassword(password, fondUser.password))) {
    return NextResponse.json(
      {
        status: 401,
        message: 'Invalid credentials',
      },
      {
        status: 401,
      }
    );
  }
  // create session object
  const session = {
    user: {
      id: fondUser._id,
      email: fondUser.email,
    },
  };
  // return session object
  return NextResponse.json({ session, data: fondUser });
}
