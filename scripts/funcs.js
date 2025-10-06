function addToLocal(key , value){
    localStorage.setItem(key , JSON.stringify(value))
}
function getToLocal(key) {
  return JSON.parse(localStorage.getItem(key));
}

function showSwal(title, text, icon, cancel, confirmText) {
  return Swal.fire({
    title: `${title}`,
    text: `${text}`,
    icon: `${icon}`,
    showCancelButton: cancel,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: `${confirmText}`,
    cancelButtonText: "انصراف",
  });
}
function showTost(icon, text) {
  Swal.fire({
    toast: true,
    position: "bottom-end",
    icon: icon,
    title: text,
    showConfirmButton: false,
    timer: 3500,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
    customClass: {
      popup: "my-toast",
    },
  });
}
async function addToShoppingCard(id){
  let list = getToLocal('shoppingCardIds')
  if(list.indexOf(id)== -1){
  list.push(id)
  addToLocal('shoppingCardIds' ,list)
  let getItem = await fetch(`https://dummyjson.com/products/${id}?select=title,price,id,thumbnail`)
  let item = await getItem.json()
  item.quantity= 1;  
  let itemList = getToLocal('shoppingCardItems') 
  itemList.push(item)
  addToLocal('shoppingCardItems' , itemList)
   showTost('success' , 'محصول به سبد خرید شما اضافه شد. ')
  }
  else  showTost('error' , 'محصول در سبد خرید شما وجود دارد! ')
}

const animatePulse = `
<div class="flex items-center justify-between animate-pulse py-5 px-15">
    <div class="w-4/15 h-3 rounded  flex items-center gap-1.5">
      <div class="size-10 rounded-full bg-gray-500/50"></div>
      <div class="h-3 w-25 rounded bg-gray-500/50"></div>
    </div>
    <div class="w-15 h-3 rounded bg-gray-500/50"></div>
    <div class="w-15 h-3 rounded bg-gray-500/50"></div>
    <div class="w-15 h-3 rounded bg-gray-500/50"></div>
    <div class="w-15 h-3 rounded bg-gray-500/50"></div>
    <div class="w-15 h-3 rounded bg-gray-500/50"></div>
    <div class="w-15 h-3 rounded bg-gray-500/50"></div>
  </div>
  <div class="flex items-center justify-between animate-pulse py-5 px-15">
    <div class="w-4/15 h-3 rounded  flex items-center gap-1.5">
      <div class="size-10 rounded-full bg-gray-500/50"></div>
      <div class="h-3 w-25 rounded bg-gray-500/50"></div>
    </div>
    <div class="w-15 h-3 rounded bg-gray-500/50"></div>
    <div class="w-15 h-3 rounded bg-gray-500/50"></div>
    <div class="w-15 h-3 rounded bg-gray-500/50"></div>
    <div class="w-15 h-3 rounded bg-gray-500/50"></div>
    <div class="w-15 h-3 rounded bg-gray-500/50"></div>
    <div class="w-15 h-3 rounded bg-gray-500/50"></div>
  </div>
  <div class="flex items-center justify-between animate-pulse py-5 px-15">
    <div class="w-4/15 h-3 rounded  flex items-center gap-1.5">
      <div class="size-10 rounded-full bg-gray-500/50"></div>
      <div class="h-3 w-25 rounded bg-gray-500/50"></div>
    </div>
    <div class="w-15 h-3 rounded bg-gray-500/50"></div>
    <div class="w-15 h-3 rounded bg-gray-500/50"></div>
    <div class="w-15 h-3 rounded bg-gray-500/50"></div>
    <div class="w-15 h-3 rounded bg-gray-500/50"></div>
    <div class="w-15 h-3 rounded bg-gray-500/50"></div>
    <div class="w-15 h-3 rounded bg-gray-500/50"></div>
  </div>
  <div class="flex items-center justify-between animate-pulse py-5 px-15">
    <div class="w-4/15 h-3 rounded  flex items-center gap-1.5">
      <div class="size-10 rounded-full bg-gray-500/50"></div>
      <div class="h-3 w-25 rounded bg-gray-500/50"></div>
    </div>
    <div class="w-15 h-3 rounded bg-gray-500/50"></div>
    <div class="w-15 h-3 rounded bg-gray-500/50"></div>
    <div class="w-15 h-3 rounded bg-gray-500/50"></div>
    <div class="w-15 h-3 rounded bg-gray-500/50"></div>
    <div class="w-15 h-3 rounded bg-gray-500/50"></div>
    <div class="w-15 h-3 rounded bg-gray-500/50"></div>
  </div>
  <div class="flex items-center justify-between animate-pulse py-5 px-15">
    <div class="w-4/15 h-3 rounded  flex items-center gap-1.5">
      <div class="size-10 rounded-full bg-gray-500/50"></div>
      <div class="h-3 w-25 rounded bg-gray-500/50"></div>
    </div>
    <div class="w-15 h-3 rounded bg-gray-500/50"></div>
    <div class="w-15 h-3 rounded bg-gray-500/50"></div>
    <div class="w-15 h-3 rounded bg-gray-500/50"></div>
    <div class="w-15 h-3 rounded bg-gray-500/50"></div>
    <div class="w-15 h-3 rounded bg-gray-500/50"></div>
    <div class="w-15 h-3 rounded bg-gray-500/50"></div>
  </div>
  `;


export{ addToLocal , getToLocal , showSwal , showTost , addToShoppingCard , animatePulse}