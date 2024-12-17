'use client'

import { fallbackModeToStaticPathsResult } from "next/dist/lib/fallback"
import { useState } from "react"

export default function Page() {
    const [albums, setAlbums] = useState([])
    const [top, setTop] = useState<any[]>([])
    const [showList, setShowList] = useState(false)  

    /* eslint-disable */
    const LastFM = require('last-fm')
    /* eslint-disable */
    const lastfm = new LastFM('33d9baf9f1c9f421722426045e2075a0')

    const handleChange = (e: any) => {
        if (e.target.value.length > 0) {
            lastfm.albumSearch({ q: e.target.value }, (err: any, data: any) => {
                if (err) {
                    console.error(err)
                } else {
                    setAlbums(data["result"])
                }
            })
        } else {
            setAlbums([])
        }
    }


    return (
        <div className="flex flex-col items-center justify-center gap-5 mt-5" >
            <input placeholder="Álbum, artista..." className="border-black border-2 p-2 w-4/5 md:w-[250px] lg:w=[300px] h-[40px]" onChange={handleChange}></input>
            <div className="justify-center gap-2 grid grid-cols-2 md:grid-cols-3 place-content-center">
                {
                    albums.map((album: any) => (
                        (album.images.length != 0) &&
                        <div className="group bg-transparent size-[150px] md:size-[200px] perspective-normal" key={album.artistName + "_" + album.name}>
                            <div className="relative w-full h-full text-center transform-3d duration-[800ms] group-hover:rotate-y-180">
                                <div className="absolute w-full h-full backface-hidden">
                                    <img width="200px" src={album.images[2]}></img>
                                </div>
                                <div className="absolute w-full h-full backface-hidden rotate-y-180">
                                    <p>{album.name}</p>
                                    <p>{album.artistName}</p>
                                    {(top.length < 10) &&
                                        <button onClick={() => {
                                            setTop([...top, album])
                                        }}>ADD</button>
                                    }
                                </div>
                            </div>
                        </div>

                    ))
                }
            </div>


            <div className={`p-5 h-full w-[150px] bg-white drop-shadow-xl ${showList ? "right-0" : "-right-[150px]"} duration-[800ms] top-0 fixed flex flex-col gap-5 items-center`}>
                <button className={`z-0 absolute -left-18 bg-white text-center ${showList ? "bottom-20" : "bottom-5 "} duration-[400ms] flex items-center justify-center rounded-full drop-shadow-sm size-[50px]`}>
                    <span className="material-icons">save</span>
                </button>
                <button className="z-10 absolute bottom-5 -left-18 bg-white text-center flex items-center justify-center rounded-full drop-shadow-sm size-[50px]" onClick={() => {
                    setShowList(!showList)
                }}>
                    <span className="material-icons">
                        {
                            showList
                            ?
                            "close"
                            :
                            "leaderboard"
                        }                        
                    </span>
                </button>
                {
                    top.map((album: any, index: any) => (
                        <div className="flex flex-col gap-2" key={index}>
                            <div className="relative size-[100px] flex items-end">
                                <span style={{ textShadow: '#000 1px 0 10px' }} className="leading-none z-10 absolute funnel-sans text-[65px] text-white">{index + 1}</span>
                                <img className="z-0 absolute size-[100px]" src={album.images[2]}></img>
                            </div>
                            <div className="grid grid-cols-3">
                                {(index != 0) &&
                                    <button className="col-start-1 material-icons" onClick={() => {
                                        const currentTop = [...top]
                                        const anterior = currentTop[index - 1]
                                        currentTop[index - 1] = currentTop[index]
                                        currentTop[index] = anterior
                                        setTop(currentTop)
                                    }}>keyboard_arrow_up</button>
                                }
                                <button className="col-start-2 material-icons" onClick={() => {
                                    const currentTop = [...top]
                                    currentTop.splice(index, 1)
                                    setTop(currentTop)
                                }}>delete</button>

                                {(index != top.length - 1) &&
                                    <button className="col-start-3 material-icons" onClick={() => {
                                        const currentTop = [...top]
                                        const posterior = currentTop[index + 1]
                                        currentTop[index + 1] = currentTop[index]
                                        currentTop[index] = posterior
                                        setTop(currentTop)
                                    }}>keyboard_arrow_down</button>
                                }
                            </div>

                        </div>
                    ))
                }
            </div>
        </div>
    )
}