"use client"

import { useState } from "react";
import YearCharts from "@/components/YearCharts";

export default function Page() {
    const [ano, setAno]: [number, any] = useState(new Date().getFullYear());

    const anos = [2024, 2023, 2022, 2021];

    function handleSelectChange(event: any): void {
        setAno(event.target.value)
    }

    return (
        <div>
            <h1>Charts</h1>
            <select onChange={handleSelectChange}>
                {
                    anos.map((ano: number) => (
                        <option key={ano} value={ano}>{ano}</option>
                    ))
                }
            </select>
            <YearCharts ano={ano}/>
        </div>
    )
}