'use client'

import { addMusicafromMembro, updateMusicafromMembro } from "@/infra/musica";
import { IMusica } from "@/models/Musica";
import { createContext, useContext, useEffect, useState } from "react"
import { useTelegram } from "@/lib/telegramProvider";

interface SearchContextType {
    top: any[];
    setTop: React.Dispatch<React.SetStateAction<any[]>>;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

const useSearchContext = () => {
    const context = useContext(SearchContext);
    if (context === undefined) {
        throw new Error('context not found');
    }
    return context;
};

export default function TopTracks(props: { tracks_db: Array<IMusica> }) {
    const { user } = useTelegram();

    const membro: number | undefined = user?.id
    const filtro = props["tracks_db"].filter((registro: any) => registro["membro"] == membro)

    const [top_db, setTopDB] = useState<object[]>([])
    const [top, setTop] = useState<object[]>([])

    useEffect(() => {
        if (user) {
            if (filtro.length > 0) {
                setTopDB(filtro[0].tracks)
                setTop(filtro[0].tracks)
            }
        }
    }, [user])

    const [tracks, setTracks] = useState([])
    const [showList, setShowList] = useState(false)

    /* eslint-disable */
    const LastFM = require('last-fm')
    /* eslint-disable */
    const lastfm = new LastFM('33d9baf9f1c9f421722426045e2075a0')

    const handleChange = (e: any) => {
        if (e.target.value.length > 0) {
            lastfm.trackSearch({ q: e.target.value }, (err: any, data: any) => {
                if (err) {
                    console.error(err)
                } else {
                    setTracks(data["result"])
                    console.log(data["result"])
                }
            })
        } else {
            setTracks([])
        }
    }

    const handleSave = async () => {
        if (top_db != top && membro) {
            if (filtro.length == 0) {
                await addMusicafromMembro(membro, 2024, [], top)
            } else {
                await updateMusicafromMembro(membro, 2024, { tracks: top })
            }
            setTopDB(top)
        }
    }

    return (
        <>
            {
                (user) ?
                    (<div className="flex flex-col items-center justify-center gap-5 mt-5" >
                        <input placeholder="Música, artista..." className="border-black border-2 p-2 w-4/5 md:w-[250px] lg:w=[300px] h-[40px]" onChange={handleChange}></input>
                        <div className="flex flex-col items-center w-[300px] gap-3">
                            {tracks &&
                                tracks.map((track: any) => (
                                    (track.images.length != 0) &&
                                    <SearchContext.Provider value={{ top, setTop }} key={track.artistName + "_" + track.name} >
                                        <ResultTrack track={track} />
                                    </SearchContext.Provider>
                                ))
                            }
                        </div>


                        <div className={`h-full w-[250px] bg-[var(--tg-theme-secondary-bg-color)] drop-shadow-xl ${showList ? "right-0" : "-right-[250px]"} duration-[800ms] top-0 fixed flex flex-col items-center`}>
                            <button onClick={handleSave} className={`z-0 absolute -left-18 bg-[var(--tg-theme-button-color)] text-[var(--tg-theme-button-text-color)] text-center ${showList ? (JSON.stringify(top_db) == JSON.stringify(top) ? "bottom-5" : "bottom-20") : "bottom-5 "} duration-[400ms] flex items-center justify-center rounded-full drop-shadow-sm size-[50px]`}>
                                <span className="material-icons">
                                    {
                                        JSON.stringify(top_db) == JSON.stringify(top) ?
                                            "check" :
                                            "save"
                                    }
                                </span>
                            </button>
                            <button className={`z-10 absolute bottom-5 -left-18 bg-[var(--tg-theme-button-color)] text-[var(--tg-theme-button-text-color)] text-center flex items-center justify-center rounded-full drop-shadow-sm size-[50px]`} onClick={() => {
                                setShowList(!showList)
                            }}>
                                <span className="material-icons">
                                    {
                                        showList
                                            ?
                                            "chevron_right"
                                            :
                                            "leaderboard"
                                    }
                                </span>
                            </button>
                            <div className={`p-5 h-full w-full overflow-y-scroll overflow-x-clip no-scrollbar flex flex-col gap-5 items-center`}>
                                {
                                    top.map((track: any, index: any) => (
                                        <div className="flex flex-row items-center gap-2" key={index}>
                                            <span className="leading-none funnel-sans text-[50px] w-70px text-[var(--tg-theme-text-color)]">{index + 1}</span>
                                            
                                            <div className="h-[70px] w-[120px] flex flex-col justify-center items-end">
                                                <p className={`text-sm text-[var(--tg-theme-text-color)]`}>{track.name}</p>
                                                <p className={`text-sm text-[var(--tg-theme-subtitle-text-color)]`}>{track.artistName}</p>
                                            </div>

                                            <div className="grid grid-rows-3">
                                                {(index != 0) &&
                                                    <button className="row-start-1 material-icons" onClick={() => {
                                                        const currentTop = [...top]
                                                        const anterior = currentTop[index - 1]
                                                        currentTop[index - 1] = currentTop[index]
                                                        currentTop[index] = anterior
                                                        setTop(currentTop)
                                                        //checkSave()
                                                    }}>keyboard_arrow_up</button>
                                                }
                                                <button className="row-start-2 material-icons" onClick={() => {
                                                    const currentTop = [...top]
                                                    currentTop.splice(index, 1)
                                                    setTop(currentTop)
                                                    //checkSave()
                                                }}>delete</button>

                                                {(index != top.length - 1) &&
                                                    <button className="row-start-3 material-icons" onClick={() => {
                                                        const currentTop = [...top]
                                                        const posterior = currentTop[index + 1]
                                                        currentTop[index + 1] = currentTop[index]
                                                        currentTop[index] = posterior
                                                        setTop(currentTop)
                                                        //checkSave()
                                                    }}>keyboard_arrow_down</button>
                                                }
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>) :
                    (<div></div>)
            }
        </>
    )
}

function ResultTrack(props: any) {
    const { top, setTop } = useSearchContext();

    return (
        <div id={props["track"].artistName + "_" + props["track"].name}
            className={`bg-[var(--tg-theme-secondary-bg-color)] p-3 w-full h-[100px] grid grid-cols-5 items-center justify-start`}>
            <div className="flex flex-col items-start col-span-4">
                <p className={`text-sm text-[var(--tg-theme-text-color)]`}>{props["track"].name}</p>
                <p className={`text-sm text-[var(--tg-theme-subtitle-text-color)]`}>{props["track"].artistName}</p>
            </div>
            {(top.length < 10) &&
                <button className="material-icons size-[30px] rounded-full text-white bg-green-400 mt-3 justify-self-center" onClick={() => {
                    if (!JSON.stringify(top).includes(JSON.stringify(props["track"]))) {
                        setTop([...top, props["track"]])
                    }
                }}>
                    {JSON.stringify(top).includes(JSON.stringify(props["track"])) ?
                        "check" :
                        "add"
                    }</button>
            }
        </div>
    );
}