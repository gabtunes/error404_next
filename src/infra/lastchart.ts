import LastCharts from "@/models/LastCharts";
import dbConnect from "@/lib/connectDB";
import { NextResponse } from "next/server";

export async function getLastCharts(){
    await dbConnect();
    
    try {
        const lastcharts = await LastCharts.find({});

        return NextResponse.json(lastcharts);
    } catch (err: any){
        return NextResponse.json({ error: err.message });
    }
    
}