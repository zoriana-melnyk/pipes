import dbConnect from '@/app/lib/dbConnect';
import { CartModel, CartProduct, UserModel } from '@/app/models';
import { NextResponse } from 'next/server';

export async function GET() {
  await dbConnect();
  const list = await CartModel.find();
  return NextResponse.json({ message: 'Your categories', data: list });
}

export async function POST(req, res) {
  await dbConnect();
  const data = await req.json();

  const result = await CartModel.create(data);

  return NextResponse.json({ message: 'ok', data: result });
}

export async function PUT(req, res) {
  await dbConnect();
  const data = await req.json();
  const { products, token } = data;

  if (!token) {
    return NextResponse.json(
      { message: 'User not found', ok: false },
      { status: 404 }
    );
  }

  const foundUser = await UserModel.findByToken(token);

  if (!foundUser) {
    return NextResponse.json(
      { message: 'User not found', ok: false },
      { status: 404 }
    );
  }

  // create/update product items
  const cartProducts = await Promise.all(
    products.map(async (product) => {
      const foundProduct = await CartProduct.findById(product._id);
      if (!foundProduct) {
        return await CartProduct.create({
          ...product,
          cart: foundUser.cart,
          product: product._id,
        });
      } else {
        return await CartProduct.findByIdAndUpdate(
          product._id,
          { ...product, cart: foundUser.cart },
          { new: true }
        );
      }
    })
  );

  const cart = await CartModel.findById(foundUser.cart);
  cart.items = cartProducts.map((product) => product._id);
  await cart.save();

  // populate cart with products
  await cart.populate('items');

  return NextResponse.json({ message: 'ok', data: cart });
}

export async function DELETE(req, res) {
  await dbConnect();
  const { _id } = await req.json();

  if (!_id) {
    return NextResponse.json(
      { message: 'Cart not found', ok: false },
      { status: 404 }
    );
  }
  // delete cart product and update cart items list
  const cartProduct = await CartProduct.findByIdAndDelete(_id);
  const cart = await CartModel.findById(cartProduct.cart);
  cart.items = cart.items.filter((item) => item._id !== _id);
  await cart.save();

  // populate cart with products
  await cart.populate('items');

  return NextResponse.json({ message: 'ok', data: cart });
}
