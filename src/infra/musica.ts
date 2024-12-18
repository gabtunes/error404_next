"use server"

import Musica from "@/models/Musica";
import dbConnect from "@/lib/connectDB";
import { NextResponse } from "next/server";

export async function getAllMusica(){
    await dbConnect();
    
    try {
        const musica = await Musica.find({});

        return NextResponse.json(musica);
    } catch (err: any){
        return NextResponse.json({ error: err.message });
    }
    
}

export async function getMusicafromMembro(membro: number, ano: number){
    await dbConnect();
    
    try {
        const musica = await Musica.findOne({membro: membro, ano: ano});

        return NextResponse.json(musica);
    } catch (err: any){
        return NextResponse.json({ error: err.message });
    }
    
}

export async function addMusicafromMembro(membro: number, ano: number, albums: Array<Object>, tracks: Array<Object> ){
    await dbConnect();
    
    try {
        const musica = await Musica.create({
            membro: membro,
            ano: ano,
            albums: albums,
            tracks: tracks,
            updated_at: new Date()
        });

        return NextResponse.json(musica);
    } catch (err: any){
        return NextResponse.json({ error: err.message });
    }
    
}

export async function updateMusicafromMembro(membro: number, ano: number, update: Object ){
    await dbConnect();
    
    try {
        const musica = await Musica.updateOne({
            membro: membro,
            ano: ano},
            {"$set": update});

        return NextResponse.json(musica);
    } catch (err: any){
        return NextResponse.json({ error: err.message });
    }
    
}