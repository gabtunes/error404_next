"use client"

import { useState } from "react";
import Charts from "./charts";

const HeaderCharts = (props: { anos: number[], ano: number, limite: boolean, data: Array<object> }) => {
    const anos = props["anos"]
    const [ano, setAno] = useState(props["ano"])
    const limite = props["limite"]

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
            <div className={`${ano == anos[0] ? "flex" : "hidden"}`}>
                <Charts limite={limite} atual={true} />
            </div>
            {data.map((chart: any) => (
                <div key={chart["ano"]} className={`${chart["ano"] == ano ? "flex" : "hidden"}`}>
                    <Charts limite={true} atual={false} last_chart={chart["charts"]} />
                </div>
            ))}
        </div>
    )
}

export default HeaderCharts;