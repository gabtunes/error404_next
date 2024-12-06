"use client"

import { useState } from "react";

const Filme = ({filme}) => {
    const [click, setClick] = useState(false)

    return (
        <div onClick={() => setClick(!click)} className="">{filme}</div>
    )
}

export default Filme