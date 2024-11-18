import { getAllCharts } from "../../infra/charts";

export default async function Page() {
    const fetchCharts = async () => {
        const res = await getAllCharts();
        const charts = await res.json();
        return charts;
    }

    const charts = await fetchCharts();

        return (
            <div>
                <h1>Charts</h1>
                {
            charts.map((chart: any) => (
                        <div key={chart._id}>
                            <h2>{chart.updated_at}</h2>
                            <p>{chart.ano}</p>
                            <h2>{chart.limite}</h2>
                        </div>
                    ))
                }
            </div>
        )
}