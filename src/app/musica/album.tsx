'use client'

import { addMusicafromMembro, updateMusicafromMembro } from "@/infra/musica";
import { IMusica } from "@/models/Musica";
import { createContext, useContext, useState } from "react"

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

export default function TopAlbums(props: {albums_db: Array<IMusica>}) {
    const top_db: Array<object> = props["albums_db"][0].albums
    const membro: number = props["albums_db"][0].membro
    const [albums, setAlbums] = useState([])
    const [top, setTop] = useState<any[]>(top_db)
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

    const handleSave = async() => {
        if(top_db != top) {
            if(props["albums_db"].length == 0){
                await addMusicafromMembro(membro, 2024, top, [])
            } else {
                await updateMusicafromMembro(membro, 2024, {albums: top})
            }
        }
    }

    return (
        <div className="flex flex-col items-center justify-center gap-5 mt-5" >
            <input placeholder="Álbum, artista..." className="border-black border-2 p-2 w-4/5 md:w-[250px] lg:w=[300px] h-[40px]" onChange={handleChange}></input>
            <div className="justify-center gap-2 grid grid-cols-2 md:grid-cols-3 place-content-center">
                {albums &&
                    albums.map((album: any) => (
                        (album.images.length != 0) &&
                        <SearchContext.Provider value={{top, setTop}}  key={album.artistName + "_" + album.name} >
                            <ResultAlbum album={album}/>
                        </SearchContext.Provider>
                    ))
                }
            </div>


            <div className={`p-5 h-full w-[150px] bg-white drop-shadow-xl ${showList ? "right-0" : "-right-[150px]"} duration-[800ms] top-0 fixed flex flex-col gap-5 items-center`}>
                <button onClick={handleSave} className={`z-0 absolute -left-18 bg-white text-center ${showList ? "bottom-20" : "bottom-5 "} duration-[400ms] flex items-center justify-center rounded-full drop-shadow-sm size-[50px]`}>
                    <span className="material-icons">
                    {
                        JSON.stringify(top_db) == JSON.stringify(top) ?
                        "check" :
                        "save"
                    }
                    </span>
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
                                        //checkSave()
                                    }}>keyboard_arrow_up</button>
                                }
                                <button className="col-start-2 material-icons" onClick={() => {
                                    const currentTop = [...top]
                                    currentTop.splice(index, 1)
                                    setTop(currentTop)
                                    //checkSave()
                                }}>delete</button>

                                {(index != top.length - 1) &&
                                    <button className="col-start-3 material-icons" onClick={() => {
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
    )
}

function ResultAlbum(props: any){
    const {top, setTop} = useSearchContext();
    const [rotate, setRotate] = useState(false)

  return (
    <div id={props["album"].artistName + "_" + props["album"].name}
        className="group bg-transparent size-[150px] md:size-[200px] perspective-normal"
        onClick={() => {setRotate(!rotate)}}>
    <div className={`relative w-full h-full text-center transform-3d duration-[800ms] ${rotate ? "rotate-y-180": ""}`}>
        <div className="absolute w-full h-full backface-hidden">
            <img width="200px" src={props["album"].images[2]}></img>
        </div>
        <div className="bg-gray-100 p-2 absolute w-full h-full backface-hidden rotate-y-180 flex flex-col items-center justify-center">
            <p className="text-sm">{props["album"].name}</p>
            <p className="text-sm text-gray-700">{props["album"].artistName}</p>
            {(top.length < 10) &&
                <button className="material-icons size-[30px] rounded-full text-white bg-green-400 mt-3" onClick={() => {
                    if(!JSON.stringify(top).includes(JSON.stringify(props["album"]))){
                        setTop([...top, props["album"]])
                    }                    
                }}>
                    {JSON.stringify(top).includes(JSON.stringify(props["album"]))?
                    "check":
                    "add"
                    }</button>
            }
        </div>
    </div>
</div>
  );
}