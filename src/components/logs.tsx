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
  if (isLoading) return <div>Loading...</div>
  return (
    <div>
      <div>Logs</div>
      <div className='flex flex-col gap-3'>
          {data?.map((log: any, index: number) => (
            <div className='flex flex-row' key={log._id.membro + log._id.tmdb}>
              <div className='w-30'>
              {(index > 0 && data[index - 1].ultimo_log.split("T")[0] == log.ultimo_log.split("T")[0]) ? (
                ""
              ) : (log.ultimo_log.split("T")[0])}
              </div>              
              <Log log={log} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Logs;