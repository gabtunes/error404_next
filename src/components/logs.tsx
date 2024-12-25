'use client'

import { refreshLogs } from '@/infra/log';
import { useTelegram } from '@/lib/telegramProvider';
import React, { useEffect, useState } from 'react';


const Logs = (props: any) => {
  const { user } = useTelegram()

  const [data, setData] = useState(props["data"])
  const filtro = props["data"].filter((registro: any) => registro.membro.id_telegram == user?.id)

  useEffect(() => {
    if (user) {
      setData(filtro)
    }
  }, [user])

  return (
    <div>
      <div>
        Logs
        <span onClick={() => { refreshLogs }} className='material-icons'>refresh</span>
      </div>
      <div>
        {data.map((log: any) => (
          <div key={log._id.membro + log._id.tmdb}>
            {log._id.membro} - {log.filme[0]?.titulo} - {log.logs[0]?.nota}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Logs;