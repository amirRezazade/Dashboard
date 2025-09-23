function addToLocal(key , value){
    localStorage.setItem(key , JSON.stringify(value))
}
function getToLocal(key) {
  return JSON.parse(localStorage.getItem(key));
}




export{ addToLocal , getToLocal}