import { getAllMusica } from "@/infra/musica";
import Switcher from "./switcher";
import { TelegramProvider } from "@/lib/telegramProvider";


export default async function Page() {
    const data = await (await getAllMusica()).json();

    return (
        <TelegramProvider>
            <Switcher data={data} />
        </TelegramProvider>   
    )
}
