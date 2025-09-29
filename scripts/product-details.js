import { addToLocal, getToLocal , showSwal , showTost } from "./funcs.js";
let product ;
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");

async function getProduct(){
  let res = await fetch(`https://dummyjson.com/products/${productId}`)
  product =await res.json()

  let infos= `
            <span>${product.title}</span>
          <div class="flex items-center justify-start gap-4 xs:gap-6 lg:gap-10">
            <div class=" "><i class="fa fa-star text-xs text-yellow-300"></i> <span class="font-[dana-num]">${product.rating}</span></div>
            <div><i class="fa fa-comment text-xs"></i> <span class="font-[dana-num]">${product.reviews.length}</span> نظر</div>
            <div><i class="fa fa-shopping-cart text-xs"></i> <span class="font-[dana-num]">${(product.reviews.length)*2+4}</span> سفارش</div>
          </div>
          <div class="xs:w-1/2 md:w-full lg:w-1/2 grid grid-cols-2  gap-y-1.5 items-center">
            <span>دسته بندی:</span>  <span>${product.category}</span>
            <span>برند:</span>  <span  dir="ltr" class="text-end">${product.brand}</span>
            <span>طول:</span>  <span class="font-[dana-num]">${product.dimensions.width} سانتی متر</span>
            <span>عرض:</span>  <span class="font-[dana-num]">${product.dimensions.height} سانتی متر</span>
            <span>ارتفاع:</span>  <span class="font-[dana-num]">${product.dimensions.depth} سانتی متر</span>
            <span>وزن:</span>  <span class="font-[dana-num]">${product.weight} کیلو گرم</span>
          </div>
          <div>
          <span>توضیحات:</span>
          <p dir="ltr" class="">${product.description}</p>
          </div>
          <div dir="ltr" class="border-t  border-gray-500/50 pt-3 flex flex-wrap  items-center gap-y-2 justify-end gap-x-6">
            <div ><i class="fa-solid fa-tag text-xs"></i> <span>${product.sku}</span></div>
            <div ><i class="fa-solid fa-award text-xs"></i> <span>${product.warrantyInformation}</span></div>
            <div ><i class="fa fa-truck text-xs"></i> <span>${product.shippingInformation}</span></div>
            <div ><i class="fa fa-rotate-left text-xs"></i> <span>${product.returnPolicy}</span></div>
          </div>
          <span>تعداد: <span class="font-[dana-num]">${product.stock}</span></span>
          <span>تخفیف: <span class="font-[dana-num]">${product.discountPercentage}</span></span>
          <span>قیمت: <span class="font-[dana-num]">${product.price}</span></span>
  `
  addPhotos(product.images)
  document.querySelector('#product-infos-container').insertAdjacentHTML('afterbegin' , infos)
  document.querySelector('#product-tags').innerHTML+= product.tags.join(' , ')
}
getProduct()


function addPhotos(photos){
  console.log(photos);
  if(photos.length>1){

 
 photos.forEach((elem) => {
      document.querySelector("#photos-swiper-wrapper").innerHTML += `
     <div class="swiper-slide w-full">
            <img class="object-cover overflow-hidden " src="${elem}" alt="">

          </div>
      `;
      document.querySelector("#thumbsSwiper-wrapper").innerHTML += `
       <div class="swiper-slide w-full opacity-30">
            <a href="javascript:void(0)">
            <img class="w-full object-cover" src="${elem}" alt="">
            </a>
       </div>
      `;
    });
    const thumbs = new Swiper(".thumbsSwiper", {
      spaceBetween: 10,
      slidesPerView: photos.length,
      centeredSlides: true,
      watchSlidesProgress: true,
    });
    const photosSwiper = new Swiper("#photos-swiper", {
      spaceBetween: 10,
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
            <img class="object-cover overflow-hidden " src="${photos[0]}" alt="">

          </div>
      `;
     }
}