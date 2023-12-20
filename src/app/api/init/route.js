import dbConnect from '@/app/lib/dbConnect';
import { ProductCategoryModel, ProductModel, UserModel, CartProduct, CartModel } from '@/app/models';
import { NextResponse } from 'next/server';

const categoriesMock = [
  {
    name: 'Труба безшовна',
    material: ['metal', 'plastic']
  },
  {
    name: 'Труба електрозварна',
    material: ['metal', 'plastic']
  },
  {
    name: 'Труба водогазопровідна',
    material: 'metal'
  },
  {
    name: 'Труба квадратна',
    material: ['metal', 'plastic']
  },
  {
    name: 'Труба профільна',
    material: 'metal'
  },
  {
    name: 'Труба пластикова',
    material: 'plastic'
  },
  {
    name: 'Труба поліетиленова',
    material: ['metal', 'plastic']
  },
];

const usersMock = [
  {
    firstName: 'admin',
    secondsName: 'admin',
    email: 'admin@gmail.com',
    phoneNumber: '380000000000',
    password: 'Test1234',
  },
  {
    firstName: 'dev',
    secondsName: 'dev',
    email: 'dev@gmail.com',
    phoneNumber: '380000000000',
    password: 'Test1234',
  }
];

const productsMock = [
  {
    name: 'Плівка поліетиленова',
    description: 'Плівка поліетиленова з первинної сировини',
    price: 10,
    currency: 'грн',
    imageSrc: 'pipes_film.png',
    category: 'category id'
  },
  {
    name: 'Труба для теплої підлоги',
    description: 'Труба поліетиленова для теплої підлоги',
    price: 10,
    currency: 'грн',
    imageSrc: 'pipes_floor.png',
    category: 'category id'
  },
  {
    name: 'Поліетиленова труба',
    description: 'Поліетиленова труба синя первинка ф32 х 2.5-3.0-3,4мм внутрішня стінка',
    price: 80,
    currency: 'грн',
    imageSrc: 'pipes_wal.png',
    category: 'category id'
  },
  {
    name: 'Труба для утеплення',
    description: 'Труба 16X2 PEX-A для опалення.Для підігрівання підлоги.PEX.',
    price: 80,
    currency: 'грн',
    imageSrc: 'pipes_warm.png',
    category: 'category id'
  },
  {
    name: 'Труба профільна',
    description: 'Труба профільна',
    price: 100,
    currency: 'грн',
    imageSrc: 'pipes_film.png',
    category: 'category id'
  },

  {
    name: 'Труба пластикова',
    description: 'Труба пластикова',
    price: 100,
    currency: 'грн',
    imageSrc: 'pipes_wal.png',
    category: 'category id'
  },
  {
    name: 'Труба поліетиленова',
    description: 'Труба поліетиленова',
    price: 100,
    currency: 'грн',
    imageSrc: 'pipes_floor.png',
    category: 'category id'
  },
  {
    name: 'Плівка поліетиленова',
    description: 'Плівка поліетиленова з вторинної сировини',
    price: 100,
    currency: 'грн',
    imageSrc: 'pipes_black_film.jpg',
    category: 'category id'
  },
]

const productCartsMock = [
  {
    amount: 28,
    product: 'product id',
    cart: 'cart id'
  },
  {
    amount: 12,
    product: 'product id',
    cart: 'cart id'
  },
  {
    amount: 4,
    product: 'product id',
    cart: 'cart id'
  },
];

const cartMock = {
  name: 'cart name',
  items: [],
  author: 'user id'
}

export async function GET() {
  await dbConnect();
  // create bulk categories
  const createdCategories = await ProductCategoryModel.insertMany(categoriesMock);

  // bulk create users
  const createdUsers = await UserModel.insertMany(usersMock);

  // create products and update categories
  const createdProducts = await productsMock.map(async (product, index) => {
    return await ProductModel.create({ ...product, category: createdCategories[index]._id });
  });
  const resultsProducts = await Promise.all(createdProducts);
  // update categories with products
  resultsProducts.map(async (product, index) => {
    const category = await ProductCategoryModel.findById(createdCategories[index]._id);
    category.items.push(product._id);
    await category.save();
  });

  const cartItem = await CartModel.create({ ...cartMock, author: createdUsers[0]._id });

  const cartProductItems = productCartsMock.map(async (productCart, index) => {
    return await CartProduct.create({ ...productCart, cart: cartItem._id, author: createdUsers[0]._id, product: createdProducts[index]._id });
  });
  const results = await Promise.all(cartProductItems);

  // insert cart products to cart
  const cart = await CartModel.findById(cartItem._id);
  cart.items = results.map(product => product._id);
  await cart.save();

  return NextResponse.json({ status: 'ok', message: 'done' });
}

export async function POST(req, res) {
  await dbConnect();
  const data = await req.json();

  const result = await ProductModel.create(data);

  return NextResponse.json({ message: 'ok', data: result });
}
