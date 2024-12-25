import React from 'react';

const Log = (props: any) => {
    const log = props["log"];
    return (
        <div className='flex flex-row gap-3'>
            <div className='w-16 h-24 bg-blue-400'></div>
            <div>
                <div>{log.filme[0]?.titulo}</div>
                <div>{log.membro.user}</div>
                <div>{log.logs[0].nota ? log.logs[0].nota : "*"}</div>
            </div>            
        </div>
    );
};

export default Log;