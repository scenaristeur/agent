let date = new Date()
let locale = date.toLocaleString()
let st = Math.round(date.getTime()/1000) | 0


let time = {date: date, locale: locale, st: st, id: "now", step: 0}


let times = [time]
console.log(times)

for (let i = 0; i < 100; i+=.5){
  let step = Math.exp(i)
  //console.log(step)
  let beforeNode = {st: st-step, step: -step}
  let afterNode = {st: st+step, step: step}

console.log(new Date(afterNode.st*1000).toLocaleString())
  times.unshift(beforeNode)
  times.push(afterNode)


}

//console.log(times)
