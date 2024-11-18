import Charts from "@/models/Charts";
import dbConnect from "@/lib/connectDB";
import { NextResponse } from "next/server";

export async function getAllCharts(){
    await dbConnect();
    
    try {
        const charts = await Charts.find({});

        return NextResponse.json(charts);
    } catch (err: any){
        return NextResponse.json({ error: err.message });
    }
    
}