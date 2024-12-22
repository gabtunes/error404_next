"use client"

import { useState } from "react"
import TopAlbums from "./album"
import TopTracks from "./track"
import { IMusica } from "@/models/Musica";


export default function Switcher(props: { data: Array<IMusica> }) {
    const [page, setPage] = useState("albums")
    const data = props["data"]

    return (
        <div className="flex flex-col items-center" >
            <div className="flex flex-row">
                <div className={`p-3 ${page == "albums" ? "text-[var(--tg-theme-button-text-color)] bg-[var(--tg-theme-button-color)]" : "text-[var(--tg-theme-text-color)] bg-[var(--tg-theme-bg-color)]"}`} onClick={() => { setPage("albums") }}>Top Álbuns</div>
                <div className={`p-3 ${page == "musicas" ? "text-[var(--tg-theme-button-text-color)] bg-[var(--tg-theme-button-color)]" : "text-[var(--tg-theme-text-color)] bg-[var(--tg-theme-bg-color)]"}`} onClick={() => { setPage("musicas") }}>Top Músicas</div>
            </div>
            <div className={`${page == "albums" ? "" : "hidden"}`}>
                <TopAlbums albums_db={data} />
            </div>
            <div className={`${page == "musicas" ? "" : "hidden"}`}>
                <TopTracks tracks_db={data} />
            </div>
        </div>
    )
}