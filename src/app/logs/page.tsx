"use client"

import useSWR from "swr";

const fetcher = (url: string) =>
    fetch(url)
        .then((res) => res.json());

export default function Page() {
    const {
        data: logs,
        error,
        isLoading,
    } = useSWR('/api/logs/', fetcher);

    if (error) return <p>Falhou</p>;
    if (isLoading) return <p>Carregando...</p>;
    if (!logs) return null;
    if (logs) {
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
}