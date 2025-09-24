import { addToLocal, getToLocal } from "./funcs.js";

const paginationElem = document.querySelector('#products-pagination')
const productsContainer = document.querySelector('#products-container')
const priceSlider = document.getElementById('price-range-slider');
const maxPrice = document.getElementById('max-price');
const minPrice = document.getElementById('min-price');
const DiscountSlider = document.getElementById('Discount-range-slider');
const maxDiscount = document.getElementById('max-Discount');
const minDiscount = document.getElementById('min-Discount');
const pointSlider = document.getElementById('point-range-slider');
const maxPoint = document.getElementById('max-point');
const minPoint = document.getElementById('min-point');

let page=1
let allProduct;
let totalItem;
async function getProduct(page=1){
  let res = await fetch(`https://dummyjson.com/products?limit=50`)
  let response = await res.json()
    allProduct = response.products
    totalItem = response.total
    document.querySelector('#total-products-count').textContent=totalItem
    addProduct(allProduct)
    console.log(response);
    // allProduct.forEach(elem=> console.log(elem.category))
    
  }
// getProduct()


function addProduct(list){
  list = list.sort((a,b)=> a.price - b.price)
  productsContainer.innerHTML=''
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
  if (handle === 0) minDiscount.textContent = '%'+ values[0];
  else maxDiscount.textContent = '%' + values[1];
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
  if (handle === 0) minPrice.textContent = '$'+ values[0];
  else maxPrice.textContent = '$' + values[1];
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
  if (handle === 0) minPoint.textContent =  values.innerText = parseFloat(values[0]).toFixed(1);
  else maxPoint.textContent =   values.innerText = parseFloat(values[1]).toFixed(1);
});

pointSlider.noUiSlider.on('change' , values => console.log(values)
)

DiscountSlider.noUiSlider.on('change' , values => console.log(values)
)
priceSlider.noUiSlider.on('change' , values => console.log(values)
)


//  beauty
//  fragrances
//  furniture
//   groceries
//  home-decoration
//   kitchen-accessories
//  laptops
//  mens-shirts
//  mens-shoes
//  mens-watches
//   mobile-accessories
//  motorcycle
//  skin-care
//   smartphones
//   sports-accessories