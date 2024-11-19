import { getLastChart } from "@/infra/charts";

export default async function YearCharts(ano: any) {
    const fetchCharts = async () => {
        const res = await getLastChart(ano);
        const charts = await res.json();
        return charts;
    }

    const charts = await fetchCharts();

    return (
        <div>
        {
        charts.map((log: any) => (
                    <div key={log._id}>
                        <h2>{log.ano}</h2>
                        <p>{log.updated_at}</p>
                    </div>
                ))
        }
    </div>
    )
}
