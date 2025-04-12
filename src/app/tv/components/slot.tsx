'use client'

import { useState } from "react"
import Evento from "./evento"

const Slot = (props: any) => {
    const [evento, setEvento] = useState(false)

    const handleClick = () => {
        setEvento(true)
    }

    const handleClose = () => {
        console.log("Foi")
        setEvento(false)
    }

    return (
        <div onClick={handleClick} className={`col-span-2 ${!evento ? "hover:bg-gray-100" : ""} h-[30px] flex justify-center cursor-pointer`} >
            {evento &&
                <Evento>
                    <div className="hover:bg-gray-100 rounded-full size-[20px] flex items-center justify-center cursor-pointer" onClick={handleClose}>
                        <div style={{fontSize:"15px"}} className="material-icons">close</div>
                    </div>
                </Evento>
            }
        </div>
    )
}

export default Slot