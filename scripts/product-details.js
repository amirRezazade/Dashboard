import { addToLocal, getToLocal , showSwal , showTost } from "./funcs.js";
let product ;
async function getProduct(){
  let res = await fetch('https://dummyjson.com/products/7')
  product =await res.json()
  console.log(product);
  

}
getProduct()
