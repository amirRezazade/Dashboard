let shoppingCardIds = [];
let shoppingCardItems = JSON.parse(localStorage.getItem("shoppingCardItems"));

// set user infos to navbar
let user = getToLocal("user");
if (user) {
  document.querySelectorAll("#nav-user-image").forEach((elem) => (elem.src = user.image || "images/profile (1).png"));
  document.querySelector("#nav-user-first-name").textContent = user.firstName || "امیر";
  document.querySelector("#nav-user-role").textContent = user.role === "moderator" ? "مدیر" : "ادمین";
  document.querySelector("#nav-user-full-name").textContent = user.firstName + user.lastName;
  document.querySelector("#nav-user-email").textContent = user.email || "amirrezazadeh.job@gmail.com";
} else {
  document.querySelectorAll("#nav-user-image").forEach((elem) => (elem.src = "images/profile (1).png"));
  document.querySelector("#nav-user-first-name").textContent = "امیر";
  document.querySelector("#nav-user-role").textContent = "مدیر";
  document.querySelector("#nav-user-full-name").textContent = "امیر رضازاده";
  document.querySelector("#nav-user-email").textContent = "amirrezazadeh.job@gmail.com";
}

document.querySelector("#logout-btn").addEventListener("click", logout);

if (!getToLocal("shoppingCardIds")) {
  shoppingCardIds = [153, 194, 85];
  addToLocal("shoppingCardIds", shoppingCardIds);
}

window.addEventListener("DOMContentLoaded", () => {
  if (!getToLocal("shoppingCardItems")) getShoppingCardItems();
  if (getToLocal("dark") == false) toggleDarkMode();
  changeActiveColor(getToLocal("active-color") || "#0caf60");
  addShoppingCardItems();
  getAndAddNavTodoList();
});

// start theme control
const activeColorOptions = document.querySelector("#active-color-options");
activeColorOptions.addEventListener("click", (e) => {
  if (e.target.nodeName == "BUTTON") {
    let color = e.target.dataset.color;
    changeActiveColor(color);
  }
});
function changeActiveColor(color) {
  let root = document.querySelector(":root");
  root.style.setProperty("--active-color", color);
  addToLocal("active-color", color);
  activeColorOptions.querySelectorAll("button").forEach((item) => {
    item.classList.remove("border");
    if (item.dataset.color == color) item.classList.add("border");
  });
}
function toggleDarkMode() {
  document.documentElement.classList.toggle("dark");
  if (document.documentElement.classList.contains("dark")) addToLocal("dark", true);
  else addToLocal("dark", false);
}
// finish theme control
const navItems = document.querySelectorAll(".nav-item");
const navItemsContents = document.querySelectorAll(".nav-item .nav-item-content");
navItems.forEach((item) => {
  item.addEventListener("click", (e) => {
    if (e.target.classList.contains("nav-item")) {
      e.target.querySelector(".nav-item-content").classList.toggle("show");
      navItemsContents.forEach((elem) => {
        if (e.target.querySelector(".nav-item-content") != elem) elem.classList.remove("show");
      });
    }
  });
});
window.addEventListener("click", (e) => {
  if (!e.target.closest(".nav-item") && !e.target.closest(".swal2-container")) navItemsContents.forEach((elem) => elem.classList.remove("show"));
});
// start shopping cart section

