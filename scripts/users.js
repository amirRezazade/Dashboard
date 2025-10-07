import {
  addToLocal,
  getToLocal,
  showSwal,
  showTost,
  addToShoppingCard,
  animatePulse,
} from "./funcs.js";

const usersContainer = document.querySelector("#users-container");
const sortingElem = document.querySelector("#sort-select-box");
const orderingElem = document.querySelector("#ordering");
const searchInput = document.querySelector("#search-input");
const paginationElem = document.querySelector("#users-pagination");

let page = 1;
let userCount;
window.removeUser = removeUser;
window.editUser = editUser;

let users = [];
getUsers();
async function getUsers(key) {
  usersContainer.innerHTML = animatePulse;
  console.log(
    `https://dummyjson.com/users${key ? `/search?q=${key}` : ""}${
      key
        ? ""
        : "?limit=150&select=id,image,firstName,lastName,gender,email,phone,age,username,role"
    }`
  );
  let res = await fetch(
    `https://dummyjson.com/users${key ? `/search?q=${key}` : ""}${
      key
        ? ""
        : "?limit=150&select=id,image,firstName,lastName,gender,email,phone,age,username,role"
    }`
  );
  let response = await res.json();
  users = response.users;
  filtering();
  console.log(response);
}

function addUsers(list, page = 1) {
  usersContainer.innerHTML = "";
  if (list.length == 0)
    usersContainer.innerHTML = `<div class=" my-5 block h-[150px] md:h-[300px]  bg-[url('../images/product-not-found.png')]  bg-contain bg-center bg-no-repeat "></div>`;
  if (list.length <= 10) paginationElem.style.display = "none";
  else paginationElem.style.display = "flex";
  document.querySelector("#total-users-count").textContent = list.length;
  let copyList = [...list];
  copyList.splice(page * 10 - 10, 10).forEach((user) => {
    usersContainer.innerHTML += `
    <tr class="p-1.5 md:p-2 flex  transition-colors hover:bg-gray-500/20">
      <td class=" lg:pr-7 w-3/15">
        <a href="user-details.html?id=${
          user.id
        }" class="flex items-center gap-3.5">
          <div class="size-10 shrink0 rounded-full overflow-hidden"><img class="object-cover rounded-full" src="${
            user.image
          }" alt=""></div>
            <span>${user.firstName} ${user.lastName}</span>
        </a>
      </td>
      <td class=" centered w-1/15">${user.gender === "male" ? "مرد" : "زن"}</td>
      <td class=" centered w-4/15 truncate" dir="ltr">${user.email}</td>
      <td class=" centered w-2/15 font-[dana-num] truncate" dir="ltr">${
        user.phone
      }</td>
      <td class=" centered w-1/15">${user.age}</td>
      <td class=" centered w-2/15">${user.username}</td>
      <td class=" flex items-center w-1/15">${
        user.role === "admin" ? "ادمین" : ""
      } ${user.role === "user" ? "مشتری" : ""} ${
      user.role === "moderator" ? "مدیر" : ""
    }</td>
      <td class=" centered w-1/15 gap-1.5 text-sm md:text-base">
          <button type="button" class="p-1 rounded-sm cursor-pointer text-blue-500" onclick="editUser(${
            user.id
          })"><i class="fa fa-edit"></i></button>
          <button type="button" class="p-1 rounded-sm cursor-pointer text-red-500" onclick="removeUser(${
            user.id
          })"><i class="fa fa-trash"></i></button>
      </td>
    </tr>
    `;
  });
}

function filtering() {
  let parameter = sortingElem.value;
  let newUsers;
  if (orderingElem.value === "desc") {
    if (parameter === "age") {
      newUsers = [...users].sort((a, b) => a[parameter] - b[parameter]);
    } else {
      newUsers = [...users].sort((a, b) =>
        a[parameter].localeCompare(b[parameter])
      );
    }
  } else {
    if (parameter === "age") {
      newUsers = [...users].sort((a, b) => b[parameter] - a[parameter]);
    } else {
      newUsers = [...users].sort((a, b) =>
        b[parameter].localeCompare(a[parameter])
      );
    }
  }

  userCount = newUsers.length;
  addUsers(newUsers);
  pagination(1);
}

sortingElem.addEventListener("change", filtering);
orderingElem.addEventListener("change", filtering);
searchInput.addEventListener("input", (e) => {
  let value = searchInput.value.trim();
  searchInput.value = value;
  if (value.length > 2) getUsers(value);
  else if (value.length <= 1) getUsers();
});
paginationElem.addEventListener("click", (e) => {
  if (e.target.nodeName === "BUTTON") {
    pagination(e);
  }
});

