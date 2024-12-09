"use server"

import Log from "@/models/Log";
import dbConnect from "@/lib/connectDB";
import { NextResponse } from "next/server";

export async function getCharts(ano: number) {
    await dbConnect();

    try {
        const charts = await Log.aggregate([
            {
                "$lookup":
                {
                    "from": 'charts',
                    "let": { "id": '$id' },
                    "pipeline": [{
                        "$match": {
                            "$expr": {
                                "$and": [
                                    { "$lte": ["$updated_at", new Date()] },
                                    { "$eq": ['$ano', ano] }
                                ]
                            }
                        }
                    }, {
                        "$sort": { "updated_at": -1 }
                    }, {
                        "$limit": 1
                    }],
                    "as": 'ChartsAno'
                }
            }, {
                "$addFields": {
                    "charts": {
                        "$getField": {
                            "field": 'updated_at',
                            "input": {
                                "$arrayElemAt": ['$ChartsAno', 0]
                            }
                        }
                    },
                    "ano": {
                        "$getField": {
                            "field": 'ano',
                            "input": {
                                "$arrayElemAt": ['$ChartsAno', 0]
                            }
                        }
                    }
                }
            }, {
                "$project": { 'ChartsAno': 0 }
            }, {
                "$match": {
                    "$expr": {
                        "$lte": ['$updated_at', '$charts']
                    }
                }
            }, {
                "$group": {
                    "_id": {
                        "tmdb": '$tmdb',
                        "membro": '$membro'
                    },
                    "logs_n": {
                        "$sum": {
                            "$cond": {
                                "if": {
                                    "$and": [
                                        { "$eq": ['$nota', null] },
                                        { "$eq": ['$watched', false] }
                                    ]
                                },
                                "then": 0,
                                "else": 1
                            }
                        }
                    },
                    "logs": {
                        "$addToSet": {
                            "membro": '$membro',
                            "data": '$data',
                            "nota": '$nota',
                            "watched": '$watched',
                            "updated_at": '$updated_at'
                        }
                    },
                    "ano": { "$max": '$ano' }
                }
            }, {
                "$replaceRoot": {
                    "newRoot": {
                        "$mergeObjects": ['$_id', '$$ROOT']
                    }
                }
            }, {
                "$project": { "filme": 0, "_id": 0 }
            }, {
                "$group": {
                    "_id": '$tmdb',
                    "media": {
                        "$avg": {
                            "$getField": {
                                "field": 'nota',
                                "input": {
                                    "$arrayElemAt": [
                                        {
                                            "$sortArray": {
                                                "input": '$logs',
                                                "sortBy": { "updated_at": -1 }
                                            }
                                        }, 0]
                                }
                            }
                        }
                    },
                    "good": {
                        "$sum": {
                            "$cond": {
                                "if": {
                                    "$gte": [
                                        {
                                            "$getField": {
                                                "field": 'nota',
                                                "input": {
                                                    "$arrayElemAt": [
                                                        {
                                                            "$sortArray": {
                                                                "input": '$logs',
                                                                "sortBy": {
                                                                    "updated_at": -1
                                                                }
                                                            }
                                                        }, 0
                                                    ]
                                                }
                                            }
                                        }, 3
                                    ]
                                },
                                "then": 1,
                                "else": 0
                            }
                        }
                    },
                    "v_good": {
                        "$sum": {
                            "$cond": {
                                "if": {
                                    "$gte": [
                                        {
                                            "$getField": {
                                                "field": 'nota',
                                                "input": {
                                                    "$arrayElemAt": [
                                                        {
                                                            "$sortArray": {
                                                                "input": '$logs',
                                                                "sortBy": {
                                                                    "updated_at": -1
                                                                }
                                                            }
                                                        }, 0
                                                    ]
                                                }
                                            }
                                        }, 4
                                    ]
                                },
                                "then": 1,
                                "else": 0
                            }
                        }
                    },
                    "notas_nao_nula": {
                        "$sum": {
                            "$cond": {
                                "if": {
                                    "$eq": [
                                        {
                                            "$getField": {
                                                "field": 'nota',
                                                "input": {
                                                    "$arrayElemAt": [
                                                        {
                                                            "$sortArray": {
                                                                "input": '$logs',
                                                                "sortBy": {
                                                                    "updated_at": -1
                                                                }
                                                            }
                                                        }, 0
                                                    ]
                                                }
                                            }
                                        }, null
                                    ]
                                },
                                "then": 0,
                                "else": 1
                            }
                        }
                    },
                    "membros_n": {
                        "$count": {}
                    },
                    "logs_n": {
                        "$sum": '$logs_n'
                    },
                    "logs": {
                        "$push": '$logs'
                    },
                    "ano": {
                        "$max": '$ano'
                    }
                }
            }, {
                "$addFields": {
                    "percent": {
                        "$cond": {
                            "if": {
                                "$eq": ['$notas_nao_nula', 0]
                            },
                            "then": null,
                            "else": {
                                "$divide": [
                                    '$good',
                                    '$notas_nao_nula'
                                ]
                            }
                        }
                    },
                    "superpercent": {
                        "$cond": {
                            "if": { "$eq": ['$notas_nao_nula', 0] },
                            "then": null,
                            "else": {
                                "$divide": [
                                    '$v_good',
                                    '$notas_nao_nula'
                                ]
                            }
                        }
                    }
                }
            }, {
                "$addFields": {
                    "selo": {
                        "$cond": {
                            "if": { "$gte": ['$percent', 0.6] },
                            "then": {
                                "$cond": {
                                    "if": {
                                        "$and": [
                                            {
                                                "$gte": ['$superpercent', 0.7]
                                            },
                                            {
                                                "$gte": [
                                                    '$notas_nao_nula',
                                                    15
                                                ]
                                            }
                                        ]
                                    },
                                    "then": 'cf',
                                    "else": 'f'
                                }
                            },
                            "else": 'r'
                        }
                    }
                }
            }, {
                "$lookup": {
                    "from": 'filme',
                    "localField": '_id',
                    "foreignField": 'tmdb',
                    'as': 'filme'
                }
            }, {
                "$replaceRoot": {
                    "newRoot": {
                        "$mergeObjects": [{ "$arrayElemAt": ['$filme', 0] }, '$$ROOT']
                    }
                }
            }, {
                "$project": { "_id": 0, "filme": 0, "paises": 0 }
            }, {
                "$match": {
                    "$expr": {
                        "$eq": [{ "$year": '$data' }, '$ano']
                    },
                    "$or": [
                        {
                            "$and": [
                                { "membros_n": { "$gte": 5 } },
                                { "duracao": { "$gte": 60 } }
                            ]
                        },
                        {
                            "$and": [
                                { "membros_n": { "$gte": 10 } },
                                { "duracao": { "$lt": 60 } }
                            ]
                        }
                    ]
                }
            }, {
                "$addFields": {
                    "fora": { "$ifNull": ['$fora', false] }
                }
            }, {
                "$match": { "$expr": { "$eq": ['$fora', false] } }
            }, {
                "$sort": {
                    "media": -1,
                    "percent": -1,
                    "logs_n": -1,
                    "membros_n": -1,
                    "duracao": -1,
                    "data": 1
                }
            }, {
                "$project": {
                    "tmdb": 1,
                    "titulo": 1,
                    "oscar": 1,
                    "media": 1,
                    "logs": 1,
                    "percent": 1,
                    "selo": 1
                }
            }
        ], { allowDiskUse: true, maxAwaitTimeMS: 60000 });

        return NextResponse.json(charts);
    } catch (err: any) {
        return NextResponse.json({ error: err.message });
    }
}