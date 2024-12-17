import Banner from "@/components/banner";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <div className="w-full md:w-[600px] grid grid-cols-2 gap-[5px] p-[5px]">
        <Link href="/charts"><Banner img="CHARTS 2024" /></Link>
        <Link href="/bolao"><Banner img="BOLÃO 2025" /></Link>
        <Link href="/"><Banner img="TOP ALBUNS 2024" /></Link>
      </div>
    </div>
  );
}
