import dbConnect from '@/app/lib/dbConnect';
import { UserModel } from '@/app/models';
import { NextResponse } from 'next/server';

export const PUT = async (req, route) => {
  // get user id from request
  const { id } = route.params;
  // get data from request body
  const data = await req.json();
  // connect to database
  await dbConnect();
  // find user by id and update only provided fields
  const updatedUser = await UserModel.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

  // return updated user
  return NextResponse.json({ data: updatedUser });
};
