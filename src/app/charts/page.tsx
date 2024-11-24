import { getAno } from "@/infra/charts";
import { redirect } from "next/navigation";

export default async function Page() {
    const res = await getAno();
    const ano = await res.json();

    redirect(`/charts/${ano[0].ano}`)
}