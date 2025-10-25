import { addToLocal, getToLocal, showSwal, showTost } from "./funcs.js";

window.deletItem = deletItem;
window.quantityControl = quantityControl;

const itemsWrapper = document.querySelector("#items-wrapper");
const itemsCountWrapper = document.querySelector("#item-count");
const navShoppingCart = document.querySelector("#shopping-card-container");
addItems();
function addItems() {
  itemsWrapper.innerHTML = "";
  let items = getToLocal("shoppingCardItems");
  if (items.length === 0) {
    document.querySelector("section").innerHTML = `<div class="col-span-12 my-5 flex flex-col justify-center max-w-[500px] mx-auto">
    <img class="object-cover " src="images/empty-cart.svg" alt"">
    <div class="flex justify-between my-5">سبد خرید شما خالی است           
          <a href="products.html" class="py-1.5 px-3 text-sm text-white rounded-sm bg-[var(--active-color)]/80 hover:bg-[var(--active-color)]">افزودن محصول</a>
    </div>
    </div>`;
  } else {
    items.forEach((item) => {
      itemsWrapper.innerHTML += `
           <li data-id="${item.id}" class="flex flex-col divide-y divide-gray-500/50 text-xs sm:text-sm bg-[var(--box-color)] rounded-lg transition-opacity duration-500">
                      <div class="flex flex-wrap gap-y-3 items-start justify-between  p-3  font-[dana-num]">
                         <div  class="w-full flex items-stretch justify-between xs:justify-start gap-2 xs:w-[50%]">
                           <a href="product-details.html?id=${item.id}" class="size-19 sm:size-22 shrink-0 rounded-lg p-2 bg-[var(--bg-color)]">
                             <img class="object-cover" src="${item.thumbnail}" alt="${item.title}">
                             </a>
                           <div class=" flex flex-col gap-2 xs:gap-3 justify-center items-end text-left xs:text-center xs:items-start">
                              <a href="product-details.html?id=${item.id}" class="text-sm md:text-base">${item.title}</a>
                              <div class="flex border  border-gray-500/40 divide-x divide-gray-500/40 rounded-lg overflow-hidden">
                                  <button type="button" class="h-8 w-9 text-center bg-[var(--bg-color)] minus cursor-pointer"  onclick="quantityControl(this)">–</button>
                                  <span  class=" h-8 w-9 centered bg-[var(--bg-color)] plus">${item.quantity}</span>
                                  <button type="button" class="h-8 w-9 text-center bg-[var(--bg-color)] plus cursor-pointer"  onclick="quantityControl(this)">+</button>
                              </div>
                           </div>
                         </div>
                         <div class="flex flex-col gap-2 items-center"><span class="opacity-80">مانده: </span> <span class="text-sm sm:text-base">${item.stock}</span></div>
                         <div class="flex flex-col gap-2 items-center"><span class="opacity-80">تخفیف: </span> <span class="text-sm sm:text-base">${item.discountPercentage} %</span></div>
                         <div class="flex flex-col gap-2 items-center"><span class="opacity-80">قیمت: </span> <span class="text-sm sm:text-base">${item.price} $</span></div>
                      </div>
                      <div class="flex justify-between items-center px-3 py-2">
                          <button type="button" class="cursor-pointer py-1.5 px-2 transition-colors hover:bg-red-600 hover:text-white rounded-lg" onclick="deletItem(this)"><i class="fas fa-trash text-xs pointer-events-none"></i> حذف محصول</button>
                          <div class="flex items-center gap-2 "><span class="opacity-80">مجموع: </span> <span class="text-sm sm:text-base font-[dana-num] total-price">${(item.price * item.quantity).toFixed(2)} $</span></div>
                      </div>
                  </li>
        `;
      itemsCountWrapper.textContent = `(${items.length} مورد)`;
    });
    cartTotal();
  }
}

