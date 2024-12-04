import Banner from "@/components/banner";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Link href="/charts"><Banner img="CHARTS 2024" /></Link>
      <Link href=""><Banner img="TOP ALBUNS 2024 (EM BREVE)" /></Link>
    </div>
  );
}
