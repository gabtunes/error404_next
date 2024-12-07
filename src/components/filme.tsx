"use client"

import { useState } from "react";

const Filme = (props: any) => {
    const [click, setClick] = useState(false)

    return (
    <div onClick={() => setClick(!click)} className={click ? "text-[#ff0000]" : "text-black"}>{props["filme"]}</div>
    )
}

export default Filme