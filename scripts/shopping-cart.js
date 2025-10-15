import {
  addToLocal,
  getToLocal,
  showSwal,
  showTost,
  addToShoppingCard,
} from "./funcs.js";

window.deletItem = deletItem
// window.plusQuantity = plusQuantity
// window.minesQuantity = minesQuantity

const itemsWrapper = document.querySelector('#items-wrapper')

addItems()
function addItems(){
  let items =  getToLocal('shoppingCardItems')
  console.log(items);
  
  items.forEach(item => {
      itemsWrapper.innerHTML+=`
         <li data-id="${item.id}" class="flex flex-col divide-y divide-gray-500/50 text-xs sm:text-sm bg-[var(--box-color)] rounded-lg">
                    <div class="flex flex-wrap gap-y-3 items-start justify-between  p-3  font-[dana-num]">
                       <div  class="w-full flex items-stretch justify-between xs:justify-start gap-2 xs:w-[50%]">
                         <a href="product-details.html?id=${item.id}" class="size-19 sm:size-22 shrink-0 rounded-lg p-2 bg-[var(--bg-color)]">
                           <img class="object-cover" src="${item.thumbnail}" alt="${item.title}">
                           </a>
                         <div class=" flex flex-col gap-2 xs:gap-3 justify-center items-end text-left xs:text-center xs:items-start">
                            <a href="product-details.html?id=${item.id}" class="text-sm md:text-base">${item.title}</a>
                            <div class="flex border  border-gray-500/40 divide-x divide-gray-500/40 rounded-lg overflow-hidden">
                                <button type="button" class="h-8 w-9 text-center bg-[var(--bg-color)] minus material-shadow cursor-pointer" onclick="plusQuantity(this)">–</button>
                                <span  class=" h-8 w-9 centered bg-[var(--bg-color)] plus material-shadow">${item.quantity}</span>
                                <button type="button" class="h-8 w-9 text-center bg-[var(--bg-color)] plus material-shadow cursor-pointer" onclick="minesQuantity(this)">+</button>
                            </div>
                         </div>
                       </div>
                       <div class="flex flex-col gap-2 items-center"><span class="opacity-80">مانده: </span> <span class="text-sm sm:text-base">${item.stock}</span></div>
                       <div class="flex flex-col gap-2 items-center"><span class="opacity-80">تخفیف: </span> <span class="text-sm sm:text-base">${item.discountPercentage} %</span></div>
                       <div class="flex flex-col gap-2 items-center"><span class="opacity-80">قیمت: </span> <span class="text-sm sm:text-base">${item.price} $</span></div>
                    </div>
                    <div class="flex justify-between items-center px-3 py-2">
                        <button type="button" class="cursor-pointer py-1.5 px-2 transition-colors hover:bg-red-600 hover:text-white rounded-lg" onclick="deletItem(this)"><i class="fas fa-trash text-xs pointer-events-none"></i> حذف محصول</button>
                        <div class="flex items-center gap-2 "><span class="opacity-80">مجموع: </span> <span class="text-sm sm:text-base font-[dana-num]">${(item.price * item.quantity).toFixed(2)} $</span></div>
                    </div>
                </li>
      `
    
  });
  
}

function deletItem(elem){
  let li = elem.closest("li");
  let id = li.dataset.id;
  
  
}