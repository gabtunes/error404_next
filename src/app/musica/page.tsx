import Switcher from "./switcher";

declare global {
    interface Window {
        Telegram: any;
    }
}
interface UserData {
    id: number;
    first_name: string;
    last_name?: string;
    username?: string;
    language_code: string;
    is_premium?: boolean
}

export default function Page() {
    let data: UserData = {id: 0, first_name: "Nenhum", language_code:"pt-br"}
    if (global?.window) {
        data = window.Telegram.WebApp.initDataUnsafe.user as UserData
        console.log(data)
    }
    return <Switcher data={data.id}/>
}
