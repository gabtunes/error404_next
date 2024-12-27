import React from 'react';

const Botao = (props: any) => {
  return (
    <div className='rounded-sm flex justify-center items-center w-[130px] h-[60px] bg-[var(--foreground)] text-[var(--background)]'>
        <span>{props["titulo"]}</span>
    </div>
  );
};

export default Botao;