import { getLastChart } from "../../infra/charts";

export default async function Page() {
    const fetchLogs = async () => {
        const res = await getLastChart(2024);
        const logs = await res.json();
        return logs;
    }

    const logs = await fetchLogs();

    return (
        <div>
            {
                logs.map((log: any) => (
                    <div key={log._id}>
                        <h2>{log.ano}</h2>
                        <p>{log.updated_at}</p>
                    </div>
                ))
            }
        </div>
    )
}