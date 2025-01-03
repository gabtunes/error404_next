import Botao from "@/components/botao";
import Link from "next/link";

export default async function Page() {
    return (
     <div className="flex flex-row flex-wrap justify-between gap-3 p-3">
        <Link href="/musica/lists">
            <Botao titulo="Listas" />
        </Link>
        <Link href="/musica/createList">
            <Botao titulo={"Meu " + new Date().getFullYear()} />
        </Link>
     </div>   
    )
}