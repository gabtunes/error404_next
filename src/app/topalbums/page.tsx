'use client'

import { useState } from "react"

export default function Page() {
    const [albums, setAlbums] = useState([])
    const [top, setTop] = useState<any[]>([])

    const LastFM = require('last-fm')
    const lastfm = new LastFM('33d9baf9f1c9f421722426045e2075a0')

    const handleChange = (e: any) => {
        if (e.target.value.length > 0){
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
        <div>
            <input onChange={handleChange}></input>
            {
                albums.map((album: any, index: any) => (
                    (album.images.length != 0) &&
                    <div key={album.artistName+ "_" + album.name}>
                        <img width="100px" src={album.images[2]}></img>
                        {album.name} - {album.artistName}
                        {(top.length < 10) &&
                        <button onClick={() => {
                            setTop([...top, album])
                        }}>ADD</button>
                        }
                    </div>
                    
                ))
            }
            <div className="w-full h-20 bg-red-400 bottom-0 fixed flex flex-row">
                {
                    top.map((album: any, index:any) => (
                        <div key={index}>
                            <div className="flex flex-row">
                            {index+1}
                            <img width="50px" height="50px" src={album.images[1]}></img>
                            </div>
                            <button onClick={() => {
                                const currentTop = [...top]
                                currentTop.splice(index, 1)
                                setTop(currentTop)
                            }}>-</button>
                            {(index != 0) &&
                            <button onClick={() => {
                                const currentTop = [...top]
                                const anterior = currentTop[index - 1]
                                currentTop[index - 1] = currentTop[index]
                                currentTop[index] = anterior
                                setTop(currentTop)
                            }}>ant</button>
                            }
                            {(index != top.length-1) &&
                            <button onClick={() => {
                                const currentTop = [...top]
                                const posterior = currentTop[index + 1]
                                currentTop[index + 1] = currentTop[index]
                                currentTop[index] = posterior
                                setTop(currentTop)
                            }}>post</button>
                            }
                        </div>
                    ))
                }
            </div>
        </div>
    )
}