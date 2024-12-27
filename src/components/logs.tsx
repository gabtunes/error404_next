'use client'

import { useTelegram } from '@/lib/telegramProvider';
import React from 'react';
import useSWR from 'swr';
import Log from './log';

const fetcher = (url: any) => fetch(url).then((res) => res.json());

const Logs = () => {
  const { user } = useTelegram()

  const url = user ? "/api/log?user=" + user.id : "/api/log"

  const { data, error, isLoading } = useSWR(url, fetcher)

  if (error) return <div>Falha</div>
  if (isLoading) {
    return (
      <div className='w-full md:w-[600px] h-10 p-3 flex flex-row justify-between items-center bg-[var(--foreground)] text-[var(--background)]'>
        <div>Logs</div>
        <div className="loader"></div>
      </div>
      )
  }

  return (
    <div className='w-full md:w-[600px]'>
      <div className='w-full h-10 p-3 flex flex-row items-center bg-[var(--foreground)] text-[var(--background)]'>
        <div>Logs</div>
      </div>
      <div className='flex flex-col  gap-3'>
          {data?.map((log: any, index: number) => (
            <div className='flex flex-col' key={log._id.membro + log._id.tmdb}>
                {(index > 0 && data[index - 1].ultimo_log.split("T")[0] == log.ultimo_log.split("T")[0]) ?
                (""):
                (<div className='p-3 w-full flex items-center justify-end h-10 bg-[#aaaaaa] mb-3'>
                  {log.ultimo_log.split("T")[0]}
                </div>)}   
              <Log log={log} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Logs;