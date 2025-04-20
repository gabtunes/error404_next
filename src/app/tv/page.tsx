'use client'

import { useState } from "react"


interface IEvento {
  start: Date,
  duration: number
}

export default function Page() {
  const slots = [], horarios = []
  const [scheduler, setScheduler] = useState(false)
  const [slot, setSlot] = useState<Date | null>(null)
  const [eventos, setEventos] = useState<IEvento[] | any>([])

  const closeScheduler = () => {
    setScheduler(false);
  }

  for (let day = new Date(2025, 2, 17); day <= new Date(2025, 3, 20); day.setDate(day.getDate() + 1)) {
    for (let hour = 0; hour <= 23; hour++) {
      for (let minute = 0; minute <= 30; minute = minute + 30) {
        if (hour == 0 && minute == 0) {
          slots.push(day.getDay() + "_" + day.getDate() + "_" + day.getMonth() + "_" + day.getFullYear())
        }

        slots.push(new Date(day.getFullYear(), day.getMonth(), day.getDate(), hour, minute, 0, 0))
      }
    }
  }

  for (let hour = 0; hour <= 23; hour++) {
    for (let minute = 0; minute <= 30; minute = minute + 30) {
      horarios.push(("0" + hour.toString()).slice(-2) + ":" + ("0" + minute.toString()).slice(-2))
    }
  }

  return (
    <div className="flex justify-start">
      <div className="grid max-h-[2940px] grid-rows-49 grid-flow-col">
        <div className="sticky z-30 top-0 left-0 col-start-1 row-start-1 w-[70px] h-[60px] bg-white"></div>
        {
          horarios.map(((horario, index) => {
            return <div className={`sticky z-20 left-0 h-[60px] col-start-1 row-start-${index + 2} bg-white flex justify-center text-sm`} key={horario}>{horario}</div>
          }))
        }
        {
          slots.map(((slot, index) => {
            if (typeof slot === 'string') {
              return <div id={slot} key={slot} className={`bg-white sticky z-20 top-0 h-[60px] row-start-1 col-start-${(index / 49) + 2} w-[calc((100vw-70px)/3)] md:w-[calc((100vw-70px)/7)] flex flex-col items-center justify-center`}>
                {
                  slot.split("_")[0] == "1" ? <div>seg</div> : (
                    slot.split("_")[0] == "2" ? <div>ter</div> : (
                      slot.split("_")[0] == "3" ? <div>qua</div> : (
                        slot.split("_")[0] == "4" ? <div>qui</div> : (
                          slot.split("_")[0] == "5" ? <div>sex</div> : (
                            slot.split("_")[0] == "6" ? <div>sáb</div> : <div>dom</div>
                          )
                        )
                      )
                    )
                  )
                }
                <div>{slot.split("_")[1]}</div>
              </div>
            } else {
              return <div className={`h-[60px] hover:bg-gray-200 cursor-pointer`} id={slot.toISOString()} key={slot.toISOString()}
                onClick={() => {
                  setSlot(slot)
                  setScheduler(true)
                  console.log(eventos)
                }
                }></div>
            }
          }))
        }

      </div>


      {
        eventos.map((evento: IEvento) => {
          let diff = Math.floor(Date.UTC(evento.start.getFullYear(), evento.start.getMonth(), evento.start.getDate()) - Date.UTC(2025, 2, 17)) / (1000 * 60 * 60 * 24)
          let col = diff
          let leftval = `calc(70px + ( ${col} * ( (100vw - 70px) / 7 ) ) )`
          let widthval = `calc( 0.9 * ( (100vw - 70px) / 7 ) )`
          let marginleft = `calc( 0.05 * ( (100vw - 70px) / 7 ) )`

          let leftval_mobile = `calc(70px + ( ${col} * ( (100vw - 70px) / 3 ) ) )`
          let widthval_mobile = `calc( 0.9 * ( (100vw - 70px) / 3 ) )`
          let marginleft_mobile = `calc( 0.05 * ( (100vw - 70px) / 3 ) )`

          let row = (evento.start.getHours() + evento.start.getMinutes() / 60) * 120 + 60
          let duration = evento.duration * 2
          
          return <div key={evento.start.toISOString() + evento.duration}
                  style={{width: widthval, height:duration, marginLeft: marginleft, left: leftval, top: row}}
                  className={`absolute z-10
                              bg-center bg-cover bg-[url(https://image.tmdb.org/t/p/original/tAXK5R0ytrN2l2qgGfyxums5J0w.jpg)]
                              rounded-sm
                              flex items-end justify-center`}>
                    <div className="text-center text-white">Assassinato no Expresso Oriente (1979)</div>
                  </div>
        
        })
      }

      {scheduler &&
        <div className="fixed z-30 bg-black/50 w-full h-full flex justify-center items-center">
          <div className={`shadow-md bg-white w-full md:w-1/2 md:h-1/2 p-3 flex flex-col justify-left rounded-md`} >
            <div className="hover:bg-gray-100 rounded-full md:size-[30px] flex items-center justify-center cursor-pointer" onClick={closeScheduler}>
              <div style={{ fontSize: "20px" }} className="material-icons">close</div>
            </div>
            <div>
              {slot ? slot.toLocaleString() : "Nada"}
            </div>
            <button
              onClick={() => {
                setEventos([...eventos, { start: slot, duration: Math.floor(Math.random() * 140) + 80 }])
                console.log(eventos)
              }}>Adicionar</button>
          </div>
        </div>
      }

    </div>
  );
};