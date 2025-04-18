"use server"

import Musica from "@/models/Musica";
import dbConnect from "@/lib/connectDB";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function getAllMusica(){
    await dbConnect();
    
    try {
        const musica = await Musica.aggregate(
            [
              {
                "$lookup": {
                  'from': 'membro',
                  'localField': 'membro',
                  'foreignField': 'id_telegram',
                  'as': 'membro'
                }
              },
              {
                '$addFields': {
                  'membro': { '$arrayElemAt': ['$membro', 0] }
                }
              }
            ],
            { maxTimeMS: 60000, allowDiskUse: true }
          );

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

export async function addMusicafromMembro(membro: number, ano: number, albums: Array<object>, tracks: Array<object> ){
    await dbConnect();
    
    try {
        await Musica.create({
            membro: membro,
            ano: ano,
            albums: albums,
            tracks: tracks,
            updated_at: new Date()
        });

        revalidatePath("/musica")
    } catch (err: any){
        return NextResponse.json({ error: err.message });
    }
    
}

export async function updateMusicafromMembro(membro: number, ano: number, update: object ){
    await dbConnect();
    
    try {
        await Musica.updateOne({
            membro: membro,
            ano: ano},
            {"$set": update});

        revalidatePath("/musica/createList")
    } catch (err: any){
        return NextResponse.json({ error: err.message });
    }
    
}