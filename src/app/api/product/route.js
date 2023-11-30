import connectionInstance from "@/app/lib/dbConnect"
import { ProductModel } from "@/app/models";
import { NextResponse } from "next/server"

export async function GET() {
    await connectionInstance;
    const list = await ProductModel.find();
    return NextResponse.json({ message: 'Your products', data: list })
}

export async function POST(req, res) {
    await connectionInstance;
    const data = await req.json();

    const result = await ProductModel.create(data);

    return NextResponse.json({ message: 'ok', data: result })
}