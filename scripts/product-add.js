import { addToLocal, getToLocal , showSwal , showTost , addToShoppingCard } from "./funcs.js";
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");
const name = document.querySelector('#name') 
const sku = document.querySelector('#sku') 
const category = document.querySelector('#category ')  
const brand = document.querySelector('#brand')  
const tags = document.querySelector('#tags')  
const tagsContainer= document.querySelector('#tags-container')  
const width = document.querySelector('#width')  
const height = document.querySelector('#height')  
const depth = document.querySelector('#depth')  
const weight = document.querySelector('#weight')  
const price = document.querySelector('#price')  
const stock = document.querySelector('#stock')  
const discount = document.querySelector('#discount ')  
const shipping = document.querySelector('#shipping')  
const warranty = document.querySelector('#warranty')  
const returnElem = document.querySelector('#return')



if(productId){
    console.log(3);
    
}
getItem()
async function getItem(){
 let res = await fetch(`https://dummyjson.com/products/${productId}`)
 let product =await res.json()
 console.log(product);
name.value= product.title
sku.value= product.sku
category.value= product.category
brand.value= product.brand
// tags.value= product.
// tagsContainer.value= product.
width.value= product.dimensions.width
height.value= product.dimensions.height
depth.value= product.dimensions.depth
weight.value= product.weight
price.value= product.price
stock.value= product.stock
discount.value= product.discountPercentage
shipping.value= product.shippingInformation
warranty.value= product.warrantyInformation
returnElem.value= product.returnPolicy
 
}