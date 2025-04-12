import Link from "next/link";

export default async function Page() {
    return (
     <div className="flex flex-row flex-wrap justify-between gap-3 p-3">
        <Link href="/musica/lists">
            <div>Listas</div>
        </Link>
        <Link href="/musica/createList">
            <div>{"Meu " + new Date().getFullYear()}</div>
        </Link>
     </div>   
    )
}