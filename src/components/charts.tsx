"use client"

import { useState } from "react";
import Image from "next/image";

const Charts = (props: {atual: boolean, ultimo: any, penultimo: any, last_chart:any, bubbling: any}) => {
    const [page, setPage] = useState("charts")

    return (
        <div className="flex flex-col items-center">
            <div className="flex flex-row">
                <div className="p-[10px]" onClick={() => setPage("charts")}>
                    <span className={
                        (page == "charts") ?
                            "dark:bg-[#ededed] bg-[#171717] dark:text-[#0a0a0a] text-[#ffffff] p-[5px] rounded-md cursor-pointer"
                            : "dark:bg-[#0a0a0a] bg-[#ffffff] dark:text-[#ededed] text-[#171717] p-[5px] rounded-md cursor-pointer"}>Charts</span>
                </div>
                {props["atual"] &&
                    <div className="p-[10px]" onClick={() => setPage("bubbling")}>
                        <span className={
                            (page == "bubbling") ?
                                "dark:bg-[#ededed] bg-[#171717] dark:text-[#0a0a0a] text-[#ffffff] p-[5px] rounded-md cursor-pointer"
                                : "dark:bg-[#0a0a0a] bg-[#ffffff] dark:text-[#ededed] text-[#171717] p-[5px] rounded-md cursor-pointer"}>Bubbling</span>
                    </div>
                }
            </div>
            <div className={`mb-10 flex-col pt-5px items-center ${(page == "charts") ? "flex" : "hidden"}`}>
                { props["last_chart"].map((filme: any, index: number) => (
                        <div className="group flex flex-row items-stretch justify-stretch w-full md:w-[500px]" key={filme.tmdb}>
                            <div className="w-[50px] flex flex-col shrink-0 grow-0 justify-center items-center ">
                                <div className='funnel-sans text-[25px] md:text-[35px]'>{index + 1}</div>
                                {!props["ultimo"] ?
                                    (props["penultimo"].find((o: any) => o.tmdb == filme.tmdb) ?
                                        (
                                            (props["penultimo"].find((o: any) => o.tmdb == filme.tmdb)["pos"] - (index + 1) > 0) ?
                                                <Image alt="Desceu" className="size-[20px] md:size-[23px]" width={50} height={50} src="/img/up.png"></Image> :
                                                (props["penultimo"].find((o: any) => o.tmdb == filme.tmdb)["pos"] - (index + 1) < 0 ?
                                                    <Image alt="Subiu" className="size-[20px] md:size-[23px]" width={50} height={50} src="/img/down.png"></Image> :
                                                    <Image alt="Nada mudou" className="size-[20px] md:size-[23px]" width={50} height={50} src="/img/same.png"></Image>
                                                )
                                        )
                                        : <Image alt="Novo" className="size-[23px] md:size-[25px]" width={50} height={50} src="/img/new.png"></Image>)
                                    : <div></div>
                                }
                            </div>
                            <div className="flex items-center">
                                <div className="bg-black h-5/6 w-[1px]"></div>
                            </div>
                            <div className="flex flex-col grow">
                                <div className='break-normal min-w-[60px] px-[10px] pt-[10px] pb-[3px] text-[16px] md:text-[20px] font-bold'>{filme.titulo}</div>
                                <div className="flex flex-row items-center">
                                    <div className="px-[10px] text-[16px]">{(filme.media).toFixed(2)}</div>
                                    <div className="w-[30px] flex flex-row">
                                        {filme.selo == 'cf' ?
                                            <Image className="mr-[5px]" alt="Certified Fresh" width='20' height="20" src="/img/certified.svg"></Image> :
                                            (filme.selo == 'f' ?
                                                <Image className="mr-[5px]" alt="Fresh" width='20' height="20" src="/img/fresh.svg"></Image> :
                                                <Image className="mr-[5px]" alt="Rotten" width="20" height="20" src="/img/rotten.svg"></Image>
                                            )
                                        }
                                        <div className="text-[16px]">{(100 * filme.percent).toFixed(0)}%</div>
                                    </div>
                                </div>
                            </div>
                            <div className={`shrink-0 grow-0 flex items-center justify-center ${(filme.oscar === null) ? "w-0" : "w-[40px]"}`}>
                                {(filme.oscar === null) ?
                                    <div></div> :
                                    ((filme.oscar) ?
                                        <Image src="/img/oscar_win.svg" alt="" width={30} height={30} /> :
                                        <Image src="/img/oscar_nom.svg" alt="" width={30} height={30} />
                                    )
                                }
                            </div>
                        </div>
                    ))
                }
            </div>
            {props["atual"] &&
            <div className={`mb-10 flex-col pt-5px items-center ${(page == "bubbling") ? "flex" : "hidden"}`}>
                    {props["bubbling"].map((filme: any, index: any) => (
                        <div className="group flex flex-row items-stretch justify-stretch w-full md:w-[500px]" key={filme.tmdb}>
                            {(index > 0) ?
                                ((props["bubbling"][index - 1].membros_n == filme.membros_n) ?
                                    <div className="w-[50px] flex flex-col shrink-0 grow-0 justify-center items-center "></div>
                                    :
                                    <div className="w-[50px] flex flex-col shrink-0 grow-0 justify-center items-center text-[#00ac1c]">
                                        <div className='funnel-sans text-[25px] md:text-[35px]'>{filme.membros_n}</div>
                                        <div className="material-icons">remove_red_eye</div>
                                    </div>
                                )
                                :
                                <div className="w-[50px] flex flex-col shrink-0 grow-0 justify-center items-center text-[#00ac1c]">
                                    <div className='funnel-sans text-[25px] md:text-[35px]'>{filme.membros_n}</div>
                                    <div className="material-icons">remove_red_eye</div>
                                </div>
                            }
                            <div className="flex flex-col grow">
                                <div className='break-normal min-w-[60px] px-[10px] pt-[10px] pb-[3px] text-[16px] md:text-[20px] font-bold'>{filme.titulo}</div>
                                <div className='px-[10px] flex flex-row items-center'><span className="material-icons pr-[5px]">schedule</span>{filme.duracao}</div>
                            </div>
                        </div>
                    ))}
            </div>
            }
        </div>
    );
};

export default Charts;