async function getShoppingCardItems() {
  let ids = getToLocal("shoppingCardIds");
  const products = await Promise.all(ids.map((id) => fetch(`https://dummyjson.com/products/${id}?select=title,price,id,thumbnail,stock,discountPercentage`).then((res) => res.json())));
  const shoppingCardItems = products.map((product) => ({
    ...product,
    quantity: 1,
  }));

  addToLocal("shoppingCardItems", shoppingCardItems);
}
function addShoppingCardItems() {
  let products = getToLocal("shoppingCardItems");
  updateShoppingCardLength();
  if (products.length) {
    document.querySelector("#shopping-card-container").style.display = "flex";
    document.querySelector("#shopping-card-container").nextElementSibling.style.display = "flex";
    document.querySelector("#empty-shopping-card").style.display = "none";
    document.querySelector("#shopping-card-container").innerHTML = ``;

    products.forEach((item) => {
      document.querySelector("#shopping-card-container").innerHTML += `
        <li data-id="${item.id}" class="flex items-center justify-between transition-all py-2 hover:bg-gray-400/30">
                      <div class="flex gap-3 w-1/2 ">
                        <a href="product-details.html?id=${item.id}" class="p-0.5 size-12 shrink-0 rounded-full bg-[var(--bg-color)]/50">
                          <img class="object-cover" src="${item.thumbnail}" alt="">
                        </a>
                        <div dir="ltr" class="flex flex-col truncate">
                          <a href="product-details.html?id=${item.id}" class="text-sm truncate">${item.title}</a>
                          <span class="text-right">${item.price.toFixed(2)} $</span>
                        </div>
                      </div>
                      <div class="flex items-center gap-2 text-[11px]">
                        <button onclick="changeQuantity(this , 'plus')" type="button" class="size-7 centered cursor-pointer rounded-xl border border-gray-500/50"><i class="fas fa-plus"></i></button>
                        <span class="text-sm">${item.quantity}</span>
                        <button onclick="changeQuantity(this , 'mines')" type="button" class="size-7 centered cursor-pointer rounded-xl border border-gray-500/50"><i class="fas fa-minus "></i></button>
                      </div>
                      <span class="font-bold total-price hidden xs:inline-block">${(item.price * item.quantity).toFixed(2)} $ </span>
                      <button type="button" class=" rounded-full cursor-pointer size-7 centered text-red-600 text-sm" onclick="removeShoppingCardItem(this)"><i class="fa-solid fa-xmark"></i></button>
                  </li>
        `;
    });
    changeShoppingCartTotalPrice();
  } else {
    emptyShoppingCard();
  }
}
function removeShoppingCardItem(elem) {
  return Swal.fire({
    title: "حذف از سبد خرید",
    text: "آیا میخواهید این محصول را از سبد خرید حذف کنید؟",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "حذف",
    cancelButtonText: "انصراف",
  }).then((data) => {
    if (data.isConfirmed) {
      let li = elem.closest("li");
      let id = li.dataset.id;
      let card = getToLocal("shoppingCardItems");
      let ids = getToLocal("shoppingCardIds");
      let idsIndex = ids.findIndex((item) => item == id);
      let index = card.findIndex((item) => item.id == id);
      ids.splice(idsIndex, 1);
      card.splice(index, 1);
      addToLocal("shoppingCardItems", card);
      addToLocal("shoppingCardIds", ids);
      li.classList.add("opacity-0", "invisible");
      setTimeout(() => {
        li.remove();
      }, 350);
      updateShoppingCardLength();
      changeShoppingCartTotalPrice();
      if (ids.length == 0) emptyShoppingCard();
      Swal.fire({
        toast: true,
        position: "bottom-end",
        icon: "success",
        title: "محصول از سبد خرید شما حذف شد!",
        showConfirmButton: false,
        timer: 3500,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
        customClass: {
          popup: "my-toast",
        },
      });
    }
  });
}
function changeQuantity(elem, text) {
  let card = getToLocal("shoppingCardItems");
  let li = elem.closest("li");
  let id = li.dataset.id;

  let index = card.findIndex((item) => item.id == id);
  if (text == "plus" && card[index].quantity < card[index].stock) {
    card[index].quantity++;
    elem.nextElementSibling.textContent = card[index].quantity;
  }
  if (text == "mines" && card[index].quantity !== 1) {
    card[index].quantity--;
    elem.previousElementSibling.textContent = card[index].quantity;
  }
  addToLocal("shoppingCardItems", card);
  changeShoppingCartTotalPrice();
}
function changeShoppingCartTotalPrice() {
  let total = 0;
  let card = getToLocal("shoppingCardItems");
  card.forEach((item) => {
    total += item.price * item.quantity;
  });
  document.querySelector("#shopping-card-total-price").textContent = total.toFixed(2) + " $";
}
function emptyShoppingCard() {
  document.querySelector("#shopping-card-container").style.display = "none";
  document.querySelector("#shopping-card-container").nextElementSibling.style.display = "none";
  document.querySelector("#empty-shopping-card").style.display = "flex";
}
function updateShoppingCardLength() {
  length = getToLocal("shoppingCardItems") ? getToLocal("shoppingCardItems").length : 0;
  document.querySelector("#shopping-card-length").textContent = `${length}مورد`;
}

// finish shopping cart section
// start sidebar section
let sidebar = document.querySelector("aside");
sidebar.addEventListener("click", (e) => {
  if (e.target == sidebar) sidebar.classList.remove("sidebar-toggle");
});

