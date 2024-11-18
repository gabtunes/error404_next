export default async function Page() {
    const fetchLogs = async () => {
        const res = await fetch("/api/logs");
        const logs = await res.json();
        return logs;
    }

    const logs = await fetchLogs();

    return (
        <div>
            <h1>Logs</h1>
            {
                logs.map((log: any) => (
                    <div key={log._id}>
                        <h2>{log.membro}</h2>
                        <p>{log.tmdb}</p>
                        <h2>{log.nota}</h2>
                        <h2>{log.data}</h2>
                    </div>
                ))
            }
        </div>
    )
}