

let shoppingCardIds = []
let shoppingCardItems = JSON.parse(localStorage.getItem('shoppingCardItems'))

if(!getToLocal('shoppingCardIds')){
    shoppingCardIds=[1,2,3,4,5]
    addToLocal('shoppingCardIds' , shoppingCardIds)
    }
    
 window.addEventListener('DOMContentLoaded' ,()=>{
  if(!getToLocal('shoppingCardItems')) getShoppingCardItems()
  if(getToLocal('dark')==false) toggleDarkMode()
  changeActiveColor(getToLocal('active-color') || '#0ca593')
  getAndAddNavTodoList()
  

})

function addToLocal(key , value){
    localStorage.setItem(key , JSON.stringify(value))
}
function getToLocal(key){
   return JSON.parse( localStorage.getItem(key))
}

function addShoppingCardItems(){
   let products =  getToLocal('shoppingCardItems')
   updateShoppingCardLength()
   if(products.length){
    document.querySelector('#shopping-card-container').style.display='flex'
    document.querySelector('#shopping-card-container').nextElementSibling.style.display='flex'
    document.querySelector('#empty-shopping-card').style.display='none'
     document.querySelector('#shopping-card-container').innerHTML=``

    products.forEach(item  => {
        document.querySelector('#shopping-card-container').innerHTML+=
        `
        <li class="flex items-center justify-between transition-colors py-2 hover:bg-gray-400/30">
                      <div class="flex gap-3 w-1/2 ">
                        <span class="p-0.5 size-12 shrink-0 rounded-full bg-[var(--bg-color)]/50">
                          <img class="object-cover" src="${item.thumbnail}" alt="">
                        </span>
                        <div dir="ltr" class="flex flex-col truncate">
                          <a href="#" class="text-sm ">${item.title}</a>
                          <span>${Math.ceil(item.price)} $ </span>
                        </div>
                      </div>
                      <div class="flex items-center gap-2">
                        <button onclick="changeQuantity(${item.id} , 'plus')" type="button" class="size-7 centered cursor-pointer rounded-full border border-gray-500/50">+</button>
                        <span class="">${item.quantity}</span>
                        <button onclick="changeQuantity(${item.id} , 'mines')" type="button" class="size-7 centered cursor-pointer rounded-full border border-gray-500/50">-</button>
                      </div>
                      <span class="font-bold total-price">${Math.ceil(item.price * item.quantity)} $ </span>
                      <button type="button" class=" rounded-full cursor-pointer size-7 centered text-red-600 text-sm" onclick="removeShoppingCardItem(${item.id})"><i class="fa-solid fa-xmark"></i></button>
                  </li>
        `
        
    });
    changeShoppingCartTotalPrice()

    } 
    else{
    emptyShoppingCard()
    }
}
async function getShoppingCardItems(){
   let ids =  getToLocal('shoppingCardIds')  
  const products = await Promise.all(
    ids.map(id =>        
      fetch(`https://dummyjson.com/products/${id}`).then(res => res.json())
    )
  );
    const shoppingCardItems = products.map(product => ({
    ...product,
    quantity: 1
  }));

 addToLocal('shoppingCardItems' , shoppingCardItems )  
}

function removeShoppingCardItem(id){
   let card = getToLocal('shoppingCardItems')
   let ids = getToLocal('shoppingCardIds') 
   let idsIndex =  ids.findIndex(item=> item==id) 
   let index =  card.findIndex(item  => item.id === id )   
   ids.splice( idsIndex , 1);
   card.splice(index , 1)
   addToLocal('shoppingCardItems' , card )
   addToLocal('shoppingCardIds' , ids )
   addShoppingCardItems()
   updateShoppingCardLength()
}
function changeQuantity(id , text){
  
  let card = getToLocal('shoppingCardItems')     
  let index =  card.findIndex(item  => item.id === id )  
  if(text=='plus') card[index].quantity++
  if(text=='mines' && card[index].quantity!==1) card[index].quantity--
     addToLocal('shoppingCardItems' , card )
     addShoppingCardItems()
}

