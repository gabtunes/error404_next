'use client'
import Banner from "@/components/banner";
import Link from "next/link";
import { useEffect, useState } from "react";

declare global {
  interface Window {
      Telegram:any;
  }
}

export default function Home() {
  const [data, setData] = useState("")
  const [isLoaded, setIsLoaded] = useState(false)  

  useEffect(() => {
    if(global?.window){
      console.log(window.Telegram.WebApp.initData)
      setData(window.Telegram.WebApp.initData)
    }
    setIsLoaded(true)
  }, [])

  if(!isLoaded)
    return <div>Loading...</div>
  else {
    return (
      <div className="flex flex-col items-center">
        {data != "" &&
          <div>{data}</div>
        }
        <div className="w-full md:w-[600px] grid grid-cols-2 gap-[5px] p-[5px]">
          <Link href="/charts"><Banner img="CHARTS 2024" /></Link>
          <Link href="/bolao"><Banner img="BOLÃO 2025" /></Link>
          <Link href="/"><Banner img="TOP ALBUNS 2024" /></Link>
        </div>
      </div>
    );
  }
  
}
