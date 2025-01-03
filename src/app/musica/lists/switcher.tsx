"use client"

import { useState } from "react"
import { IMusica } from "@/models/Musica";

export default function Switcher(props: { data: Array<IMusica> }) {
    const [page, setPage] = useState("individuais")
    const [pageind, setPageInd] = useState("albums")
    const data = props["data"]

    return (
        <div className="flex flex-col items-center" >
            <div className="flex flex-row">
                <div className={`p-3 text-center w-[120px] ${page == "albums" ? "text-[var(--tg-theme-button-text-color)] bg-[var(--tg-theme-button-color)]" : "text-[var(--tg-theme-text-color)] bg-[var(--tg-theme-bg-color)]"}`} onClick={() => { setPage("albums") }}>Top Álbuns</div>
                <div className={`p-3 text-center w-[120px] ${page == "musicas" ? "text-[var(--tg-theme-button-text-color)] bg-[var(--tg-theme-button-color)]" : "text-[var(--tg-theme-text-color)] bg-[var(--tg-theme-bg-color)]"}`} onClick={() => { setPage("musicas") }}>Top Músicas</div>
                <div className={`p-3 text-center w-[120px] ${page == "individuais" ? "text-[var(--tg-theme-button-text-color)] bg-[var(--tg-theme-button-color)]" : "text-[var(--tg-theme-text-color)] bg-[var(--tg-theme-bg-color)]"}`} onClick={() => { setPage("individuais") }}>Individuais</div>
            </div>
            <div className={`${page == "albums" ? "" : "hidden"}`}>
            </div>
            <div className={`${page == "musicas" ? "" : "hidden"}`}>
            </div>            
            <div className={`${page == "individuais" ? "flex flex-col items-center" : "hidden"}`}>
                <div className="flex flex-row">
                    <div className={`p-3 text-center w-[120px] ${pageind == "albums" ? "text-[var(--tg-theme-button-text-color)] bg-[var(--tg-theme-button-color)]" : "text-[var(--tg-theme-text-color)] bg-[var(--tg-theme-bg-color)]"}`} onClick={() => { setPageInd("albums") }}>Álbuns</div>
                    <div className={`p-3 text-center w-[120px] ${pageind == "musicas" ? "text-[var(--tg-theme-button-text-color)] bg-[var(--tg-theme-button-color)]" : "text-[var(--tg-theme-text-color)] bg-[var(--tg-theme-bg-color)]"}`} onClick={() => { setPageInd("musicas") }}>Músicas</div>
                </div>
                <div className="flex flex-col items-start px-5">
                {
                    data.map((lista: any, index: number) => (
                        <div className={`my-5 ${pageind == "albums" ? (lista.albums.length == 0 ? "hidden" : "")  : (lista.tracks.length == 0 ? "hidden" : "")}`} key={index}>
                            <div className="text-lg font-bold">{lista.membro["nome"]}</div>
                            <div className={`${pageind == "albums" ? "" : "hidden"}`}>
                            {lista.albums.map((album: any, index: number) => (
                                <div className="text-base" key={index + lista.membro}>{index + 1}. {album["name"]} - {album["artistName"]}</div>
                            ))}
                            </div>
                            <div className={`${pageind == "musicas" ? "" : "hidden"}`}>
                            {lista.tracks.map((album: any, index: number) => (
                                <div className="text-base" key={index + lista.membro}>{index + 1}. {album["name"]} - {album["artistName"]}</div>
                            ))}
                            </div>
                        </div>
                    ))
                }
                </div>
            </div>
        </div>
    )
}