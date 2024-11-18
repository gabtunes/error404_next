import Log from "@/app/models/Log";
import dbConnect from "@/lib/connectDB";
import { NextResponse } from "next/server";

export async function GET(){
    await dbConnect();
    
    try {
        const logs = await Log.find({});

        return NextResponse.json(logs);
    } catch (err: any){
        return NextResponse.json({ error: err.message });
    }
    
}