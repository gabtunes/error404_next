"use client"

import { Suspense, useState } from "react";
import Charts from "./charts";

const HeaderCharts = (props: { ano: number, bubbling: Array<Object>, data: Array<Object> }) => {
    const anos = [2024, 2023, 2022, 2021];
    const [ano, setAno] = useState(props["ano"])

    const data = props["data"]

    return (
        <div className="flex flex-col items-center">
            <div className="flex flex-row">
                {
                    anos.map((ano_array: any) => (
                        <div onClick={() => setAno(ano_array)} key={ano_array} className={`${(ano_array == ano) ?
                            "dark:bg-[#ededed] bg-[#171717] dark:text-[#0a0a0a] text-[#ffffff]" :
                            "dark:bg-[#0a0a0a] bg-[#ffffff] dark:text-[#ededed] text-[#171717]"} p-[15px] cursor-pointer`}>
                            {ano_array}
                        </div>
                    ))
                }
            </div>
            {data.map((chart: any) => (
                <div key={chart["ano"]} className={`${chart["ano"] == ano ? "flex" : "hidden"}`}>
                    <Charts atual={(chart["ano"] == props["ano"]) ? true : false}
                            bubbling={props["bubbling"]}
                            ultimo={chart["ultimo"]}
                            penultimo={chart["penultimo"]}
                            last_chart={chart["charts"]} />
                </div>
            ))}
        </div>
    )
}

export default HeaderCharts;