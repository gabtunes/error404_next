'use client'

const Evento = (props: any) => {

    return (
        <div className="rounded-md shadow-md w-11/12 h-[90px] mt-[0px] p-2 flex justify-right" >
            {props.children}
        </div>
    )
}

export default Evento