let sidebarItems = sidebar.querySelectorAll(".sidebar-btn");
let sidebarItemContents = sidebar.querySelectorAll(".aside-item-content");
sidebarItems.forEach((elem) => {
  elem.addEventListener("click", (e) => {
    if (e.target.closest(".sidebar-btn")) {
      let li = elem.closest("li");
      if (li.classList.contains("open")) li.classList.remove("open");
      else {
        li.classList.add("open");
        sidebar.classList.add("sidebar-toggle");
      }
      sidebarItems.forEach((item) => {
        if (item !== elem) item.closest("li").classList.remove("open");
      });
    }
  });
});

function toggleSidebar() {
  if (sidebar.classList.contains("sidebar-toggle")) {
    sidebar.classList.remove("sidebar-toggle");
    sidebarItems.forEach((elem) => {
      elem.closest("li").classList.remove("open");
    });
  } else {
    sidebar.classList.add("sidebar-toggle");
  }
}
// finish sidebar section

// start todo cart
async function getAndAddNavTodoList() {
  let res = await fetch("https://dummyjson.com/todos");
  let response = await res.json();
  let todos = response.todos.splice(1, 4);
  todos.forEach((todo) => {
    document.querySelector("#nav-todo-list-container").innerHTML += `
      <li data-id="${todo.id}" class="flex items-center justify-between transition-colors  hover:bg-gray-400/30 px-2 py-3">
         <div class="flex items-center gap-2 max-w-3/4">
               <span class="p-0.5 size-8 text-sm centered shrink-0 rounded-full bg-[var(--active-color)]/50">
              <i class="fa-solid fa-clipboard-check"></i>
             </span>
             <div dir="ltr" class="  text-sm flex flex-col truncate ${todo.completed === true ? "line-through" : ""} me-auto ms-2 ">
               <span class="truncate">${todo.todo}</span>
             </div>
         </div>
                    <span
                      class=" ms-auto rounded p-1 ${todo.completed === false ? "hidden" : "hidden xs:inline-block"} bg-red-500/30 text-white text-nowrap text-xs ">انجام شده</span>
                   <button type="button" class=" rounded-full cursor-pointer size-7 centered text-red-500 text-sm" onclick="removeTodoItem(this)"><i class="fa-solid fa-xmark"></i></button>
                </li>
    `;
  });
}

function removeTodoItem(elem) {
  return Swal.fire({
    title: "حذف کار",
    text: "آیا میخواهید این کار را حذف کنید؟",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "حذف",
    cancelButtonText: "انصراف",
  }).then((data) => {
    if (data.isConfirmed) {
      let li = elem.closest("li");
      li.classList.add("opacity-0", "invisible");
      setTimeout(() => {
        li.remove();
      }, 350);
      Swal.fire({
        toast: true,
        position: "bottom-end",
        icon: "success",
        title: "وظیفه حذف شد",
        showConfirmButton: false,
        timer: 3500,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
        customClass: {
          popup: "my-toast",
        },
      });
    }
  });
}

// finish todo cart

function toggleFullscreen() {
  const elem = document.documentElement;
  if (!document.fullscreenElement) {
    elem.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}
function addToLocal(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
function getToLocal(key) {
  return JSON.parse(localStorage.getItem(key));
}
function logout() {
  return Swal.fire({
    title: "خروج از سیستم",
    text: "آیا میخواهید از سیستم خارج شوید؟",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "خروج",
    cancelButtonText: "انصراف",
  }).then((data) => {
    if (data.isConfirmed) {
      window.location.href = "logout.html";
    }
  });
}
// start expott data section
function exportTableToCSV(table) {
  const rows = document.querySelectorAll(`#${table} tr`);
  let csv = "\uFEFF";

  rows.forEach((row) => {
    const cols = row.querySelectorAll("th, td");
    const line = Array.from(cols)
      .map((col) => col.innerText)
      .join(",");
    csv += line + "\n";
  });

  const blob = new Blob([csv], { type: "text/csv" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "table.csv";
  a.click();
}
function exportTableToJSON(tableId) {
  const table = document.querySelector(`#${tableId}`);
  const headers = Array.from(table.querySelectorAll("thead th")).map((th) => th.textContent.trim());
  const rows = Array.from(table.querySelectorAll("tbody tr"));

  const data = rows.map((row) => {
    const cells = Array.from(row.querySelectorAll("td"));
    const obj = {};
    cells.forEach((cell, i) => {
      obj[headers[i]] = cell.textContent.trim();
    });
    return obj;
  });

  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "table-data.json";
  a.click();

  URL.revokeObjectURL(url);
}
window.addEventListener("click", (e) => {
  if (!e.target.closest(".export-dropdown")) document.querySelectorAll(".export-dropdown-content").forEach((elem) => elem.classList.add("hidden"));
});
// finish expott data section
