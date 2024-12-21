"use client"

import { useState } from "react"
import TopAlbums from "./album"
import TopTracks from "./track"
import { IMusica } from "@/models/Musica";
import { useTelegram } from "@/lib/telegramProvider";


export default function Switcher(props: { data: Array<IMusica> }) {
    const [page, setPage] = useState("albums")
    const data = props["data"]
    const { webApp } = useTelegram()

    return (
        <>
        {
            webApp ?
            (<div className="flex flex-col items-center" >
                <div className="flex flex-row gap-5">
                    <div className={`p-3 text-telegram-text bg-[${page == "albums" ? "telegram-button" : "telegram-background"}]`} onClick={() => { setPage("albums") }}>Top Álbuns</div>
                    <div className={`p-3 text-telegram-text bg-[${page == "musicas" ? "telegram-button" : "telegram-background"}]`} onClick={() => { setPage("musicas") }}>Top Músicas</div>
                </div>
                <div className={`${page == "albums" ? "" : "hidden"}`}>
                    <TopAlbums albums_db={data} />
                </div>
                <div className={`${page == "musicas" ? "" : "hidden"}`}>
                    <TopTracks />
                </div>
            </div>) :
            (<div>Que que tu tá fuxicando aqui? Vai abrir isso no Telegram!</div>)
        }
        </>
    )
}