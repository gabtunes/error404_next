import { getChartComparison } from "@/infra/charts";
import { getCharts } from "@/infra/log";
//import { getLastCharts } from "@/infra/lastchart";
import { getBubbling } from "@/infra/bubbling";
import Link from "next/link";
import Charts from "@/components/charts";
//import Filme from "@/components/filme";
import { Suspense } from "react";

export default async function Page({ params, }: { params: Promise<{ ano: string }> }) {
    const anos = [2024, 2023, 2022, 2021];
    const ano_uri = (await params).ano;

    const charts = await (await getChartComparison(parseInt(ano_uri))).json();

    const ultimo = charts[0].limite;
    let penultimo: any = [];

    if (charts.length > 1) {
        penultimo = charts[1].chart;
    }

    const last_chart = await (await getCharts(parseInt(ano_uri))).json();
    const bubbling = await (await getBubbling()).json();

    return (
        <div className="flex flex-col items-center">
            <div className="flex flex-row">
                {
                    anos.map((ano: any) => (
                        <div key={ano} className={`${(ano_uri == ano) ?
                            "dark:bg-[#ededed] bg-[#171717] dark:text-[#0a0a0a] text-[#ffffff]" :
                            "dark:bg-[#0a0a0a] bg-[#ffffff] dark:text-[#ededed] text-[#171717]"} p-[15px]`}>
                            <Link href={`${ano}`}>{ano}</Link>
                        </div>
                    ))
                }
            </div>
            <Suspense fallback={<Loading />}>
                <Charts atual={(ano_uri == "2024") ? true : false} ultimo={ultimo} penultimo={penultimo} last_chart={last_chart} bubbling={bubbling} />
            </Suspense>
        
        </div>
    )

}

function Loading(){
    return (
        <div className="flex items-center justify-center mt-[25%] w-full">
            <span>Tá carregando, amores</span>
        </div>
    );
}