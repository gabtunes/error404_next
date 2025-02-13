'use client'

import { useTelegram } from '@/lib/telegramProvider';
import React, { useState } from 'react';
import useSWR from 'swr';
import Rating from './rating';

const fetcher = (url: any) => fetch(url).then((res) => res.json());
const fetcher2 = (url: any) => fetch(url).then((res) => res.json());

const Log = (props: any) => {
    const log = props["log"];    
    const [ rating, setRating ] = useState<boolean>(false)
    const { user } = useTelegram()
    
    const url = "https://api.telegram.org/bot6467847581:AAH6c0YZgmpMXC91CP4VHpG_djDYzc-JnJc/getUserProfilePhotos?user_id=" + log.membro.id_telegram
    const { data: imageData } = useSWR(url, fetcher)
    const url2 = "https://api.telegram.org/bot6467847581:AAH6c0YZgmpMXC91CP4VHpG_djDYzc-JnJc/getFile?file_id=" + imageData?.result?.photos[0][0]?.file_id
    const { data: fileData } = useSWR(() => url2, fetcher2)

    return (
        <div className='flex flex-row gap-3'>
            <div className='relative w-16 h-24 bg-blue-400'>
                {log.filme[0]?.poster &&
                    <img src={"https://image.tmdb.org/t/p/w500" + log.filme[0]?.poster} alt="" width={64} height={96}/>
                }                
                {(fileData?.ok && !user) &&
                    <img className="absolute -bottom-3 -right-3 rounded-full" alt="Perfil" width={35} height={35} src={"https://api.telegram.org/file/bot6467847581:AAH6c0YZgmpMXC91CP4VHpG_djDYzc-JnJc/" + fileData?.result?.file_path} />
                }
            </div>
            <div className='flex flex-col gap-2 justify-start'>
                <div>{log.filme[0]?.titulo}</div>
                <div>
                    {log.logs[0].nota ?
                        (
                            log.logs[0].nota > Math.trunc(log.logs[0].nota) ?
                                (<span>
                                    {[...Array(Math.trunc(log.logs[0].nota))].map((e, i) => <span className="material-icons" key={i}>star</span>)}
                                    <span className='material-icons'>star_half</span>
                                </span>
                                )
                                :
                                ([...Array(Math.trunc(log.logs[0].nota))].map((e, i) => <span className="material-icons" key={i}>star</span>))
                        )
                        :
                        (<span></span>)}
                        <button className="material-icons ml-2 md18 cursor-pointer" onClick={() => setRating(!rating)}>edit</button>
                </div>                
            </div>
            <Rating show={rating} nota={log.logs[0].nota} membro={log._id.membro} tmdb={log._id.tmdb} />
        </div>
    );
};

export default Log;

