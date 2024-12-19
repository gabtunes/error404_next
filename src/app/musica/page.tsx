import { getAllMusica } from "@/infra/musica";
import Switcher from "./switcher";
import { Suspense } from "react";

export default async function Page() {
    const data = await (await getAllMusica()).json();

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Switcher data={data} />
        </Suspense>        
    )
}
