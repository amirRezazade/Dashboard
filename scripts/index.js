let dateElem = document.querySelector('#date')
let timeElem = document.querySelector('#time')


let date = new Date()
dateElem.textContent=`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`

setInterval(() => {
   let time = new Date()
   timeElem.textContent= time.getHours() +':' + time.getSeconds()   
}, 1000);