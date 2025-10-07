import { addToLocal, getToLocal , showSwal , showTost , animatePulse } from "./funcs.js";
window.removeProduct = removeProduct;
window.editProduct = editProduct;
const paginationElem = document.querySelector("#products-pagination");
const productsContainer = document.querySelector("#products-container");
const categorySelectBox = document.querySelector("#category-select-box");
const priceSlider = document.getElementById("price-range-slider");
const maxPrice = document.getElementById("max-price");
const minPrice = document.getElementById("min-price");
const DiscountSlider = document.getElementById("Discount-range-slider");
const maxDiscount = document.getElementById("max-Discount");
const minDiscount = document.getElementById("min-Discount");
const pointSlider = document.getElementById("point-range-slider");
const maxPoint = document.getElementById("max-point");
const minPoint = document.getElementById("min-point");
const searchInputElem = document.getElementById("search-input");
const sortingSelectBox = document.getElementById("sort-select-box");
const sortingType = document.getElementById("sorting-type");

let page = 1;
let allProduct;
let filteredProduct;
let itemCount;

window.addEventListener("DOMContentLoaded", () => {
  getProduct();
});
async function getProduct() {
  productsContainer.innerHTML = animatePulse;
  let res = await fetch(`https://dummyjson.com/products?limit=200`);
  let response = await res.json();
  allProduct = response.products;
  getFilterParams();
}
async function searchProduct(key) {
  productsContainer.innerHTML = animatePulse;
  let res = await fetch(`https://dummyjson.com/products/search?q=${key}`);
  let response = await res.json();
  allProduct = response.products;
  getFilterParams();
}

function addProduct(list, page = 1) {
  productsContainer.innerHTML = "";
  if (list.length == 0)
    productsContainer.innerHTML = `          <div class=" my-5 block h-[150px] md:h-[300px]  bg-[url('../images/product-not-found.png')]  bg-contain bg-center bg-no-repeat "></div>`;
  if (list.length <= 10) paginationElem.style.display = "none";
  else paginationElem.style.display = "flex";
  document.querySelector("#total-products-count").textContent = list.length;
  [...list].splice(page * 10 - 10, 10).forEach((item) => {
    productsContainer.innerHTML += `
     <tr class="transition-colors hover:bg-gray-500/20 min-w-full flex items-center justify-between gap- p-1.5 md:p-3 ">
         <td class="text-center w-4/15 max-w-4/15">
             <a href="product-details.html?id=${item.id}" class="flex items-center gap-1.5  ">
                <span class="size-12 shrink-0 bg-gray-500/20 rounded-lg ">
                <img class="object-cover" src="${item.thumbnail}" alt="item-photo">
                </span>
                 <span dir="ltr" class="truncate">${item.title}</span>
             </a>
             
         </td>
         <td class="text-center w-2/15 truncate" dir="ltr">${item.category}</td>
         <td class="text-center w-2/15"> ${Math.floor(item.price * 10) / 10} <span class="">$</span></td>
         <td class="text-center w-2/15"><span class="">%</span>${Math.floor(item.discountPercentage * 10) / 10} </td>
         <td class="text-center w-1/15">${item.stock}</td>
         <td class="text-center w-2/15"> <i class="fa fa-star text-yellow-300 mx-1.5"> </i>${Math.floor(item.rating * 10) / 10}</td>
         <td class="text-center w-2/15 centered gap-2">
             <button onclick="editProduct(${item.id})" type="button" class="cursor-pointer text-base"><i class="fa fa-edit text-blue-500"></i></button>
             <button onclick="removeProduct(${item.id})" type="button" class="cursor-pointer text-base"><i class="fa fa-trash text-red-500"></i></button>
         </td>
     </tr>
     `;
  });
}

paginationElem.addEventListener("click", (e) => {
  if (e.target.nodeName === "BUTTON") {
    pagination(e);
  }
});

function pagination(e) {
  if (e === 1) {
    page = 1;
    paginationElem
      .querySelectorAll("button")
      .forEach((elem) => elem.classList.remove("active-page"));

    paginationElem.querySelector(".prev").disabled = true;
    paginationElem.querySelector(".next").disabled = false;
    paginationElem.querySelector(".one").textContent = page;
    paginationElem.querySelector(".one").classList.add("active-page");
    paginationElem.querySelector(".one").disabled = true;
    paginationElem.querySelector(".two").textContent = page + 1;
    paginationElem.querySelector(".three").textContent = page + 2;
    return "";
  }
  paginationElem
    .querySelectorAll("button")
    .forEach((elem) => elem.classList.remove("active-page"));

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
  if (e.target.classList.contains("next")) {
    page++;
  }

  if (page == 1) {
    paginationElem.querySelector(".prev").disabled = true;
    paginationElem.querySelector(".next").disabled = false;
    paginationElem.querySelector(".one").textContent = page;
    paginationElem.querySelector(".one").classList.add("active-page");
    paginationElem.querySelector(".one").disabled = true;
    paginationElem.querySelector(".two").textContent = page + 1;
    paginationElem.querySelector(".three").textContent = page + 2;
  } else if (page == Math.ceil(itemCount / 10)) {
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
    paginationElem.querySelector(".one").disabled = false;
    paginationElem.querySelector(".two").disabled = false;
    paginationElem.querySelector(".three").disabled = false;
    paginationElem.querySelector(".two").textContent = page;
    paginationElem.querySelector(".two").classList.add("active-page");
    paginationElem.querySelector(".one").textContent = page - 1;
    paginationElem.querySelector(".three").textContent = page + 1;
  }

  addProduct(filteredProduct, page);
}

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
  if (handle === 0) minDiscount.textContent = values[0];
  else maxDiscount.textContent = values[1];
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
  if (handle === 0) minPrice.textContent = values[0];
  else maxPrice.textContent = values[1];
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
  if (handle === 0)
    minPoint.textContent = values.innerText = parseFloat(values[0]).toFixed(1);
  else
    maxPoint.textContent = values.innerText = parseFloat(values[1]).toFixed(1);
});

