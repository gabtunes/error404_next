"use client"

import { useState } from "react"
import TopAlbums from "./album"
import TopTracks from "./track"
//import { redirect } from "next/navigation";
import { IMusica } from "@/models/Musica";
import { useTelegram } from "@/lib/telegramProvider";


export default function Switcher(props: { data: Array<IMusica> }) {
    const [page, setPage] = useState("albums")
    const data = props["data"]

    const { user } = useTelegram();
    console.log(user);

    return (
        <>
            {
                user ? (
                    <div className="flex flex-col items-center" >
                        <div className="flex flex-row gap-5">
                            <div className={`p-3 ${page == "albums" ? "bg-red-500" : "bg-white"}`} onClick={() => { setPage("albums") }}>Top Álbuns</div>
                            <div className={`p-3 ${page == "musicas" ? "bg-red-500" : "bg-white"}`} onClick={() => { setPage("musicas") }}>Top Músicas</div>
                        </div>
                        <div className={`${page == "albums" ? "" : "hidden"}`}>
                            <TopAlbums albums_db={data.filter((registro: any) => registro["membro"] == user?.id)} />
                        </div>
                        <div className={`${page == "musicas" ? "" : "hidden"}`}>
                            <TopTracks />
                        </div>
                    </div>
                ) : (<div>UEPA</div>)
            }
        </>
    )
}