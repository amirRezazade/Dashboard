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

document.querySelector('#submit-btn').addEventListener('click' , ()=>{
    30 < name.value.trim() < 3 ?  name.classList.add('test') : name.classList.remove('test')


// window.addEventListener('click' , ()=>{
//     const content = editorValue.getData();
//   console.log(content);
    
})

name.addEventListener("input", () => {


});
