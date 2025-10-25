import { showSwal, showTost } from "./funcs.js";

const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get("id");
if (!userId) window.location.search = "id=1";
const infoWrapper = document.querySelector("#info-container");
const cardWrapper = document.querySelector("#card-container");
let infoBtn = document.querySelector("#info");
let cardBtn = document.querySelector("#cart");
const userDeletBtn = document.querySelector("#user-delet-btn");

let isHaveCart = false;

document.querySelector("#user-edit-btn").href = `user-add.html?id=${userId}`;
window.addEventListener("DOMContentLoaded", getUser);

async function getUser() {
  let res = await fetch(`https://dummyjson.com/users/${userId || 1}`);
  let data = await res.json();
  document.querySelector("#user-img").src = data.image;
  document.querySelector("#user-name").textContent = data.firstName + data.lastName;
  document.querySelector("#user-gender").textContent = data.gender == "male" ? "مرد" : "زن";
  document.querySelector("#user-email").textContent = data.email;
  document.querySelector("#user-phone").textContent = data.phone;
  document.querySelector("#user-username").textContent = data.username;
  document.querySelector("#user-birthDate").textContent = data.birthDate;
  addInfos(data);
}

function addInfos(data) {
  infoWrapper.innerHTML = `
                  <div class="flex flex-col gap-4 mt-7">
                    <span class="text-base font-bold">نشانی ها</span>
                    <div class="flex flex-col xs:flex-row items-start gap-y-3 xl:w-2/3">
                        <div class="grow flex flex-col gap-3">
                            <span class=" font-bold my-3 block">محل اقامت</span>
                            <div class="flex items-center gap-1"><span>کشور:</span> <span>${data.address.country}</span></div>
                            <div class="flex items-center gap-1"><span>شهر:</span> <span>${data.address.city}</span></div>
                            <div class="flex items-center gap-1"><span>آدرس:</span> <span>${data.address.address}</span></div>
                            <div class="flex items-center gap-1"><span>کد پستی:</span> <span class="font-[dana-num]">${data.address.postalCode}</span></div>
                        </div>
                        <div class="grow flex flex-col gap-3">
                            <span class=" font-bold my-3 block">محل کار</span>
                           <div class="flex items-center gap-1"><span>کشور:</span> <span>${data.company.address.country}</span></div>
                            <div class="flex items-center gap-1"><span>شهر:</span> <span>${data.company.address.city}</span></div>
                            <div class="flex items-center gap-1"><span>آدرس:</span> <span>${data.company.address.address}</span></div>
                            <div class="flex items-center gap-1"><span>کد پستی:</span> <span class="font-[dana-num]">${data.company.address.postalCode}</span></div>
                        </div>
                    </div>
                    <div>
                      <span class="text-base font-bold my-4 block">کارت های بانکی</span>
                        <div class="flex flex-col divide-y divide-gray-500/50">
                            <div class="flex items-center gap-1 xs:gap-4 p-3 ">
                                <img alt="visa" src="images/visa-img.png">
                                <div>
                                    <div class="flex items-center mb-1.5 text-xs sm:text-sm">
                                        <div class="font-semibold ">${data.firstName}${data.lastName} ***${data.bank.cardNumber.slice(12, 16)}</div>
                                        <div class=" rounded-md border-0 mx-2">
                                            <span class="bg-[var(--active-color)]/20 text-[var(--active-color)] text-xs py-1 px-2 rounded-md "> اصلی </span>
                                        </div>
                                    </div>
                                    <span>منقضی شده ${data.bank.cardExpire}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
`;
}

async function addCard() {
  let res = await fetch(`https://dummyjson.com/users/${11}/carts`);
  let data = await res.json();
  let cart = data.carts[0];
  let products = data.carts[0].products;
  isHaveCart = true;
  if (products.length) {
    cardWrapper.innerHTML = `
                  <ul class="grow my-6 min-w-100 overflow-auto max-h-[370px]">
                      <div class="flex justify-between items-center border-b border-gray-500/50 p-2 ">
                        <span class="w-3/7 text-center">اسم</span>
                        <span class="w-1/7 text-center">تخفیف</span>
                        <span class="w-1/7 text-center">تعداد</span>
                        <span class="w-1/7 text-center">قیمت</span>
                        <span class="w-1/7 text-center">کل</span>
                      </div>
                     ${products
                       .map((elem) => {
                         return `
                        <li class="flex justify-between items-center transition-colors hover:bg-gray-500/20 p-1.5 md:px-2 rounded-lg">
                        <span class="flex items-center gap-2.5 w-3/7">
                          <a href="product-details.html?id=${elem.id}" class="size-11 md:size-13 p-1 bg-[var(--bg-color)]  rounded-full"><img class="object-cover  rounded-full " src="${elem.thumbnail}" alt="${elem.title}"></a>
                          <a href="product-details.html?id=${elem.id}">${elem.title}</a>
                        </span>
                        <span class="w-1/7 text-center">${elem.discountPercentage} %</span>
                        <span class="w-1/7 text-center">${elem.quantity}</span>
                        <span class="w-1/7 text-center">${elem.price} $</span>
                        <span class="w-1/7 text-center">${elem.total.toFixed(2)} $</span>
                      </li>
                       `;
                       })
                       .join("")}
                    </ul>
                    <div class="flex justify-between flex-wrap gap-2 p-3 bg-[var(--bg-color)]/80 rounded-lg font-[dana-num]">
                      <div>
                        <span>انواع محصول:</span>
                        <span >${cart.totalProducts}</span>
                      </div>
                      <div>
                        <span>تعداد محصول:</span>
                        <span >${cart.totalQuantity}</span>
                      </div>
                      <div>
                        <span>تخفیف خورده:</span>
                        <span >${cart.discountedTotal} $</span>
                      </div>
                      <div>
                        <span>مجموع:</span>
                        <span >${cart.total} $</span>
                      </div>
                    </div>
    `;
  } else {
    cardWrapper.innerHTML = `<div class=" my-5 block h-auto max-h-[200px] sm:max-h-[350px] centered overflow-hidden"><img class="object-cover aspect-square max-w-sm sm:max-w-xl" src="images/item-notfound.png" alt="item-notfound"></div>`;
  }
}
cardBtn.addEventListener("click", () => {
  isHaveCart ? "" : addCard();
  infoBtn.classList.remove("active-tab");
  cardBtn.classList.add("active-tab");
  infoWrapper.classList.add("hidden");
  cardWrapper.classList.remove("hidden");
});
infoBtn.addEventListener("click", () => {
  cardBtn.classList.remove("active-tab");
  infoBtn.classList.add("active-tab");
  cardWrapper.classList.add("hidden");
  infoWrapper.classList.remove("hidden");
});

userDeletBtn.addEventListener("click", () => {
  showSwal("حذف کاربر", "آیا میخواهید این کاربر را حذف کنید؟", "warning", true, "حذف").then((data) => {
    if (data.isConfirmed) {
      fetch(`https://dummyjson.com/users/${userId}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then(() => {
          setTimeout(() => {
            window.location.href = "index.html";
          }, 2000);
          showTost("success", "کاربر با موفقیت حذف شد!");
        })
        .catch(() => showTost("error", "مشکلی پیش آمد. دوباره امتحان کنید!"));
    }
  });
});
