"use client"

import { useState } from "react";
import useSWR from "swr";

const fetcher = (url: any) => fetch(url).then((res) => res.json());

const Charts = (props: {limite?: boolean, atual: boolean, last_chart?:any, bubbling?: any}) => {
    const [page, setPage] = props["limite"] && props["atual"] ? useState("bubbling") : useState("charts")

    const url = "/api/lastchart"
    const url2 = "/api/bubbling"
  
    const { data: lastcharts, error: error_lastcharts, isLoading: isLoading_lastcharts } = useSWR(url, fetcher)
    const { data: bubbling, error: error_bubbling, isLoading: isLoading_bubbling } = useSWR(url2, fetcher)
  
    if (error_lastcharts || error_bubbling) return <div>Falha</div>
    if (isLoading_bubbling || isLoading_lastcharts) {
      return (
        <div className='w-full md:w-[600px] h-10 p-10 flex flex-row justify-between items-center bg-[var(--background)] text-[var(--foreground)]'>
          <div style={{borderColor: "var(--foreground)"}} className="loader"></div>
        </div>
        )
    }

    return (
        <div className="flex flex-col items-center">
            <div className="flex flex-row">
                {!props["limite"] &&
                <div className="p-[10px]" onClick={() => setPage("charts")}>
                    <span className={
                    (page == "charts") ?
                        "dark:bg-[#ededed] bg-[#171717] dark:text-[#0a0a0a] text-[#ffffff] p-[5px] rounded-md cursor-pointer"
                        : "dark:bg-[#0a0a0a] bg-[#ffffff] dark:text-[#ededed] text-[#171717] p-[5px] rounded-md cursor-pointer"}>Charts</span>
                </div>
                }
                {props["atual"] &&
                    <div className="p-[10px]" onClick={() => setPage("bubbling")}>
                        <span className={
                            (page == "bubbling") ?
                                "dark:bg-[#ededed] bg-[#171717] dark:text-[#0a0a0a] text-[#ffffff] p-[5px] rounded-md cursor-pointer"
                                : "dark:bg-[#0a0a0a] bg-[#ffffff] dark:text-[#ededed] text-[#171717] p-[5px] rounded-md cursor-pointer"}>Bubbling</span>
                    </div>
                }
            </div>
            {props["last_chart"] &&
            <div className={`mb-10 flex-col pt-5px items-center ${(page == "charts") ? "flex" : "hidden"}`}>
                { props["last_chart"].map((filme: any, index: number) => (
                        <div className="group flex flex-row items-stretch justify-stretch w-full md:w-[500px]" key={filme.tmdb}>
                            <div className="w-[50px] flex flex-col shrink-0 grow-0 justify-center items-center ">
                                <div className='funnel-sans text-[25px] md:text-[35px]'>{index + 1}</div>
                                {props["atual"] ?
                                    <div>
                                    <img alt="Desceu" className="size-[20px] md:size-[23px]" width={50} height={50} src="/img/up.png" />
                                    <img alt="Subiu" className="size-[20px] md:size-[23px]" width={50} height={50} src="/img/down.png" />
                                    <img alt="Nada mudou" className="size-[20px] md:size-[23px]" width={50} height={50} src="/img/same.png" />
                                    <img alt="Novo" className="size-[23px] md:size-[25px]" width={50} height={50} src="/img/new.png" />
                                    </div>
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
                                            <img className="mr-[5px]" alt="Certified Fresh" width='20' height="20" src="/img/certified.svg" /> :
                                            (filme.selo == 'f' ?
                                                <img className="mr-[5px]" alt="Fresh" width='20' height="20" src="/img/fresh.svg" /> :
                                                <img className="mr-[5px]" alt="Rotten" width="20" height="20" src="/img/rotten.svg" />
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
                                        <img src="/img/oscar_win.svg" alt="" width={30} height={30} /> :
                                        <img src="/img/oscar_nom.svg" alt="" width={30} height={30} />
                                    )
                                }
                            </div>
                        </div>
                    ))
                }
            </div>
            }
            {(!props["limite"] && props["atual"]) &&
            <div className={`mb-10 flex-col pt-5px items-center ${(page == "charts") ? "flex" : "hidden"}`}>
                { lastcharts.map((filme: any, index: number) => (
                        <div className="group flex flex-row items-stretch justify-stretch w-full md:w-[500px]" key={filme.tmdb}>
                            <div className="w-[50px] flex flex-col shrink-0 grow-0 justify-center items-center ">
                                <div className='funnel-sans text-[25px] md:text-[35px]'>{index + 1}</div>
                                {filme.status == "DOWN" ? 
                                        <img alt="Desceu" className="size-[20px] md:size-[23px]" width={50} height={50} src="/img/up.png" /> :
                                        filme.status == "UP" ?
                                            <img alt="Subiu" className="size-[20px] md:size-[23px]" width={50} height={50} src="/img/down.png" /> :
                                            filme.status == "SAME" ?
                                                <img alt="Nada mudou" className="size-[20px] md:size-[23px]" width={50} height={50} src="/img/same.png" /> :
                                                <img alt="Novo" className="size-[23px] md:size-[25px]" width={50} height={50} src="/img/new.png" />
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
                                            <img className="mr-[5px]" alt="Certified Fresh" width='20' height="20" src="/img/certified.svg" /> :
                                            (filme.selo == 'f' ?
                                                <img className="mr-[5px]" alt="Fresh" width='20' height="20" src="/img/fresh.svg" /> :
                                                <img className="mr-[5px]" alt="Rotten" width="20" height="20" src="/img/rotten.svg" />
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
                                        <img src="/img/oscar_win.svg" alt="" width={30} height={30} /> :
                                        <img src="/img/oscar_nom.svg" alt="" width={30} height={30} />
                                    )
                                }
                            </div>
                        </div>
                    ))
                }
            </div>
            }
            {props["atual"] &&
            <div className={`mb-10 flex-col pt-5px items-center ${(page == "bubbling") ? "flex" : "hidden"}`}>
                    {bubbling.map((filme: any, index: any) => (
                        <div className="group flex flex-row items-stretch justify-stretch w-full md:w-[500px]" key={filme.tmdb}>
                            {(index > 0) ?
                                ((bubbling[index - 1].notas_nao_nula == filme.notas_nao_nula) ?
                                    <div className="w-[50px] flex flex-col shrink-0 grow-0 justify-center items-center "></div>
                                    :
                                    <div className="w-[50px] flex flex-col shrink-0 grow-0 justify-center items-center text-[#00ac1c]">
                                        <div className='funnel-sans text-[25px] md:text-[35px]'>{filme.notas_nao_nula}</div>
                                        <div className="material-icons">remove_red_eye</div>
                                    </div>
                                )
                                :
                                <div className="w-[50px] flex flex-col shrink-0 grow-0 justify-center items-center text-[#00ac1c]">
                                    <div className='funnel-sans text-[25px] md:text-[35px]'>{filme.notas_nao_nula}</div>
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