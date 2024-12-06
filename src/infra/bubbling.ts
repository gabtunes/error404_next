import Bubbling from "@/models/Bubbling";
import dbConnect from "@/lib/connectDB";
import { NextResponse } from "next/server";

export async function getBubbling(){
    await dbConnect();
    
    try {
        const bubbling = await Bubbling.find({});

        return NextResponse.json(bubbling);
    } catch (err: any){
        return NextResponse.json({ error: err.message });
    }
    
}