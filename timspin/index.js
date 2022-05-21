let data = []

function count(){
  let date = new Date()
  let locale = date.toLocaleString()
  let s_timestamp = Math.round(date.getTime()/1000) | 0

let time = {date: date, locale: locale, s_timestamp: s_timestamp}


  data.push(time)
  group()
}

function group(){
    console.log(data)
}


setInterval(() => {
  count()
}, 1000);
