import { addToLocal, getToLocal , showSwal , showTost , addToShoppingCard } from "./funcs.js";
let product ;
const addToShoppingCardIdsBtn = document.getElementById('add-to-shopping-card-btn')
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");
let tabContent = document.querySelector('#tab-container')
 document.querySelector('#product-edit-btn').href = `product-add.html?id=${productId||115}`

async function getProduct(){
  try{
    let res = await fetch(`https://dummyjson.com/products/${productId || 115}`)
    product =await res.json()
    
    let infos= `
              <span class="text-base lg:text-lg">${product.title}</span>
            <div class="flex items-center justify-start gap-4 xs:gap-6 lg:gap-10">
              <div class=" "><i class="fa fa-star text-xs text-yellow-300"></i> <span class="font-[dana-num]">${product.rating}</span></div>
              <div><i class="fa fa-comment text-xs"></i> <span class="font-[dana-num]">${product.reviews.length}</span> نظر</div>
              <div><i class="fa fa-shopping-cart text-xs"></i> <span class="font-[dana-num]">${(product.reviews.length)*2+4}</span> سفارش</div>
            </div>
            <div class="xs:w-1/2  lg:w-full 2xl:w-1/2 grid grid-cols-2  gap-y-1.5 items-center">
              <span>دسته بندی:</span>  <span>${product.category}</span>
              <span>برند:</span>  <span  dir="ltr" class="text-end">${product.brand || '-----'}</span>
              <span>طول:</span>  <span class="font-[dana-num]">${product.dimensions.width ||'-----'} سانتی متر</span>
              <span>عرض:</span>  <span class="font-[dana-num]">${product.dimensions.height ||'-----'} سانتی متر</span>
              <span>ارتفاع:</span>  <span class="font-[dana-num]">${product.dimensions.depth ||'-----'} سانتی متر</span>
              <span>وزن:</span>  <span class="font-[dana-num]">${product.weight ||'-----'} کیلو گرم</span>
            </div>
            <div dir="ltr" class="border-t  border-gray-500/50 pt-3 flex flex-wrap  items-center gap-y-2 justify-end gap-x-6">
              <div ><i class="fa-solid fa-tag text-xs"></i> <span>${product.sku}</span></div>
              <div ><i class="fa-solid fa-award text-xs"></i> <span>${product.warrantyInformation}</span></div>
              <div ><i class="fa fa-truck text-xs"></i> <span>${product.shippingInformation}</span></div>
              <div ><i class="fa fa-rotate-left text-xs"></i> <span>${product.returnPolicy}</span></div>
            </div>
            <span>تعداد: <span class="font-[dana-num]">${product.stock}</span></span>
            <span>تخفیف: <span class="font-[dana-num]">${product.discountPercentage} %</span></span>
            <span>قیمت: <span class="font-[dana-num] text-base">${product.price} $</span></span>
    `
    addPhotos(product.images)
    document.querySelector('#product-infos-container').insertAdjacentHTML('afterbegin' , infos)
    tabContent.textContent=product.description
  } 
  catch{
    document.querySelector('section').innerHTML=`<img class="mx-auto" width="400" height="400" src="images/product-not-found.png" alt="">`
  }  
}
getProduct()

addToShoppingCardIdsBtn.onclick = ()=>{
  if(product.stock!==0 ) addToShoppingCard(Number(productId) || 115)
    else showTost('error' , 'موجودی این محصول به پایان رسیده است!')
}
function addPhotos(photos){
  if(photos.length>1){
 photos.forEach((elem) => {
      document.querySelector("#photos-swiper-wrapper").innerHTML += `
     <div class="swiper-slide overflow-hidden w-full h-full">
            <img class="object-cover xs:max-w-[350px] lg:max-w-[400px]  mx-auto aspect-square" src="${elem}" alt="">

          </div>
      `;
      document.querySelector("#thumbsSwiper-wrapper").innerHTML += `
       <div class="swiper-slide max-w-23 xs:max-w-30 aspect-square opacity-50 cursor-pointer">
            <img class="w-full object-cover" src="${elem}" alt="">
       </div>
      `;
    });
        
    const thumbs = new Swiper(".thumbsSwiper", {
      spaceBetween: 0,
      freeMode: false,
      centeredSlides: false ,
      slidesPerView: photos.length>5 ? photos.length : 5,
      watchSlidesProgress: true,
    });
    const photosSwiper = new Swiper("#photos-swiper", {
      spaceBetween: 10,
      loop:true ,
      navigation: {
        prevEl: ".photos-swiper-button-next",
        nextEl: ".photos-swiper-button-prev",
      },
      thumbs: {
        swiper: thumbs,
      },
    });
     }
     else{
        document.querySelector("#slider-btns").style.display='none'
        document.querySelector("#photos-swiper-wrapper").innerHTML += `
     <div class=" w-full">
            <img class="object-cover xs:max-w-[350px] lg:max-w-[400px]  mx-auto aspect-square" src="${photos[0]}" alt="">
          </div>
      `;
     }
}

const tabs = document.querySelector('#tabs')
tabs.addEventListener('click' , e=>{
  if(e.target.nodeName=== 'BUTTON'){
    tabs.querySelectorAll('button').forEach(elem=> elem.style.borderColor='transparent')
    e.target.style.borderColor='#6a7282'

    if(e.target.id=='description'){
     tabContent.textContent = product.description
    }
    if(e.target.id=='reviews'){
     tabContent.innerHTML= ''
     product.reviews.forEach(el=>{
      tabContent.innerHTML+=`
       <div class="inline-flex flex-col items-center p-3 w-full xs:w-auto">
              <div class=" w-full flex items-center justify-start gap-3.5">
                <span><img class="rounded-full" src="profile.png" width="35" height="35" alt="user-profile"></span>
               <div class="flex flex-col text-sm">
                 <span>${el.reviewerName}</span>
                  <div class="flex items-center gap-0.5 text-[10px] text-amber-400">
                    <i class="${el.rating < 1 ? 'text-gray-500' : ''} fa fa-star"></i>
                    <i class="${el.rating < 2 ? 'text-gray-500' : ''} fa fa-star"></i>
                    <i class="${el.rating < 3 ? 'text-gray-500' : ''} fa fa-star"></i>
                    <i class="${el.rating < 4 ? 'text-gray-500' : ''} fa fa-star"></i>
                    <i class="${el.rating < 5 ? 'text-gray-500' : ''} fa fa-star"></i>
                  </div>
               </div>
                             <span class="mr-auto text-xs text-left xs:hidden">${el.date.slice(0 , 10)}</span>

              </div>
              <div dir="ltr" class="w-full my-1 text-end xs:text-center">${el.comment}</div>
              <span class="hidden  justify-self-end text-xs xs:block text-left w-full">${el.date.slice(0 , 10)}</span>
              <span class="text-xs text-left w-full">${el.reviewerEmail}</span>
            </div>
      `
     })
    }
    if(e.target.id=='tags'){
     tabContent.textContent = product.tags.join(' , ')
    }
  }
  
})
