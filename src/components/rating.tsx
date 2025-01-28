'use client'
import { POST } from "@/infra/log";
import { useState } from "react"
import { useRouter } from "next/navigation";


const Rating = (props: any) => {
    const show = props["show"];
    const [nota, setNota] = useState(props["nota"]);
    const membro = props["membro"];
    const tmdb = props["tmdb"];
    const router = useRouter();

    const handleChange = (e: any) => {
        console.log(e.target.value / 2);
        setNota(e.target.value / 2);
    }

    const handleSubmit = () => {
        POST(membro, nota, tmdb);
        router.refresh();
    }

    return (
        <div className={`fixed left-0 z-10 ${show ? "bottom-0" : "-bottom-20"} h-20 w-full bg-foreground flex flex-col justify-center items-center`}>
            <p className="text-foreground">{nota}</p>
            <form className="flex items-center">
                <fieldset className="rate">
                    <input onChange={handleChange} checked={nota * 2 == 10} type="radio" id={"rating10"+membro+tmdb} name={"rating"+membro+tmdb} value="10" />
                    <label htmlFor={"rating10"+membro+tmdb} title="5 stars"></label>
                    <input onChange={handleChange} checked={nota * 2 == 9} type="radio" id={"rating9"+membro+tmdb} name={"rating"+membro+tmdb} value="9" />
                    <label className="half" htmlFor={"rating9"+membro+tmdb} title="4 1/2 stars"></label>
                    <input onChange={handleChange} checked={nota * 2 == 8} type="radio" id={"rating8"+membro+tmdb} name={"rating"+membro+tmdb} value="8" />
                    <label htmlFor={"rating8"+membro+tmdb} title="4 stars"></label>
                    <input onChange={handleChange} checked={nota * 2 == 7} type="radio" id={"rating7"+membro+tmdb} name={"rating"+membro+tmdb} value="7" />
                    <label className="half" htmlFor={"rating7"+membro+tmdb} title="3 1/2 stars"></label>
                    <input onChange={handleChange} checked={nota * 2 == 6} type="radio" id={"rating6"+membro+tmdb} name={"rating"+membro+tmdb} value="6" />
                    <label htmlFor={"rating6"+membro+tmdb} title="3 stars"></label>
                    <input onChange={handleChange} checked={nota * 2 == 5} type="radio" id={"rating5"+membro+tmdb} name={"rating"+membro+tmdb} value="5" />
                    <label className="half" htmlFor={"rating5"+membro+tmdb} title="2 1/2 stars"></label>
                    <input onChange={handleChange} checked={nota * 2 == 4} type="radio" id={"rating4"+membro+tmdb} name={"rating"+membro+tmdb} value="4" />
                    <label htmlFor={"rating4"+membro+tmdb} title="2 stars"></label>
                    <input onChange={handleChange} checked={nota * 2 == 3} type="radio" id={"rating3"+membro+tmdb} name={"rating"+membro+tmdb} value="3" />
                    <label className="half" htmlFor={"rating3"+membro+tmdb} title="1 1/2 stars"></label>
                    <input onChange={handleChange} checked={nota * 2 == 2} type="radio" id={"rating2"+membro+tmdb} name={"rating"+membro+tmdb} value="2" />
                    <label htmlFor={"rating2"+membro+tmdb} title="1 star"></label>
                    <input onChange={handleChange} checked={nota * 2 == 1} type="radio" id={"rating1"+membro+tmdb} name={"rating"+membro+tmdb} value="1" />
                    <label className="half" htmlFor={"rating1"+membro+tmdb} title="1/2 star"></label>
                </fieldset>
                <button onClick={handleSubmit} className="text-background ml-3 material-icons">check</button>
            </form>
        </div>
    )
}

export default Rating