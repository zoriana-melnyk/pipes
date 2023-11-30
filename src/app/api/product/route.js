import dbConnect from "@/app/lib/dbConnect"
import { ProductModel } from "@/app/models";
import { NextResponse } from "next/server"

export async function GET() {
    await dbConnect();
    const list = await ProductModel.find();
    return NextResponse.json({ message: 'Your products', data: list })
}

export async function POST(req, res) {
    await dbConnect();
    const data = await req.json();

    const result = await ProductModel.create(data);

    return NextResponse.json({ message: 'ok', data: result })
}