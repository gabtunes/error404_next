'use client'

const Evento = (props: any) => {

    const duration = props["duration"];

    return (
        <div style={{height: duration}} className={`rounded-md bg-green-100 shadow-md w-11/12 p-2 flex justify-right`} >
            {props.children}
        </div>
    )
}

export default Evento