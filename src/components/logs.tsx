'use client'

import { useTelegram } from '@/lib/telegramProvider';
import React from 'react';
import useSWR from 'swr';

const fetcher = (url: any) => fetch(url).then((res) => res.json());

const Logs = () => {
  const { user } = useTelegram()

  const url = user ? "/api/log?user=" + user.id : "/api/log"

  const { data, error, isLoading } = useSWR(url, fetcher)

  if (error) return <div>falhou em carregar</div>
  if (isLoading) return <div>carregando...</div>
  return (
    <div>
      <div>Logs</div>
      <div>
          {data?.map((log: any) => (
            <div key={log._id.membro + log._id.tmdb}>
              {log.filme[0]?.titulo} - {log._id.membro} - {log.logs[0].nota}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Logs;