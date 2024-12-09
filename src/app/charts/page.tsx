import { getAno, getChartComparison } from "@/infra/charts";
import { getBubbling } from "@/infra/bubbling";
import { getCharts } from "@/infra/log";
import HeaderCharts from "@/components/headercharts";

export default async function Page() {
        const anos = [2024, 2023, 2022, 2021]
        const ano_atual = await (await getAno()).json()
        const ano: number = (ano_atual[0].ano)

        const bubbling = (await (await getBubbling()).json());  

        const data: Array<object> = []

        for (let i = 0; i < anos.length; i++) {
            const chartscomp = await (await getChartComparison(anos[i])).json()
            const res = await (await getCharts(anos[i])).json()

            const ultimo = chartscomp[0].limite;

            let penultimo = [];

            if (chartscomp.length > 1) {
                penultimo = chartscomp[1].chart;
            }

            data[i] = {
                ano: anos[i],
                ultimo: ultimo,
                penultimo: penultimo,
                charts: res
            }
        }

    return(
        <div className="flex flex-col items-center">
            <HeaderCharts ano={ano} bubbling={bubbling} data={data} />
        </div>
    )
}