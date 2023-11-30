import connectionInstance from "@/app/lib/dbConnect"
import { CartProduct } from "@/app/models";
import { NextResponse } from "next/server"

export async function GET() {
    await connectionInstance;
    const list = await CartProduct.find();
    return NextResponse.json({ message: 'Your categories', data: list })
}

export async function POST(req, res) {
    await connectionInstance;
    const data = await req.json();

    const result = await CartProduct.create(data);

    return NextResponse.json({ message: 'ok', data: result })
}