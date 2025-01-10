'use client'

import { addMusicafromMembro, updateMusicafromMembro } from "@/infra/musica";
import { IMusica } from "@/models/Musica";
import { createContext, useContext, useEffect, useState } from "react"
import useSWR from "swr";
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

const fetcher = (url: any) => fetch(url).then((res) => res.json());
const fetcher2 = (url: any) => fetch(url).then((res) => res.json());

export default function TopAlbums(props: { albums_db: Array<IMusica> }) {
    const { user } = useTelegram();

    const membro: number | undefined = user?.id
    const [ano, setAno] = useState(new Date().getFullYear())
    const filtro = props["albums_db"].filter((registro: any) => registro["membro"]["id_telegram"] == membro && registro["ano"] == ano)

    const [top_db, setTopDB] = useState<object[]>([])
    const [top, setTop] = useState<object[]>([])

    useEffect(() => {
        if (user) {
            if (filtro.length > 0) {
                setTopDB(filtro[0].albums)
                setTop(filtro[0].albums)
            }
        }
    }, [user])

    const [albums, setAlbums] = useState([])
    const [showList, setShowList] = useState(false)
    const [termo, setTermo] = useState("")

    const { data } = useSWR("https://musicbrainz.org/ws/2/release-group/?query=" + termo +
        "%20AND%20firstreleasedate:" + ano +
        "%20AND%20primarytype:EP%20OR%20Album" +
        "&fmt=json", fetcher)

    const handleChange = async (e: any) => {
        if (e.target.value.length > 0) {
            setTermo(e.target.value)
            setAno(new Date().getFullYear())
            if (data)
                setAlbums(data["release-groups"])
        } else {
            setAlbums([])
        }
    }

    const handleSave = async () => {
        const agora = new Date()
        const options = { timeZone: 'America/Sao_Paulo' };
        const agoraBrasil = agora.toLocaleString('pt-BR', options);

        if (top_db != top && membro && (agoraBrasil < "30/12/" + agora.getFullYear() + ", 23:30:00")) {
            if (filtro.length == 0) {
                await addMusicafromMembro(membro, agora.getFullYear(), top, [])
            } else {
                await updateMusicafromMembro(membro, agora.getFullYear(), { albums: top })
            }
            setTopDB(top)
        }
    }

    return (
        <>
            {
                (user) ?
                    (
                        <div className="flex flex-col items-center justify-center gap-5 mt-5" >
                            <input placeholder="Álbum, artista..." className="border-black border-2 p-2 w-4/5 md:w-[250px] lg:w=[300px] h-[40px]" onChange={handleChange}></input>
                            <div className="justify-center gap-2 grid grid-cols-2 md:grid-cols-3 place-content-center">
                                {albums &&
                                    albums.map((album: any) => (
                                        <SearchContext.Provider value={{ top, setTop }} key={album.id} >
                                            <ResultAlbum album={album} />
                                        </SearchContext.Provider>
                                    ))
                                }
                            </div>


                            <div className={`h-full w-[150px] bg-[var(--tg-theme-secondary-bg-color)] drop-shadow-xl ${showList ? "right-0" : "-right-[150px]"} duration-[800ms] top-0 fixed flex flex-col items-center`}>
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
                                        top.map((album: any, index: any) => (
                                            <div className="flex flex-col gap-2" key={index}>
                                                <div className="relative size-[100px] flex items-end">
                                                    <span style={{ textShadow: '#000 1px 0 10px' }} className="leading-none z-10 absolute funnel-sans text-[65px] text-white">{index + 1}</span>
                                                    <img className="z-0 absolute size-[100px]" src={album.imagem}></img>
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
                        </div>) : (<div></div>)
            }
        </>
    )
}

function ResultAlbum(props: any) {
    const { top, setTop } = useSearchContext();
    const [rotate, setRotate] = useState(false)

    const { data, isLoading } = useSWR("https://coverartarchive.org/release-group/" + props["album"].id, fetcher2)

    

    if (isLoading)
        return (
            <div id={props["album"].id}
                className="group bg-transparent size-[150px] md:size-[200px] perspective-normal"
                onClick={() => { setRotate(!rotate) }}>
                <div className={`relative w-full h-full text-center transform-3d duration-[800ms] ${rotate ? "rotate-y-180" : ""}`}>
                    <div className="absolute w-full h-full backface-hidden">
                        Carregando...
                    </div>
                    <div className={`bg-[var(--tg-theme-secondary-bg-color)] p-2 absolute w-full h-full backface-hidden rotate-y-180 flex flex-col items-center justify-center`}>
                        <p className={`text-sm text-[var(--tg-theme-text-color)]`}>{props["album"].title}</p>
                        <p className={`text-sm text-[var(--tg-theme-subtitle-text-color)]`}>{props["album"]["artist-credit"][0].name}</p>
                        {(top.length < 10) &&
                            <button className="material-icons size-[30px] rounded-full text-white bg-green-400 mt-3" onClick={() => {
                                if (!JSON.stringify(top).includes(JSON.stringify(props["album"]))) {
                                    setTop([...top, props["album"]])
                                }
                            }}>
                                {JSON.stringify(top).includes(JSON.stringify(props["album"])) ?
                                    "check" :
                                    "add"
                                }</button>
                        }
                    </div>
                </div>
            </div>
        )
    else if(data){    

        const album = {
            "id": props["album"].id,
            "titulo": props["album"].title,
            "artista": props["album"]["artist-credit"][0].name,
            "imagem": data.images[0].thumbnails.small
        } 

        return (
            <>
                {data &&
                    <div id={props["album"].id}
                        className="group bg-transparent size-[150px] md:size-[200px] perspective-normal"
                        onClick={() => { setRotate(!rotate) }}>
                        <div className={`relative w-full h-full text-center transform-3d duration-[800ms] ${rotate ? "rotate-y-180" : ""}`}>
                            <div className="absolute w-full h-full backface-hidden">
                                <img width="200px" src={data.images[0].thumbnails.small}></img>
                            </div>
                            <div className={`bg-[var(--tg-theme-secondary-bg-color)] p-2 absolute w-full h-full backface-hidden rotate-y-180 flex flex-col items-center justify-center`}>
                                <p className={`text-sm text-[var(--tg-theme-text-color)]`}>{props["album"].title}</p>
                                <p className={`text-sm text-[var(--tg-theme-subtitle-text-color)]`}>{props["album"]["artist-credit"][0].name}</p>
                                {(top.length < 10) &&
                                    <button className="material-icons size-[30px] rounded-full text-white bg-green-400 mt-3" onClick={() => {
                                        if (!JSON.stringify(top).includes(JSON.stringify(album))) {
                                            setTop([...top, album])
                                        }
                                    }}>
                                        {JSON.stringify(top).includes(JSON.stringify(album)) ?
                                            "check" :
                                            "add"
                                        }</button>
                                }
                            </div>
                        </div>
                    </div>
                }
            </>
        )
    }
}