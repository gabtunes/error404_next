import React from 'react';

const Log = (props: any) => {
    const log = props["log"];

    return (
        <div className='flex flex-row gap-3'>
            <div className='w-16 h-24 bg-blue-400'></div>
            <div className='flex flex-col justify-between'>
                <div>{log.filme[0]?.titulo}</div>
                <div>{log.membro.user}</div>
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
                </div>
            </div>            
        </div>
    );
};

export default Log;