function deletItem(elem) {
  showSwal("حذف از سبد خرید", "آیا میخواهید این محصول را از سبد خرید خود حذف کنید؟", "warning", true, "حذف").then((data) => {
    if (data.isConfirmed) {
      let li = elem.closest("li");
      let id = li.dataset.id;
      let shoppingCartItems = getToLocal("shoppingCardItems");
      let shoppingCardIds = getToLocal("shoppingCardIds");
      let itemsIndex = shoppingCartItems.findIndex((e) => e.id == id);
      let idsndex = shoppingCardIds.findIndex((e) => e.id == id);
      shoppingCartItems.splice(itemsIndex, 1);
      shoppingCardIds.splice(idsndex, 1);
      addToLocal("shoppingCardItems", shoppingCartItems);
      addToLocal("shoppingCardIds", shoppingCardIds);
      li.classList.add("opacity-0");
      setTimeout(() => li.remove(), 500);
      itemsCountWrapper.textContent = `(${shoppingCartItems.length} مورد)`;
      cartTotal();
      showTost("success", "محصول از سبد خرید شما حذف شد!");
      if (shoppingCartItems.length === 0) {
        document.querySelector("section").innerHTML = `<div class="col-span-12 my-5 flex flex-col justify-center max-w-[500px] mx-auto">
    <img class="object-cover " src="images/empty-cart.svg" alt"">
    <div class="flex justify-between my-5">سبد خرید شما خالی است           
          <a href="products.html" class="py-1.5 px-3 text-sm text-white rounded-sm bg-[var(--active-color)]/80 hover:bg-[var(--active-color)]">افزودن محصول</a>
    </div>
    </div>`;
      }
    }
  });
}

function quantityControl(elem) {
  let li = elem.closest("li");
  let id = li.dataset.id;
  let shoppingCartItems = getToLocal("shoppingCardItems");
  let itemsIndex = shoppingCartItems.findIndex((e) => e.id == id);
  let item = shoppingCartItems[itemsIndex];

  if (elem.classList.contains("minus") && item.quantity > 1) {
    shoppingCartItems[itemsIndex].quantity = shoppingCartItems[itemsIndex].quantity - 1;
    elem.nextElementSibling.textContent = shoppingCartItems[itemsIndex].quantity;
  }
  if (elem.classList.contains("plus") && item.quantity < item.stock) {
    shoppingCartItems[itemsIndex].quantity = shoppingCartItems[itemsIndex].quantity + 1;
    elem.previousElementSibling.textContent = shoppingCartItems[itemsIndex].quantity;
  }
  addToLocal("shoppingCardItems", shoppingCartItems);
  li.querySelector(".total-price").textContent = `${(item.price * item.quantity).toFixed(2)} $`;
  cartTotal();
}
function cartTotal() {
  let cart = getToLocal("shoppingCardItems");
  let price = 0;
  let totalDiscount = 0;
  cart.forEach((item) => {
    let t = item.price * item.quantity;
    price += t;

    let discountPerItem = (item.discountPercentage * item.price) / 100;
    let totalItemDiscount = discountPerItem * item.quantity;
    totalDiscount += totalItemDiscount;
  });

  let tax = (price * 0.09).toFixed(2);
  let Transportation = (price * 0.05).toFixed(2);
  let cartTotal = Number(price) + Number(tax) + Number(Transportation);
  document.querySelector("#cart-price").textContent = `${price.toFixed(2)} $`;
  document.querySelector("#cart-discount").textContent = `${totalDiscount.toFixed(2)} $`;
  document.querySelector("#cart-Transportation").textContent = `${Transportation} $`;
  document.querySelector("#cart-taxes").textContent = `${tax} $`;
  document.querySelector("#cart-total").textContent = `${cartTotal.toFixed(2)} $`;
}

navShoppingCart.addEventListener("click", (e) => {
  if (e.target.nodeName === "BUTTON") addItems();
});
