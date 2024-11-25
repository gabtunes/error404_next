import { getChartComparison } from "@/infra/charts";
import { getCharts } from "@/infra/log";
import Link from "next/link";
import Image from "next/image";

export default async function Page({ params, }: { params: Promise<{ ano: string }> }) {
    const anos = [2024, 2023, 2022, 2021];
    const ano_uri = (await params).ano;
    const res = await getChartComparison(parseInt(ano_uri));
    const charts = await res.json();
    const ultimo = charts[0].limite;
    let penultimo: any = [];

    if (charts.length > 1) {
        penultimo = charts[1].chart;
    }

    const res2 = await getCharts(parseInt(ano_uri));
    const last_chart = await res2.json();

    return (
        <div className="flex flex-col items-center">
            <div className="flex flex-row">
            {
                anos.map((ano: any) => (
                <div key={ano} className={`${(ano_uri==ano)?
                            "dark:bg-[#ededed] bg-[#171717] dark:text-[#0a0a0a] text-[#ffffff]" : 
                            "dark:bg-[#0a0a0a] bg-[#ffffff] dark:text-[#ededed] text-[#171717]"} p-[15px]`}>
                        <Link href={`${ano}`}>{ano}</Link>
                    </div>
                ))
            }
            </div>
            <div id="table" className="mb-10 flex flex-col pt-5px items-center">
                {(last_chart && charts) ?
                    last_chart.map((filme: any, index: number) => (
                        <div className="flex flex-row items-center" key={filme.tmdb}>
                            <div className='text-[30px] w-[60px] p-[10px] text-right'>{index + 1}</div>
                            <div className='break-normal w-[100px] min-[400px]:w-[150px] md:w-[300px] min-w-[60px] p-[10px] text-center'>{filme.titulo}</div>
                            <div className="p-[10px]">
                            {(filme.oscar === null) ?
                                <div className="w-[20px]"></div> :
                                ((filme.oscar) ?
                                    <Image alt="Oscar Winner" width='20' height="20" src="/img/oscar_win.svg"></Image> :
                                    <Image alt="Oscar Nominated" width='20' height="20" src="/img/oscar_nom.svg"></Image>
                                )
                            }
                            </div>
                            {!ultimo ?
                                (penultimo.find((o: any) => o.tmdb == filme.tmdb) ?
                                    (
                                        (penultimo.find((o: any) => o.tmdb == filme.tmdb)["pos"] - (index + 1) > 0) ?
                                            <span className='p-[10px] text-[#06f712]'><span className="-rotate-90 material-icons ">play_circle</span></span> :
                                            (penultimo.find((o: any) => o.tmdb == filme.tmdb)["pos"] - (index + 1) < 0 ?
                                                <span className='p-[10px] text-[#fa0315]'><span className="rotate-90 material-icons ">play_circle</span></span> :
                                                <span className='p-[10px] text-[#ffd00f]'><span className="rotate-90 material-icons ">pause_circle</span></span>
                                            ) 
                                    )
                                    : <span className='p-[10px] material-icons text-[#229de3]'>fiber_new</span>)
                                : <span></span>
                            }
                            
                            <div className="p-[10px] first-letter:text-[25px]">{(filme.media).toFixed(2)}</div>
                            <div className="p-[10px]">
                                <div className="w-[30px] flex flex-col items-center content-center self-center align-middle">
                                    {filme.selo == 'cf' ?
                                        <Image className="mb-[5px]" alt="Certified Fresh" width='30' height="30" src="/img/certified.svg"></Image> :
                                        (filme.selo == 'f' ?
                                            <Image className="mb-[5px]" alt="Fresh" width='30' height="30" src="/img/fresh.svg"></Image> :
                                            <Image className="mb-[5px]" alt="Rotten" width="30" height="30" src="/img/rotten.svg"></Image>
                                        )
                                    }
                                    <div className="text-[14px] font-medium">{(100*filme.percent).toFixed(0)}%</div>
                                </div>
                            </div>
                        </div>
                    ))
                    : <div>Loading Charts...</div>
                }
            </div>

        </div>
    )

}