import { addToLocal, getToLocal , showSwal , showTost , addToShoppingCard } from "./funcs.js";
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");

if(productId){
    console.log(3);
    
}