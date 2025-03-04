"use server"

import Bubbling from "@/models/Bubbling";
import dbConnect from "@/lib/connectDB";
import { NextRequest, NextResponse } from "next/server";

export const GET = async() =>{
    await dbConnect();
    
    try {
        let bubbling = []
        bubbling = await Bubbling.find();
        
        return NextResponse.json(bubbling);
    } catch (err: any){
        return NextResponse.json({ error: err.message });;
    }
    
}