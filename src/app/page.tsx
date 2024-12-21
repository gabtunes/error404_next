'use client'

import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";

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

export default function Home() {
  const [data, setData] = useState<UserData | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (global?.window) {
      setData(window.Telegram.WebApp.initDataUnsafe.user as UserData)
    }
    setIsLoaded(true)
  }, [])

  if (!isLoaded)
    return <div>Loading...</div>
  else {
    return (
      <div className="p-5 flex flex-col items-center">
        {data &&
          <div>Olá, {data.first_name}</div>
        }
        <div className="w-full md:w-[600px] grid grid-cols-2 gap-3 p-[5px]">
          <Link className="flex flex-col items-center" href="/charts">
            <Image alt="Charts" src="/img/charts.svg" width={100} height={100}></Image>
            <span>Charts</span>
          </Link>
          <Link className="flex flex-col items-center" href="/bolao">
            <Image alt="Bolão" src="/img/bolao.svg" width={100} height={100}></Image>
            <span>Bolão</span>
          </Link>
          {data &&
            <Link className="flex flex-col items-center" href="/musica">
              <Image alt="Música" src="/img/music.svg" width={100} height={100}></Image>
              <span>Música</span>
            </Link>
          }

        </div>
      </div>
    );
  }

}
