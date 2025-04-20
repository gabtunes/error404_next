'use client'

import { useEffect, useState } from "react"
import Evento from "./evento"

interface Slot {
    date: Date
  }
  
  interface Evento {
    start: Date,
    duration: number
  }

const Slot = (props: any) => {

    const [evento, setEvento] = useState<Evento[]>([])

    useEffect(() => {
        setEvento(props["eventos"])
        
        if(props["eventos"].length > 0)
            console.log(props["eventos"])

    }, [props])

    return (
        <div className={`z-0 hover:bg-gray-100 h-full flex justify-center cursor-pointer`} >
            {evento?.map(evento => (
                <Evento key={evento.start} start={evento.start.getMinutes()} duration={evento.duration}>
                    <div className="hover:bg-gray-100 rounded-full size-[20px] flex items-center justify-center cursor-pointer">
                        <div style={{ fontSize: "15px" }} className="material-icons">close</div>
                    </div>
                </Evento>
            ))
            }
        </div>
    )
}

export default Slot