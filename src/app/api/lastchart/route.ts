"use server"

import LastCharts from "@/models/LastCharts";
import dbConnect from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const GET = async() =>{
    await dbConnect();
    
    try {
        let charts = []
        charts = await LastCharts.find();
        
        return NextResponse.json(charts);
    } catch (err: any){
        return NextResponse.json({ error: err.message });;
    }
    
}