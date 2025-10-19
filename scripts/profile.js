import {
  addToLocal,
  getToLocal,
  showSwal,
  showTost,
  addToShoppingCard,
} from "./funcs.js";

const tabBtns = document.querySelector('#tab-btns')
const tabWrapper = document.querySelector('#tab-container')


tabBtns.addEventListener('click' , e=>{
  if(e.target.nodeName==='BUTTON'){
    tabBtns.querySelectorAll('button').forEach(elem=> elem.classList.remove('before:!w-full'))
    e.target.classList.add('before:!w-full')
    
  }
})