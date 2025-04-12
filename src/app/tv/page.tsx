import Slot from "./components/slot"

export default function Page() {
  const horarios = []

  for (let hour = 0; hour <= 23; hour++) {
    for (let minute = -30; minute <= 30; minute = minute + 30) {
      for (let day = 0; day <= 7; day++) {
        if(day == 0 && hour == 0 && minute < 0){
          horarios.push(
            <div id={day + "tit" + hour + "_" + minute} key={day + "_" + hour + "_" + minute} className="h-[30px]"></div>
          )
        } else if (day > 0 && hour == 0 && minute < 0) {
          horarios.push(
            <div id={day + "tit" + hour + "_" + minute} key={day + "_" + hour + "_" + minute} className="col-span-2 h-[30px] flex justify-center">
              {
                day == 1 ? "Segunda" : (
                  day == 2 ? "Terça" : (
                    day == 3 ? "Quarta" : (
                      day == 4 ? "Quinta" : (
                        day == 5 ? "Sexta" : (
                          day == 6 ? "Sábado" : "Domingo"
                        )
                      )
                    )
                  )
                )
              }
            </div>
          )
        } else if (day == 0 && minute >= 0) {
          horarios.push(
            <div id={day + "tit" + hour + "_" + minute} key={day + "_" + hour + "_" + minute} className="h-[30px] flex justify-center">
              {("0" + hour).slice(-2)}:{("0" + minute).slice(-2)}
            </div>
          )
        } else if (minute >= 0) {
          horarios.push(
            <Slot id={day + "_" + hour + "_" + minute} key={day + "_" + hour + "_" + minute} />
          )
        }
      }
    }
  }

  return (
    <div className="absolute grid grid-cols-15 w-full">
      {horarios.map(slot => slot)}
    </div>
  );
};