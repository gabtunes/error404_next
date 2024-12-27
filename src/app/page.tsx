import Link from "next/link";
import { TelegramProvider } from "@/lib/telegramProvider";
import Logs from "@/components/logs";
import Header from "@/components/header";
import Botao from "@/components/botao";

export default async function Home() {
  return (
    <TelegramProvider>
      <div className="p-2 flex flex-col items-center w-full md:w-[600px]">
        <Header />  
        <div className="flex flex-row flex-wrap justify-between gap-3 p-3">
          <Link className="flex flex-col items-center" href="/charts">
            <Botao titulo="Charts"/>
          </Link>
          <Link className="flex flex-col items-center" href="/bolao">
          <Botao titulo="Bolão"/>
          </Link>
          <Link className="flex flex-col items-center" href="/musica">
          <Botao titulo="Música"/>
          </Link>
          <Link className="flex flex-col items-center" href="/">
          <Botao titulo="Wrapped"/>
          </Link>
        </div>
        <Logs />
      </div>     
    </TelegramProvider>
  );
}
