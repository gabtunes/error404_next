import Link from "next/link"

export default function Page() {
    return (
        <div className="flex flex-col items-center">
            <div className="protest-guerrilla-regular text-[50px]">BOLÃO</div>
            <div className="w-full md:w-[600px] grid grid-cols-5 gap-[5px] p-[5px]">
                <Link href={"https://docs.google.com/spreadsheets/d/1O7-gVsIXVO2cAUUCJ5IsuaoT0VRf77kexJ8MyTnB2T0/edit?usp=sharing"}>
                <div className="bg-white flex items-center justify-center p-[5px]">
                    <div className="size-[50px] md:size-[75px] justify-self-center object-cover flex flex-col items-center justify-center">
                        <img className="h-[50px] md:h-[75px]" src="/img/premios/golden.png"></img>
                    </div>
                </div>
                </Link>
                <Link href={"https://docs.google.com/forms/d/e/1FAIpQLScbA5QYtlagW12oAVvipWUA6WW_2LxUAfZLxZTnF6bMYG-gtg/viewform?usp=header"}>
                <div className="bg-white flex items-center justify-center p-[5px]">
                    <div className="size-[50px] md:size-[75px] justify-self-center object-contain flex items-center justify-center">
                        <img className="h-[50px] md:h-[75px]" src="/img/premios/critics.png"></img>
                    </div>
                </div>
                </Link>
                <div className="bg-white flex items-center justify-center p-[5px]">
                    <div className="size-[50px] md:size-[75px] justify-self-center object-contain flex items-center justify-center">
                        <img className="h-[50px] md:h-[75px] w-[66px] md:w-[100px] max-w-none" src="/img/premios/bafta.png"></img>
                    </div>
                </div>
                <Link href={"https://docs.google.com/forms/d/e/1FAIpQLSdbvh793ke6RI-_-Xn4I429WXbdi-iMlE53nFGRuaXzFxgZ9Q/viewform?usp=header"}>
                <div className="bg-white flex items-center justify-center p-[5px]">
                    <div className="size-[50px] md:size-[75px] justify-self-center object-contain flex items-center justify-center">
                        <img className="h-[50px] md:h-[75px]" src="/img/premios/sag.png"></img>
                    </div>
                </div>
                </Link>
                <div className="bg-white flex items-center justify-center p-[5px]">
                    <div className="size-[50px] md:size-[75px] justify-self-center object-contain flex items-center justify-center">
                        <img className="h-[50px] md:h-[75px]" src="/img/premios/oscar.png"></img>
                    </div>
                </div>
            </div>
        </div>

    )
}