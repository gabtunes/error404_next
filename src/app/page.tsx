import Link from "next/link";
import Image from "next/image";
import { TelegramProvider, useTelegram } from "@/lib/telegramProvider";
import Logs from "@/components/logs";
import { getLogs } from "@/infra/log";
import Header from "@/components/header";

export default async function Home() {
  const data = await (await getLogs()).json();

  return (
    <TelegramProvider>
      <div className="p-5 flex flex-col items-center">
        <Header />
        <div className="w-full md:w-[600px] grid grid-cols-2 gap-3 p-[5px]">
          <Link className="flex flex-col items-center" href="/charts">
            <Image alt="Charts" src="/img/charts.svg" width={100} height={100}></Image>
            <span>Charts</span>
          </Link>
          <Link className="flex flex-col items-center" href="/bolao">
            <Image alt="Bolão" src="/img/bolao.svg" width={100} height={100}></Image>
            <span>Bolão</span>
          </Link>
            <Link className="flex flex-col items-center" href="/musica">
              <Image alt="Música" src="/img/music.svg" width={100} height={100}></Image>
              <span>Música</span>
            </Link>
        </div>
        <Logs data={data}/>
      </div>
    </TelegramProvider>
  );
}
