import { addToLocal, getToLocal } from "./funcs.js";

const paginationElem = document.querySelector("#products-pagination");
const productsContainer = document.querySelector("#products-container");
const categorySelectBox = document.querySelector("#category-select-box");
const priceSlider = document.getElementById("price-range-slider");
const maxPrice = document.getElementById("max-price");
const minPrice = document.getElementById("min-price");
const DiscountSlider = document.getElementById("Discount-range-slider");
const maxDiscount = document.getElementById("max-Discount");
const minDiscount = document.getElementById("min-Discount");
const pointSlider = document.getElementById("point-range-slider");
const maxPoint = document.getElementById("max-point");
const minPoint = document.getElementById("min-point");
const searchInputElem = document.getElementById("search-input");
const sortingSelectBox = document.getElementById("sort-select-box");
const sortingType = document.getElementById("sorting-type");

let page = 1;
let allProduct;
let filteredProduct;
let itemCount;

window.addEventListener("DOMContentLoaded", () => {
  getProduct()

});
async function getProduct() {
  let res = await fetch(`https://dummyjson.com/products?limit=200`);
  let response = await res.json();
  allProduct = response.products;
  getFilterParams();
}
 async function searchProduct(key) {
    let res = await fetch(`https://dummyjson.com/products/search?q=${key}`);
  let response = await res.json();
  console.log(response);
  
  allProduct = response.products;
  getFilterParams();

 }

function addProduct(list , page=1) {  
  console.log(list);
  if(list.length<=10) paginationElem.style.display='none'
  else paginationElem.style.display='flex'
  document.querySelector("#total-products-count").textContent = list.length;
  productsContainer.innerHTML = "";
  [...list].splice(page*10-10 , 10).forEach((item) => {
    productsContainer.innerHTML += `
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
     `;
  });
  
}

paginationElem.addEventListener("click", (e) => {
  if (e.target.nodeName === "BUTTON") {
   pagination(e)
   
  }
});

function pagination(e){
  if(e===1){
    page=1
       paginationElem
      .querySelectorAll("button")
      .forEach((elem) => elem.classList.remove("active-page"));

      paginationElem.querySelector(".prev").disabled = true;
      paginationElem.querySelector(".next").disabled = false;
      paginationElem.querySelector(".one").textContent = page;
      paginationElem.querySelector(".one").classList.add("active-page");
      paginationElem.querySelector(".one").disabled = true;
      paginationElem.querySelector(".two").textContent = page + 1;
      paginationElem.querySelector(".three").textContent = page + 2;
      return ''
  }
   paginationElem
      .querySelectorAll("button")
      .forEach((elem) => elem.classList.remove("active-page"));

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
    if (e.target.classList.contains("next")) {
      page++;
    }

    if (page == 1) {
      paginationElem.querySelector(".prev").disabled = true;
      paginationElem.querySelector(".next").disabled = false;
      paginationElem.querySelector(".one").textContent = page;
      paginationElem.querySelector(".one").classList.add("active-page");
      paginationElem.querySelector(".one").disabled = true;
      paginationElem.querySelector(".two").textContent = page + 1;
      paginationElem.querySelector(".three").textContent = page + 2;
    } else if (page == Math.ceil(itemCount / 10)) {
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
    if (Math.ceil(itemCount / 10) == 2) {
      //   paginationElem.querySelector(".three").disabled = true;
    }

   addProduct(filteredProduct , page);
}

noUiSlider.create(DiscountSlider, {
  start: [0, 99],
  connect: true,
  step: 1,
  direction: "ltr",
  range: {
    min: 0,
    max: 99,
  },
  format: {
    to: (value) => Math.round(value), // اعداد انگلیسی
    from: (value) => Number(value),
  },
});
DiscountSlider.noUiSlider.on("update", (values, handle) => {
  if (handle === 0) minDiscount.textContent = values[0];
  else maxDiscount.textContent =  values[1];
});

noUiSlider.create(priceSlider, {
  start: [0, 15000],
  connect: true,
  step: 1,
  direction: "ltr",
  range: {
    min: 0,
    max: 15000,
  },
  format: {
    to: (value) => Math.round(value), // اعداد انگلیسی
    from: (value) => Number(value),
  },
});
priceSlider.noUiSlider.on("update", (values, handle) => {
  if (handle === 0) minPrice.textContent = values[0];
  else maxPrice.textContent = values[1];
});
noUiSlider.create(pointSlider, {
  start: [0, 5],
  connect: true,
  step: 0.1,
  direction: "ltr",
  range: {
    min: 0,
    max: 5,
  },
});
pointSlider.noUiSlider.on("update", (values, handle) => {
  if (handle === 0)
    minPoint.textContent = values.innerText = parseFloat(values[0]).toFixed(1);
  else
    maxPoint.textContent = values.innerText = parseFloat(values[1]).toFixed(1);
});

pointSlider.noUiSlider.on("change", () => getFilterParams());
DiscountSlider.noUiSlider.on("change", () => getFilterParams());
priceSlider.noUiSlider.on("change", () => getFilterParams());
categorySelectBox.addEventListener('change' , ()=> getFilterParams())
searchInputElem.addEventListener('input' , (e)=> {
  let value = searchInputElem.value.trim()
  searchInputElem.value= value
  if(value.length>2) searchProduct(value)  
  else if(value.length <=1) getProduct() 
})
sortingSelectBox.addEventListener('change' , ()=> getFilterParams())
sortingType.addEventListener('change' , ()=> getFilterParams())

function getFilterParams() {
 
   filteredProduct = allProduct.filter(
    (p) =>
      p.price > Number(minPrice.textContent) &&
      p.price < Number(maxPrice.textContent) &&
      p.rating > Number(minPoint.textContent) &&
      p.rating < Number(maxPoint.textContent) &&
      p.discountPercentage > Number(minDiscount.textContent) &&
      p.discountPercentage < Number(maxDiscount.textContent) 
  );
  if(categorySelectBox.value!=='all'){    
    filteredProduct = filteredProduct.filter(p => p.category == categorySelectBox.value)
  }
  if(sortingSelectBox.value==='title'){
    if(sortingType.value==='asc'){
        filteredProduct = filteredProduct.sort((a , b) => a.title.localeCompare(b.title) )
     
    } else{
        filteredProduct = filteredProduct.sort((a , b) => b.title.localeCompare(a.title) )
      }
  }
  else{    
    if(sortingType.value==='asc'){
      filteredProduct = filteredProduct.sort((a , b) => a[sortingSelectBox.value] - b[sortingSelectBox.value] )
    }else{      
      filteredProduct = filteredProduct.sort((a , b) => b[sortingSelectBox.value] - a[sortingSelectBox.value] )
    }

  }
    
  
  itemCount = filteredProduct.length;
  addProduct(filteredProduct);
  pagination(1)
}
