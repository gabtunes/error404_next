"use server"

import LastCharts from "@/models/LastCharts";
import dbConnect from "@/lib/connectDB";
import { NextRequest, NextResponse } from "next/server";

export const GET = async(request: NextRequest) =>{
    await dbConnect();
    
    try {
        let charts = []
        charts = await LastCharts.find();
        
        return NextResponse.json(charts);
    } catch (err: any){
        return NextResponse.json({ error: err.message });;
    }
    
}