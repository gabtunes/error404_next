"use server"

import Log from "@/models/Log";
import dbConnect from "@/lib/connectDB";
import { NextRequest, NextResponse } from "next/server";

export const GET = async(request: NextRequest) =>{
    await dbConnect();
    
    const searchParams = request.nextUrl.searchParams
    const user = searchParams.get('user')

    try {
        let logs = []
        if(user) {
            logs = await Log.aggregate(
                [
                  {
                    "$group": {
                      "_id": { "membro": '$membro', 'tmdb': '$tmdb' },
                      'logs': {
                        '$addToSet': {
                          'data': '$data',
                          'nota': '$nota',
                          'watched': '$watched',
                          'updated_at': '$updated_at'
                        }
                      },
                      "ultimo_log": { "$max": '$data' },
                      "ultimo_update": { "$max": '$updated_at' }
                    }
                  },
                  {
                    '$lookup': {
                      'from': 'filme',
                      'localField': '_id.tmdb',
                      'foreignField': 'tmdb',
                      'as': 'filme'
                    }
                  },{
                    '$lookup': {
                      'from': 'membro',
                      'localField': '_id.membro',
                      'foreignField': 'user',
                      'as': 'membro'
                    }
                  },
                  {
                    '$addFields': {
                      'membro': { '$arrayElemAt': ['$membro', 0] }
                    }
                  },{
                    "$sort": { 'ultimo_log': -1, 'ultimo_update': -1 }
                  }, {
                    '$match': {
                      '$expr': {
                        '$eq': ['$membro.id_telegram', parseInt(user)]
                      }
                    }
                  }
                ],
                { maxTimeMS: 60000, allowDiskUse: true }
              );
        } else {
            logs = await Log.aggregate(
                [
                  {
                    "$group": {
                      "_id": { "membro": '$membro', 'tmdb': '$tmdb' },
                      'logs': {
                        '$addToSet': {
                          'data': '$data',
                          'nota': '$nota',
                          'watched': '$watched',
                          'updated_at': '$updated_at'
                        }
                      },
                      "ultimo_log": { "$max": '$data' },
                      "ultimo_update": { "$max": '$updated_at' }
                    }
                  },
                  {
                    '$lookup': {
                      'from': 'filme',
                      'localField': '_id.tmdb',
                      'foreignField': 'tmdb',
                      'as': 'filme'
                    }
                  },{
                    '$lookup': {
                      'from': 'membro',
                      'localField': '_id.membro',
                      'foreignField': 'user',
                      'as': 'membro'
                    }
                  },
                  {
                    '$addFields': {
                      'membro': { '$arrayElemAt': ['$membro', 0] }
                    }
                  },{
                    "$sort": { 'ultimo_log': -1, 'ultimo_update': -1 }
                  },{
                    "$limit": 50
                  }
                ],
                { maxTimeMS: 60000, allowDiskUse: true }
              );
        }

        return NextResponse.json(logs);
    } catch (err: any){
        return NextResponse.json({ error: err.message });;
    }
    
}