function changeShoppingCartTotalPrice(){
  let total=0
   let card = getToLocal('shoppingCardItems')     
   card.forEach(item=>{
    total += item.price * item.quantity
   })
   document.querySelector('#shopping-card-total-price').textContent=Math.ceil(total) + ' $'
   

}

function emptyShoppingCard(){
    document.querySelector('#shopping-card-container').style.display='none'
    document.querySelector('#shopping-card-container').nextElementSibling.style.display='none'
    document.querySelector('#empty-shopping-card').style.display='flex'
}
function updateShoppingCardLength(){
    length = getToLocal('shoppingCardItems') ? getToLocal('shoppingCardItems').length : 0 
    document.querySelector('#shopping-card-length').textContent=`${length}مورد`
}
function toggleSidebar(){
  let sidebar = document.querySelector('aside')
  if(sidebar.getBoundingClientRect().width>70) sidebar.style.width='58px'
  else sidebar.style.width=''
}


 const navItems = document.querySelectorAll('.nav-item')
 const navItemsContents = document.querySelectorAll('.nav-item .nav-item-content')
 navItems.forEach(elem=>{
  elem.addEventListener('click', (event)=>{
    navItemsContents.forEach(item=> item.classList.remove('show'))
    event.stopPropagation();
    elem.querySelector('.nav-item-content').classList.add('show')
  })
  document.addEventListener('click' , (e)=>{
    if(!elem.contains(e.target))   elem.querySelector('.nav-item-content').classList.remove('show')
  })
 })
 

 async function getAndAddNavTodoList(){
  let res = await fetch('https://dummyjson.com/todos')
  let response = await res.json()
  let todos = response.todos.splice(1,8)
  todos.forEach(todo=>{
    document.querySelector('#nav-todo-list-container').innerHTML+=`
      <li class="flex items-center justify-between transition-colors  hover:bg-gray-400/30 px-2 py-3">
         <div class="flex items-center gap-2 max-w-3/4">
               <span class="p-0.5 size-8 text-sm centered shrink-0 rounded-full bg-[var(--active-color)]/50">
              <i class="fa-solid fa-exclamation"></i>
             </span>
             <div dir="ltr" class="  text-sm flex flex-col truncate ${todo.completed===true ? 'line-through' : ''} me-auto ms-2 ">
               <span class="truncate">${todo.todo}</span>
             </div>
         </div>
                    <span
                      class=" ms-auto rounded p-1 ${todo.completed===false ? 'hidden' : ''} bg-red-500/30 text-nowrap text-xs "
                      >انجام شده</span
                    >
                   <button type="button" class=" rounded-full cursor-pointer size-7 centered text-red-600 text-sm" onclick="parentElement.style.display='none'"><i class="fa-solid fa-xmark"></i></button>
                </li>
    `

  })
 }
 const activeColorOptions = document.querySelector('#active-color-options')
 activeColorOptions.addEventListener('click' , e=>{
   if(e.target.nodeName=='BUTTON'){
     let color = e.target.dataset.color;
     changeActiveColor(color)
   }
 })
 
  function toggleFullscreen() {
    const elem = document.documentElement; 
    if (!document.fullscreenElement) {
      elem.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }
 function changeActiveColor(color){
    let root = document.querySelector(':root');
    root.style.setProperty('--active-color', color);
    addToLocal('active-color' , color)
  activeColorOptions.querySelectorAll('button').forEach(item=>{
    item.classList.remove('border')
    if(item.dataset.color==color) item.classList.add('border')
  })
}
function toggleDarkMode(){
  document.documentElement.classList.toggle('dark')
  if(document.documentElement.classList.contains('dark')) addToLocal('dark' , true)
  else addToLocal('dark' , false)
 
 }


