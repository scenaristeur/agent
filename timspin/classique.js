let date = new Date()
let locale = date.toLocaleString()
let st = Math.round(date.getTime()/1000) | 0


let time = {date: date, locale: locale, st: st, id: "now", step: 0}


let times = [time]
console.log(times)

const steps = [
  {name: "10 secondes", facteur: 10},
  {name: "30 secondes", facteur: 30},
  {name: "1 minute", facteur: 60},
  // {name: "5 minutes", facteur: 300},
  // {name: "10 minutes", facteur: 600},
  // {name: "15 minutes", facteur: 900},
  // {name: "30 minutes", facteur: 1800},
  // {name: "1 heure", facteur: 3600},
  // {name: "4 heures", facteur: 14400},
  // {name: "8 heures", facteur: 28800},
  // {name: "12 heures", facteur: 43200},
  // {name: "24 heures", facteur: 86400},
  // {name: "3 jours", facteur: 259200},
  // {name: "5 jours", facteur: 432000},
  // {name: "1 semaine", facteur: 604800},
  // {name: "2 semaines", facteur: 1209600},
  // {name: "28 jours", facteur: 2419200},
  // {name: "1 trimestre (28j*3)", facteur: 7257600},
  // {name: "1 semestre(365j/2)", facteur: 15768000 },
  // {name: "1 an", facteur: 31536000},
  // {name: "5 ans", facteur: 157680000 },
  // {name: "10 ans", facteur: 315360000},
  // {name: "15 ans", facteur: 473040000},
  // {name: "25 ans", facteur: 788400000},
  // {name: "50 ans", facteur: 1576800000},
  // {name: "1 siècle", facteur: 3153600000},
  // {name: "10 siècles", facteur: 31536000000},
  // {name: "100 siècles", facteur: 315360000000},
  // {name: "1000 siècles", facteur: 3153600000000},
]

steps.forEach((step, i) => {
  //console.log(step)
  let idx = i+1
  let f = step.facteur
  let beforeNode = {st: time.st-f, step: step, indice: -idx}
  let afterNode = {st: time.st+f, step: step, indice: idx }

beforeNode.date = new Date(beforeNode.st*1000)
beforeNode.locale = beforeNode.date.toLocaleString()
afterNode.date = new Date(afterNode.st*1000)
afterNode.locale = afterNode.date.toLocaleString()
  times.unshift(beforeNode)
  times.push(afterNode)


})

console.log(times)
