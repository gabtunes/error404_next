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

export async function getLastChart(ano: number){
    await dbConnect();
    
    try {
        const charts = await Charts.find({
            updated_at: {
                $lte: new Date()
            },
            ano: ano
        }).sort({ updated_at: -1 }).limit(2);

        return NextResponse.json(charts);
    } catch (err: any){
        return NextResponse.json({ error: err.message });
    }
    
}

export async function getAnos(){
    await dbConnect();
    
    try {
        const charts = await Charts.find({
            updated_at: {
                $lte: new Date()
            }
        }).sort({ ano: -1 }).limit(1);

        return NextResponse.json(charts);
    } catch (err: any){
        return NextResponse.json({ error: err.message });
    }
    
}