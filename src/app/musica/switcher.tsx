"use client"

import { useEffect, useState } from "react"
import TopAlbums from "./album"
import TopTracks from "./track"
import { redirect } from "next/navigation";
import { IMusica } from "@/models/Musica";

declare global {
    interface Window {
        Telegram: any;
    }
}
interface UserData {
    id: number;
    first_name: string;
    last_name?: string;
    username?: string;
    language_code: string;
    is_premium?: boolean
}

export default function Switcher(props: { data: Array<IMusica> }) {
    const [page, setPage] = useState("albums")
    const [user, setUser] = useState<UserData | null>(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const data = props["data"]

    useEffect(() => {
        if (global?.window) {
            setUser(window.Telegram.WebApp.initDataUnsafe.user as UserData)
        }
        setIsLoaded(true)
    }, [])


    if (!isLoaded)
        return <div>Loading...</div>
    else if(user) {
        console.log(user)
        return (
            <div className="flex flex-col items-center">
                <div>{user?.id}</div>
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
        )
    }
}