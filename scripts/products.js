import { addToLocal, getToLocal } from "./funcs.js";

const paginationElem = document.querySelector('#products-pagination')
const productsContainer = document.querySelector('#products-container')
let page=1
let totalItem;
async function getProduct(page=1){
    productsContainer.innerHTML=''
    let res = await fetch(`https://dummyjson.com/products?limit=10&skip=${(page*10)-10}`)
    let response = await res.json()
    let products = response.products
    totalItem = response.total
    document.querySelector('#total-products-count').textContent=totalItem
    addProduct(products)
    console.log(response);
    
}
getProduct()


function addProduct(list){
  list.forEach(item => {
     productsContainer.innerHTML+=`
     <tr class="transition-colors hover:bg-gray-500/20 min-w-full flex items-center justify-between gap- p-1.5 md:p-3 ">
         <td class="text-center w-4/15">
             <a href="product.html?id=${item.id}" class="flex items-center gap-1.5  ">
                <span class="size-12 shrink-0 bg-gray-500/20 rounded-lg ">
                <img class="object-cover" src="${item.thumbnail}" alt="item-photo">
                </span>
                 <span dir="ltr" class="truncate">${item.title}</span>
             </a>
             
         </td>
         <td class="text-center w-2/15 truncate" dir="ltr">${item.category}</td>
         <td class="text-center w-2/15"> ${item.price} <span class="">$</span></td>
         <td class="text-center w-2/15"><span class="">%</span>${item.discountPercentage} </td>
         <td class="text-center w-1/15">${item.stock}</td>
         <td class="text-center w-2/15"> <i class="fa fa-star text-yellow-300 mx-1.5"> </i>${item.rating}</td>
         <td class="text-center w-2/15 centered gap-2">
             <button type="button" class="cursor-pointer text-base"><i class="fa fa-edit text-blue-500"></i></button>
             <button type="button" class="cursor-pointer text-base"><i class="fa fa-trash text-red-500"></i></button>
         </td>
     </tr>
     `
  });

    
}


paginationElem.addEventListener('click' , e=>{
    if(e.target.nodeName==='BUTTON'){
       paginationElem.querySelectorAll('button').forEach(elem=>elem.classList.remove('active-page'))
 
    if (e.target.classList.contains("prev") && page != 1) {
      page--;
    }
    if (e.target.classList.contains("one")) {
      page = Number(e.target.textContent);
    }
    if (e.target.classList.contains("two")) {
      page = Number(e.target.textContent);
    }
    if (e.target.classList.contains("three")) {
      page = Number(e.target.textContent);
    }
    if (e.target.classList.contains("next") ) {
      page++;
    }

     if (page == 1 ) {
      paginationElem.querySelector(".prev").disabled = true;
      paginationElem.querySelector(".next").disabled = false;
      paginationElem.querySelector(".one").textContent = page;
      paginationElem.querySelector(".one").classList.add("active-page");
      paginationElem.querySelector(".one").disabled = true
      paginationElem.querySelector(".two").textContent = page + 1;
      paginationElem.querySelector(".three").textContent = page + 2;
    } else if (page == Math.ceil(totalItem/10)) {
      paginationElem.querySelector(".prev").disabled = false;
      paginationElem.querySelector(".next").disabled = true;
      paginationElem.querySelector(".three").textContent = page;
      paginationElem.querySelector(".three").classList.add("active-page");
      paginationElem.querySelector(".three").disabled = true;
      paginationElem.querySelector(".two").textContent = page - 1;
      paginationElem.querySelector(".one").textContent = page - 2;
    } else {
      paginationElem.querySelector(".prev").disabled = false;
      paginationElem.querySelector(".next").disabled = false;
      paginationElem.querySelector(".two").textContent = page;
      paginationElem.querySelector(".two").classList.add("active-page");
      paginationElem.querySelector(".one").textContent = page - 1;
      paginationElem.querySelector(".three").textContent = page + 1;
    }
    if(Math.ceil(totalItem/10) ==2 ){
    //   paginationElem.querySelector(".three").disabled = true;

    }

    getProduct(page)
    }
})