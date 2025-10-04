import {
  addToLocal,
  getToLocal,
  showSwal,
  showTost,
  addToShoppingCard,
} from "./funcs.js";
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");
const name = document.querySelector("#name");
const sku = document.querySelector("#sku");
const category = document.querySelector("#category ");
const brand = document.querySelector("#brand");
const tags = document.querySelector("#tags");
const tagsContainer = document.querySelector("#tags-container");
const width = document.querySelector("#width");
const height = document.querySelector("#height");
const depth = document.querySelector("#depth");
const weight = document.querySelector("#weight");
const price = document.querySelector("#price");
const stock = document.querySelector("#stock");
const discount = document.querySelector("#discount ");
const shipping = document.querySelector("#shipping");
const warranty = document.querySelector("#warranty");
const returnElem = document.querySelector("#return");

const requiredInputs = document.querySelectorAll('input[required]');



let editorValue;
      ClassicEditor
  .create(document.querySelector('#editor'), {
    language: {
      ui: 'fa',      
      content: 'fa'    
    }
  })
  .then(editor => {
   editorValue = editor
    editor.editing.view.change(writer => {
      writer.setAttribute('dir', 'rtl', editor.editing.view.document.getRoot());
      
    });
  })
  .catch(error => {
    console.error(error);
  });
if (productId) {
  getItem();
}
async function getItem() {
  let res = await fetch(`https://dummyjson.com/products/${productId}`);
  let product = await res.json();
  console.log(product);

  name.value = product.title || "";
  sku.value = product.sku || "";
  category.value = product.category || "all";
  brand.value = product.brand || "";
  width.value = product.dimensions.width || "";
  height.value = product.dimensions.height || "";
  depth.value = product.dimensions.depth || "";
  weight.value = product.weight || "";
  price.value = product.price || "";
  stock.value = product.stock || 0;
  discount.value = product.discountPercentage || 0;
  discount.nextElementSibling.textContent = product.discountPercentage + '%' || 0 + '%';
  shipping.value = product.shippingInformation || "all";
  warranty.value = product.warrantyInformation || "No warranty";
  returnElem.value = product.returnPolicy || "No return policy";
  editorValue.setData(`${product.description}`) || '';
  product.tags.forEach(tag => tagsContainer.innerHTML+= ` <div class="flex items-center  divide-x divide-gray-300 bg-[var(--active-color)] text-white  text-xs overflow-hidden rounded-r-full"><span class="p-2">${tag}</span> <button type="button" class="p-2 cursor-pointer centered" onclick="parentElement.remove()">X</button></div>` || '');


}

tags.addEventListener('keyup' , e=>{
  if(e.code=== 'Enter' && tags.value.trim()  ){
    if(tagsContainer.childElementCount < 8){
        tagsContainer.nextElementSibling.classList.add('hidden')
        tagsContainer.innerHTML+=`
         <div class="flex items-center  divide-x divide-gray-300 bg-[var(--active-color)] text-white  text-xs overflow-hidden rounded-r-full"><span class="p-2">${tags.value.trim()}</span> <button type="button" class="p-2 cursor-pointer centered" onclick="parentElement.remove()">X</button></div>`
         tags.value=''
         console.log(tagsContainer.childElementCount);

    }else tagsContainer.nextElementSibling.classList.remove('hidden')
  }
  
})

// start dropzone library 
Dropzone.autoDiscover = false;
const gallery = new Dropzone("#product-gallery", {
  url: "#", 
  autoProcessQueue: false,
  maxFiles: 5,
  maxFilesize: 1,
  acceptedFiles: "image/*",
  dictDefaultMessage: "📸 عکس های محصول را اینجا بکشید یا کلیک کنید برای انتخاب",
  addRemoveLinks: true,
  dictRemoveFile: "حذف تصویر",
  dictFileTooBig: "حجم تصویر زیاد است (حداکثر: {{maxFilesize}}MB)",
  thumbnailWidth: 120,
  thumbnailHeight: 120,
});
Dropzone.autoDiscover = false;
const thumbnail = new Dropzone("#product-thumbnail", {
  url: "#", 
  autoProcessQueue: false,
  maxFiles: 1,
  maxFilesize: 1,
  acceptedFiles: "image/*",
  dictDefaultMessage: "📸 عکس  محصول را اینجا بکشید یا کلیک کنید برای انتخاب",
  addRemoveLinks: true,
  dictRemoveFile: "حذف تصویر",
  dictFileTooBig: "حجم تصویر زیاد است (حداکثر: {{maxFilesize}}MB)",
  thumbnailWidth: 120,
  thumbnailHeight: 120,
});

// finish dropzone library 



document.querySelector('#submit-btn').addEventListener('click' , ()=>{
formValidation() 


})


function formValidation(){
  if(price.value.length==0 || price.value <1) {
    price.parentElement.nextElementSibling.classList.remove('hidden')
    price.parentElement.classList.replace('border-transparent' , 'border-red-700')
  }
  else{
    price.parentElement.nextElementSibling.classList.add('hidden')
    price.parentElement.classList.replace( 'border-red-700' , 'border-transparent')
  }
requiredInputs.forEach(elem=>{
  if(!elem.checkValidity() ) {
   if(elem.nextElementSibling) {
     elem.nextElementSibling.classList.remove('hidden')
     elem.classList.replace('border-transparent' , 'border-red-700')
    }
  }else{
     if(elem.nextElementSibling) {
     elem.nextElementSibling.classList.add('hidden')
      elem.classList.replace( 'border-red-700' ,'border-transparent' )
    }
  }
})

  document.querySelectorAll('select[required]').forEach(select=>{
    if(select.value==='all') {
      select.nextElementSibling.classList.remove('hidden') 
      select.classList.add('border-red-600')
    }else{
      select.nextElementSibling.classList.add('hidden') 
      select.classList.remove('border-red-600')

    }
  })
  if(editorValue.getData()=== ''){
    document.querySelector('.ck-editor').style.border='1px solid red'
    document.querySelector('#editor-alert').classList.remove('hidden')
  }else{
    document.querySelector('.ck-editor').style.border=''
    document.querySelector('#editor-alert').classList.add('hidden')
  }
}
