"use client"

import { useState } from "react";

const Filme = ({filme}) => {
    const [click, setClick] = useState(false)

    return (
    <div onClick={() => setClick(!click)} className={click ? "text-[#ff0000]" : "text-black"}>{filme}</div>
    )
}

export default Filme