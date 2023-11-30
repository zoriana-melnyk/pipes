import dbConnect from "@/app/lib/dbConnect"
import { CartModel } from "@/app/models";
import { NextResponse } from "next/server"

export async function GET() {
    await dbConnect();
    const list = await CartModel.find();
    return NextResponse.json({ message: 'Your categories', data: list })
}

export async function POST(req, res) {
    await dbConnect();
    const data = await req.json();

    const result = await CartModel.create(data);

    return NextResponse.json({ message: 'ok', data: result })
}