import { getAllMusica } from "@/infra/musica";
import Switcher from "./switcher";
import { TelegramProvider } from "@/lib/telegramProvider";
import { Suspense } from "react";

export const fetchCache = "force-no-store";
export const dynamic = "force-dynamic";

export default async function Page() {
    const data = await (await getAllMusica()).json();

    return (
        <TelegramProvider>
            <Suspense fallback={<div>Loading...</div>}>
                <Switcher data={data} />
            </Suspense>            
        </TelegramProvider>   
    )
}