pointSlider.noUiSlider.on("change", () => getFilterParams());
DiscountSlider.noUiSlider.on("change", () => getFilterParams());
priceSlider.noUiSlider.on("change", () => getFilterParams());
categorySelectBox.addEventListener("change", () => getFilterParams());
searchInputElem.addEventListener("input", (e) => {
  let value = searchInputElem.value.trim();
  searchInputElem.value = value;
  if (value.length > 2) searchProduct(value);
  else if (value.length <= 1) getProduct();
});
sortingSelectBox.addEventListener("change", () => getFilterParams());
sortingType.addEventListener("change", () => getFilterParams());

function getFilterParams() {
  productsContainer.innerHTML = animatePulse;
  filteredProduct = allProduct.filter(
    (p) =>
      p.price > Number(minPrice.textContent) &&
      p.price < Number(maxPrice.textContent) &&
      p.rating > Number(minPoint.textContent) &&
      p.rating < Number(maxPoint.textContent) &&
      p.discountPercentage > Number(minDiscount.textContent) &&
      p.discountPercentage < Number(maxDiscount.textContent)
  );
  if (categorySelectBox.value !== "all") {
    filteredProduct = filteredProduct.filter(
      (p) => p.category == categorySelectBox.value
    );
  }
  if (sortingSelectBox.value === "title") {
    if (sortingType.value === "asc") {
      filteredProduct = filteredProduct.sort((a, b) =>
        a.title.localeCompare(b.title)
      );
    } else {
      filteredProduct = filteredProduct.sort((a, b) =>
        b.title.localeCompare(a.title)
      );
    }
  } else {
    if (sortingType.value === "asc") {
      filteredProduct = filteredProduct.sort(
        (a, b) => a[sortingSelectBox.value] - b[sortingSelectBox.value]
      );
    } else {
      filteredProduct = filteredProduct.sort(
        (a, b) => b[sortingSelectBox.value] - a[sortingSelectBox.value]
      );
    }
  }
  itemCount = filteredProduct.length;
  addProduct(filteredProduct);
  pagination(1);
}
function removeProduct(id) {
  showSwal(
    " مطمئن هستید؟",
    "آیا میخواهید این محصول را حذف کنید؟",
    "warning",
    true,
    "بله"
  ).then((result) => {
    if (result.isConfirmed) {
      fetch(`https://dummyjson.com/products/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.isDeleted === true) {
            showTost("success", "محصول با موفقیت حذف شد!");
            let itemIndex = allProduct.findIndex((e) => e.id == id);
            allProduct.splice(itemIndex, 1);
            getFilterParams();
          } else showTost("error", " محول حذف نشد دوباره امتحان کنید!");
        });
    }
  });
}


function editProduct(id) {
  let index = allProduct.findIndex((e) => e.id == id);
  Swal.fire({
    title: "ویرایش محصول",
    html: `
        <form class="w-full max-w-xs mx-auto text-[var(--text-color)] text-xs flex flex-col">
      <span class="mb-1 sm:mb-2 text-start">دسته بندی</span>
      <select id="edit-category" class=" border border-gray-500/80 focus:border-[var(--active-color)] outline-0 cursor-pointer w-full bg-[var(--bg-color)] p-2 md:p-3 rounded-lg ">
          <option ${
            allProduct[index].category == "beauty" ? "selected" : ""
          } value="beauty">زیبایی</option>
          <option ${
            allProduct[index].category == "fragrances" ? "selected" : ""
          } value="fragrances">عطرها</option>
          <option ${
            allProduct[index].category == "furniture" ? "selected" : ""
          } value="furniture">مبلمان</option>
          <option ${
            allProduct[index].category == "groceries" ? "selected" : ""
          } value="groceries">مواد غذایی</option>
          <option ${
            allProduct[index].category == "home-decoration" ? "selected" : ""
          } value="home-decoration">دکوراسیون منزل</option>
          <option ${
            allProduct[index].category == "kitchen-accessories"
              ? "selected"
              : ""
          } value="kitchen-accessories">لوازم آشپزخانه</option>
          <option ${
            allProduct[index].category == "laptops" ? "selected" : ""
          } value="laptops">لپ‌تاپ‌ها</option>
          <option ${
            allProduct[index].category == "mens-shirts" ? "selected" : ""
          } value="mens-shirts">پیراهن مردانه</option>
          <option ${
            allProduct[index].category == "mens-shoes" ? "selected" : ""
          } value="mens-shoes">کفش مردانه</option>
          <option ${
            allProduct[index].category == "mens-watches" ? "selected" : ""
          } value="mens-watches">ساعت مردانه</option>
          <option ${
            allProduct[index].category == "mobile-accessories" ? "selected" : ""
          } value="mobile-accessories">لوازم جانبی موبایل</option>
          <option ${
            allProduct[index].category == "motorcycle" ? "selected" : ""
          } value="motorcycle">موتورسیکلت</option>
          <option ${
            allProduct[index].category == "skin-care" ? "selected" : ""
          } value="skin-care">مراقبت پوست</option>
          <option ${
            allProduct[index].category == "smartphones" ? "selected" : ""
          } value="smartphones">گوشی‌های هوشمند</option>
          <option ${
            allProduct[index].category == "sports-accessories" ? "selected" : ""
          } value="sports-accessories">لوازم ورزشی</option>
      </select>
      <label class="mb-1 sm:mb-2 mt-2 sm:mt-4 cursor-pointer text-start" for="edit-name">اسم محصول:</label>
      <input id="edit-name" type="text" required  class=" bg-[var(--bg-color)] p-3 outline-0 rounded-lg border border-gray-500/80 focus:border-[var(--active-color)]" value="${
        allProduct[index].title
      }">
      <label class="mb-1 sm:mb-2 mt-2 sm:mt-4 cursor-pointer text-start" for="edit-price">قیمت:</label>
      <div class="flex items-center border border-gray-500/80 focus-within:border-[var(--active-color)] overflow-hidden  rounded-lg bg-[var(--bg-color)]">
        <input id="edit-price" type="number" required pattern="[1-9][0-9]*" min="0.1" max="14999.98" class="grow p-2 outline-0  " placeholder="$ " value="${
          allProduct[index].price
        }">
        <span class="p-3 bg-[var(--box-color)]">$</span>
      </div>
      <span class="mb-1 sm:mb-2 mt-2 sm:mt-4  text-start">تخفیف</span>
      <div class="flex items-center gap-1 ">
        <input id="edit-discount" type="range" min="0.1" step="0.1" max="98.9" class="grow accent-[var(--active-color)]" onInput="nextElementSibling.textContent=this.value + '%'" value="${allProduct[
          index
        ].discountPercentage.toFixed(1)}">
        <span class="w-2/12">${allProduct[index].discountPercentage.toFixed(
          1
        )}%</span>
      </div>
      <label class="mb-1 sm:mb-2 mt-2 sm:mt-4 cursor-pointer text-start" for="edit-stock">تعداد:</label>
      <input id="edit-stock" type="number" required pattern="[1-9][0-9]*" min="0" class=" bg-[var(--bg-color)] p-3 outline-0 border border-gray-500/80 focus:border-[var(--active-color)] rounded-lg " placeholder="تعداد " value="${
        allProduct[index].stock
      }">      
    </form>
    `,
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonText: "ذخیره",
    cancelButtonText: "انصراف",
    cancelButtonColor: "#dd3333",
    preConfirm: () => {
      const name = document.getElementById("edit-name").value.trim();
      const price = +document.getElementById("edit-price").value;
      const discount = +document.getElementById("edit-discount").value;
      const stock = +document.getElementById("edit-stock").value;
      const category = document.getElementById("edit-category").value;

      if (!name || name.length < 3 ) {
        Swal.showValidationMessage("نام محصول باید بیشتر از 3 کارکتر باشد!");
        return false;
      }
      if (!price || price <= 0 || price >= 15000) {
        Swal.showValidationMessage("قیمت باید بین 0.1 تا 14999.9 باشد!");
        return false;
      }
      if (stock < 0) {
        Swal.showValidationMessage("تعداد نمی‌تواند منفی باشد!");
        return false;
      }

      return { name, price, stock, discount, category };
    },
  }).then((result) => {
    if (result.isConfirmed) {
      showSwal('مطمئن هستید؟', 'آیا میخواهید اطلاعات این محصول را تغییر دهید؟', 'warning', true, 'بله')
      .then(res =>{
        if(res.isConfirmed){
     fetch(`https://dummyjson.com/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category: result.value.category,
          title: result.value.name,
          price: result.value.price,
          discountPercentage: result.value.discount,
          stock:Math.floor(result.value.stock),
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          allProduct[index] = res;
          getFilterParams();
          showTost("success", "اطلاعات محصول با موفقیت بروزرسانی شد.");
        })
        .catch(() =>
          showTost("error", "مشکلی پیش آمد دوباره امتحان کنید!")
        );
        }
      })
      
    }
  });
}
