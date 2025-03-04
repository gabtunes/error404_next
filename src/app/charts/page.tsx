import { getAno } from "@/infra/charts";
import { getCharts } from "@/infra/log";
import HeaderCharts from "@/app/charts/headercharts";

export default async function Page() {
        const ano_atual = await (await getAno()).json()        
        const ano: number = ano_atual[0].limite ? ano_atual[0].ano + 1 : ano_atual[0].ano 

        const arrayRange = (start: number, stop:number, step: number) =>
            Array.from(
            { length: (stop - start) / step + 1 },
            (value, index) => start + index * step
            );

        const anos = arrayRange(ano, 2021, -1)
        console.log(anos)

        const data: Array<object> = []

        for (let i = 1; i < anos.length; i++) {
            const res = await (await getCharts(anos[i])).json()

            data[i] = {
                ano: anos[i],
                charts: res
            }
        }

    return(
        <div className="flex flex-col items-center">
            <HeaderCharts anos={anos} ano={ano} limite={ano_atual[0].limite} data={data} />
        </div>
    )
}