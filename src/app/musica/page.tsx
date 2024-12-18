'use client'

import { useState } from "react"
import TopAlbums from "./album"
import TopTracks from "./track"

export default function Page() {
    const [page, setPage] = useState("albums")
    return (
        <div className="flex flex-col items-center">
            <div className="flex flex-row gap-5">
                <div className={`p-3 ${page == "albums" ? "bg-red-500" : "bg-white"}`} onClick={() => {setPage("albums")}}>Top Álbuns</div>
                <div className={`p-3 ${page == "musicas" ? "bg-red-500" : "bg-white"}`} onClick={() => {setPage("musicas")}}>Top Músicas</div>
            </div>
            <div className={`${page == "albums" ? "" : "hidden"}`}>
                <TopAlbums />
            </div>
            <div className={`${page == "musicas" ? "" : "hidden"}`}>
                <TopTracks />
            </div>
        </div>
    )    
}