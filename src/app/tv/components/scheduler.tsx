'use client'

import { useState } from "react"
import Evento from "./evento"

const Scheduler = (props: any) => {
    const id = props["id"]

    const handleClick = () => {
    
    }

    const handleClose = () => {
    }

    return (
        <div className={`fixed z-10 shadow=md bottom-0 w-full h-[100px] flex justify-center`} >
            {props.children}
        </div>
    )
}

export default Scheduler