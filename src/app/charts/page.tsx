import { getAnos, getLastChart } from "../../infra/charts";

export default async function Page() {
    const fetchAnos = async () => {
        const res = await getAnos();
        const anos = await res.json();
        anos.sort(function (a: any, b: any) { return b - a });
        return anos;
    }

    const anos = await fetchAnos();

    return (
        <div>
            <h1>Charts</h1>
            {
                anos.map((ano: number) => (
                    <div key={ano}>
                        <p>{ano}</p>
                    </div>
                ))
            }
        </div>
    )
}