import Link from "next/link";
import { TelegramProvider } from "@/lib/telegramProvider";
import Logs from "@/components/logs";
import Header from "@/components/header";

export default async function Home() {

  const checkIsDarkSchemePreferred = () => window?.matchMedia?.('(prefers-color-scheme:dark)')?.matches ?? false;
  

  return (
    <TelegramProvider>
      <div className="p-2 flex flex-col items-center w-full md:w-[600px]">
        <Header />  
        <div className="flex flex-row flex-wrap justify-between gap-6 p-4">
          <Link className="flex flex-col items-center w-[120px]" href="/charts">
              <img className="block dark:hidden h-[32px]" src="/img/logos/light/charts.png"/>
              <img className="hidden dark:block h-[32px]" src="/img/logos/dark/charts.png"/>            
          </Link>
          <Link className="flex flex-col items-center w-[120px]" href="/bolao">
          <img className="block dark:hidden h-[32px]" src="/img/logos/light/bolao.png"/>
          <img className="hidden dark:block h-[32px]" src="/img/logos/dark/bolao.png"/>  
          </Link>
          <Link className="flex flex-col items-center w-[120px]" href="/musica">
          <img className="block dark:hidden h-[32px]" src="/img/logos/light/musica.png"/>
          <img className="hidden dark:block h-[32px]" src="/img/logos/dark/musica.png"/>  
          </Link>          
          <Link className="flex flex-col items-center w-[120px]" href="/tv">
          <img className="block dark:hidden h-[32px]" src="/img/logos/light/tv.png"/>
          <img className="hidden dark:block h-[32px]" src="/img/logos/dark/tv.png"/>  
          </Link>
        </div>
          <Logs />
      </div>     
    </TelegramProvider>
  );
}
