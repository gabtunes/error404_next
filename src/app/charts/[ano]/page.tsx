import { getChartComparison } from "@/infra/charts";
import { getCharts } from "@/infra/log";
import { getBubbling } from "@/infra/bubbling";
import Link from "next/link";
import Charts from "@/components/charts";
//import Filme from "@/components/filme";

export default async function Page({ params, }: { params: Promise<{ ano: string }> }) {
    const anos = [2024, 2023, 2022, 2021];
    const ano_uri = (await params).ano;
    const res = await getChartComparison(parseInt(ano_uri));
    const charts = await res.json();

    const ultimo = charts[0].limite;
    let penultimo: any = [];

    if (charts.length > 1) {
        penultimo = charts[1].chart;
    }

    const res2 = await getCharts(parseInt(ano_uri));
    const last_chart = await res2.json();

    const res3 = await getBubbling();
    const bubbling = await res3.json();
    console.log(bubbling)

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
            {(last_chart && charts && bubbling) &&
                <Charts atual={false} charts={charts} ultimo={ultimo} penultimo={penultimo} last_chart={last_chart} />
            }
        
        </div>
    )

}