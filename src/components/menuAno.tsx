"use client"

import { useState } from "react";

const MenuAno = (props: any) => {

    const [ano, setAno] = useState(props["max"])

    return (
        <div>
            <div className={`${(ano == props["max"]) ? "text-[#ff0000]" : "text-black"}`} onClick={() => setAno(props["max"])}>{props["max"]}</div>
            <div className={`${(ano == props["max"] - 1) ? "text-[#ff0000]" : "text-black"}`} onClick={() => setAno(props["max"] - 1)}>{props["max"] - 1}</div>
            <div className={`${(ano == props["max"] - 2) ? "text-[#ff0000]" : "text-black"}`} onClick={() => setAno(props["max"] - 2)}>{props["max"] - 2}</div>
            <div className={`${(ano == props["max"] - 3) ? "text-[#ff0000]" : "text-black"}`} onClick={() => setAno(props["max"] - 3)}>{props["max"] - 3}</div>
        </div>
    );
};

export default MenuAno;