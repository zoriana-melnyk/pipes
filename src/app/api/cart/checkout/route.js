import connectDB from '@/app/lib/dbConnect';
import { OrderModel, UserModel } from '@/app/models';
import { NextResponse } from 'next/server';

export const POST = async (req, route) => {
  // connect to database
  await connectDB();
  const { token: bodyToken } = await req.json();

  // get user token from cookies
  const token = req.cookies.get('token')?.value;
  // find user by token
  const foundUser = await UserModel.findByToken(bodyToken || token);
  await foundUser.populate({
    path: 'cart',
    populate: { path: 'items', populate: { path: 'product' } },
  });
  // add user order to user model
  const newOrder = await OrderModel.create({
    name: foundUser.email,
    items: foundUser.cart.items,
    author: foundUser._id,
  });

  // create or push new order to orders array
  await foundUser.updateOne({ $push: { orders: newOrder._id } });

  // reset current cart
  await foundUser.cart.updateOne({ $set: { items: [] } });

  // return new order
  return NextResponse.json({ data: newOrder });
};
