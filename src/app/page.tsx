'use client'
import Banner from "@/components/banner";
import Link from "next/link";
import { useEffect, useState } from "react";

declare global {
  interface Window {
      Telegram:any;
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
    if(global?.window){
      setData(window.Telegram.WebApp.initDataUnsafe.user as UserData)
    }
    setIsLoaded(true)
  }, [])

  if(!isLoaded)
    return <div>Loading...</div>
  else {
    return (
      <div className="flex flex-col items-center">
        {data &&
          <div>Olá, {data.first_name}</div>
        }
        <div className="w-full md:w-[600px] grid grid-cols-2 gap-[5px] p-[5px]">
          <Link href="/charts"><Banner img="CHARTS 2024" /></Link>
          <Link href="/bolao"><Banner img="BOLÃO 2025" /></Link>
          {data &&
            <Link href="/musica"><Banner img="MÚSICA 2024" /></Link>
          }
        </div>
      </div>
    );
  }
  
}