function removeUser(id) {
  showSwal(
    "حذف کاربر",
    "آیا میخواهید این کاربر را حذف کنید؟",
    "warning",
    true,
    "حذف"
  ).then((data) => {
    if (data.isConfirmed) {
      fetch(`https://dummyjson.com/users/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then(()=>{
          showTost('success' , 'کاربر با موفقیت حذف شد!')
          let itemIndex = users.findIndex((e) => e.id == id);
            users.splice(itemIndex, 1);
            filtering();
        })
        .catch(()=> showTost('error' , 'مشکلی پیش آمد. دوباره امتحان کنید!'))
    }
  });
}
function editUser(id) {
  let index = users.findIndex((e) => e.id == id);  
  Swal.fire({
    title: "ویرایش اطلاعات کاربر",
    html: `
        <form class="w-full max-w-xs mx-auto text-[var(--text-color)] text-xs flex flex-col">     
      <label class="mb-1 sm:mb-2 mt-2 sm:mt-4 cursor-pointer text-start" for="firstName">نام:</label>
      <input id="firstName" type="text" required  class=" bg-[var(--bg-color)] p-3 outline-0 rounded-lg border border-gray-500/80 focus:border-[var(--active-color)]" value="${
        users[index].firstName
      }">
      <label class="mb-1 sm:mb-2 mt-2 sm:mt-4 cursor-pointer text-start" for="lastName">نام خانوادگی:</label>
      <input id="lastName" type="text" required  class=" bg-[var(--bg-color)] p-3 outline-0 rounded-lg border border-gray-500/80 focus:border-[var(--active-color)]" value="${
        users[index].lastName
      }">
      <label class="mb-1 sm:mb-2 mt-2 sm:mt-4 cursor-pointer text-start" for="phone">تلفن:</label>
      <input pattern="^09\d{9}$" maxlength="11" id="phone" type="tel" required  class="text-end bg-[var(--bg-color)] p-3 outline-0 rounded-lg border border-gray-500/80 focus:border-[var(--active-color)]" value="${
        users[index].phone
      }">
      <label class="mb-1 sm:mb-2 mt-2 sm:mt-4 cursor-pointer text-start" for="username">نام کاربری:</label>
      <input id="username" type="text" required  class=" bg-[var(--bg-color)] p-3 outline-0 rounded-lg border border-gray-500/80 focus:border-[var(--active-color)]" value="${
        users[index].username
      }">
      <label class="mb-1 sm:mb-2 mt-2 sm:mt-4 cursor-pointer text-start" for="age">سن:</label>
      <input id="age" type="number" required min="18" max="100"  class=" bg-[var(--bg-color)] p-3 outline-0 rounded-lg border border-gray-500/80 focus:border-[var(--active-color)]" value="${
        users[index].age
      }">
         <div class="flex items-center justify-center gap-7 mb-1 sm:mb-2 mt-2 sm:mt-4 ">
           <div class="flex flex-row-reverse items-center gap-1">
            <input ${users[index].gender=='female' ? 'checked' : ''} class="peer size-5 accent-[var(--active-color)]" id="female" name="gender" type="radio">
             <label  for="female" class=" text-sm cursor-pointer transition-colors ">زن</label>
           </div>
           <div class="flex flex-row-reverse items-center gap-1">
             <input ${users[index].gender=='male' ? 'checked' : ''} class="peer size-5 accent-[var(--active-color)]" id="male" name="gender" type="radio">
             <label  for="male" class=" text-sm cursor-pointer transition-colors ">مرد</label>
             </div>
         </div>
          <span class="mb-1 sm:mb-2 text-start">نقش</span>
      <select id="role" class=" border border-gray-500/80 focus:border-[var(--active-color)] outline-0 cursor-pointer w-full bg-[var(--bg-color)] p-2 md:p-3 rounded-lg ">
           <option ${
            users[index].role == "moderator" ? "selected" : ""
          } value="moderator">مدیر</option>
          <option ${
            users[index].role == "admin" ? "selected" : ""
          } value="admin">ادمین</option>
          <option ${
            users[index].role == "user" ? "selected" : ""
          } value="user">مشتری</option>
      </select>    
    </form>
    `,
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonText: "ذخیره",
    cancelButtonText: "انصراف",
    cancelButtonColor: "#dd3333",
    preConfirm: () => {
      const firstName = document.getElementById("firstName").value.trim();
      const lastName = document.getElementById("lastName").value.trim();
      const phone = document.getElementById("phone").value
      const username = document.getElementById("username").value.trim()
      const age = document.getElementById("age").value;
      const role = document.getElementById("role").value;

      if (firstName.length <2) {
        Swal.showValidationMessage("نام باید حداقل 2 کاراکتر باشد!");
        return false;
      }
      if (lastName.length <2) {
        Swal.showValidationMessage("نام خانوادگی باید حداقل 2 کاراکتر باشد!");
        return false;
      }
      if (username.length <2) {
        Swal.showValidationMessage("نام کاربری باید حداقل 2 کاراکتر باشد!");
        return false;
      }
      if (phone.length < 11) {
        Swal.showValidationMessage("شماره تلفن معتبر وارد کنید!");
        return false;
      }
      if ( 18 <= age  ||  age <=100) {
        Swal.showValidationMessage("سن باید بین 18 تا 100 باشد!");
        return false;
      }

      return { firstName, lastName, username, phone, age , role };
    },
  }).then((result) => {
    if (result.isConfirmed) {
      showSwal('ویرایش اطلاعات', 'آیا میخواهید اطلاعات این کاربر را تغییر دهید؟', 'warning', true, 'بله')
      .then(res =>{
        if(res.isConfirmed){
     fetch(`https://dummyjson.com/users/${id}`, {
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
          users[index] = res;
          getFilterParams();
          showTost("success", "اطلاعات کاربر با موفقیت بروزرسانی شد.");
        })
        .catch(() =>
          showTost("error", "مشکلی پیش آمد دوباره امتحان کنید!")
        );
        }
      })
      
    }
  });
}


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
  } else if (page == Math.ceil(userCount / 10)) {
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

  addUsers(users, page);
}
