import {
  addToLocal,
  getToLocal,
  showSwal,
  showTost,
  addToShoppingCard,
} from "./funcs.js";

window.removeTodo = removeTodo;
window.changeDeletTodosBtn = changeDeletTodosBtn;

const todosWrapper = document.querySelector("tbody");
const checkAll = document.querySelector("#check-all");
const paginationElem = document.querySelector("#todos-pagination");
const deletTodosBtn = document.querySelector("#remove-todos");
let todos = [];
let page = 1;
let todosCount;
let checkboxInputs;

getTodos();
async function getTodos() {
  let res = await fetch(`https://dummyjson.com/todos?limit=100`);
  let response = await res.json();
  todos = response.todos;
  todosCount = todos.length;
  addTodos(todos);
}

function addTodos(list, page = 1) {  
  todosWrapper.innerHTML = "";
  if (list.length == 0)
    todosWrapper.innerHTML = `<div class=" my-5 block h-[150px] md:h-[300px]  bg-[url('../images/product-not-found.png')]  bg-contain bg-center bg-no-repeat "></div>`;
  if (list.length <= 10) paginationElem.style.display = "none";
  else paginationElem.style.display = "flex";
  document.querySelector("#total-todos-count").textContent = list.length;
  [...list].splice(page * 10 - 10, 10).forEach((todo) => {
    todosWrapper.innerHTML += `
           <tr class="px-1.5 md:px-3 h-14 flex transition-opacity duration-500 hover:bg-gray-500/20" data-id="${todo.id}">
                         <td class=" centered w-1/10"><input class="accent-[var(--active-color)] cursor-pointer md:size-4 " type="checkbox" oninput="changeDeletTodosBtn()"></td>
                         <td class=" centered w-4/10 text-center ${
                           todo.completed ? "line-through" : ""
                         }">${todo.todo}</td>
                         <td class=" centered w-2/10">
                            <div class="flex flex-nowrap">
                                <a href="javascript: void(0);" class="relative group -mr-2.5 bg-[var(--bg-color)] rounded-full border border-[var(--bg-color)] transition-transform duration-500 hover:-translate-y-2 " data-img="../../assets/images/users/avatar-3.jpg">           
                                  <img src="profile.png" alt="" class="rounded-full size-7"> 
                                  <span class="py-1 px-2 bg-[var(--active-color)] text-white rounded absolute !z-10 left-1/2 -top-1/1 -translate-1/2 after:contetn-[''] after:absolute after:top-1/1 after:left-1/2 after:-translate-1/2 after:size-3 after:rotate-45 after:bg-[var(--active-color)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300 text-xs text-nowrap">Abigail Rivera</span>       
                                </a>
                                <a href="javascript: void(0);" class="relative group -mr-2.5 bg-[var(--bg-color)] rounded-full border border-[var(--bg-color)] transition-transform duration-500 hover:-translate-y-2 " data-img="../../assets/images/users/avatar-3.jpg">           
                                  <img src="profile.png" alt="" class="rounded-full size-7"> 
                                  <span class="py-1 px-2 bg-[var(--active-color)] text-white rounded absolute !z-10 left-1/2 -top-1/1 -translate-1/2 after:contetn-[''] after:absolute after:top-1/1 after:left-1/2 after:-translate-1/2 after:size-3 after:rotate-45 after:bg-[var(--active-color)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300 text-xs text-nowrap">Sofia Mitchell</span>       
                                </a>
                                <a href="javascript: void(0);" class="relative group -mr-2.5 bg-[var(--bg-color)] rounded-full border border-[var(--bg-color)] transition-transform duration-500 hover:-translate-y-2 " data-img="../../assets/images/users/avatar-3.jpg">           
                                  <img src="profile.png" alt="" class="rounded-full size-7"> 
                                  <span class="py-1 px-2 bg-[var(--active-color)] text-white rounded absolute !z-10 left-1/2 -top-1/1 -translate-1/2 after:contetn-[''] after:absolute after:top-1/1 after:left-1/2 after:-translate-1/2 after:size-3 after:rotate-45 after:bg-[var(--active-color)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300 text-xs text-nowrap">James Davis</span>       
                                </a>
                              
                            </div>
                         </td>
                         <td class=" centered w-2/10 truncate flex items-center gap-2">${
                           todo.completed
                             ? '<i class="fas fa-check text-xs text-green-500 animate-pulse"></i>'
                             : ""
                         } ${todo.completed ? "تکمیل شده" : "تکمیل نشده"} </td>
                         <td class=" centered w-1/10 flex items-center gap-1.5">
                         <button type="button" class="p-1 rounded-sm cursor-pointer text-blue-500" onclick="editTodo(this)"><i class="fa fa-edit"></i></button>
                         <button type="button" class="p-1 rounded-sm cursor-pointer text-red-500" onclick="removeTodo(this)"><i class="fa fa-trash"></i></button>
                         </td>
                   </tr>
        `;
  });
  checkboxInputs = document.querySelectorAll("tbody input");
}

paginationElem.addEventListener("click", (e) => {
  if (e.target.nodeName === "BUTTON") {
    pagination(e);
  }
});


checkAll.addEventListener("click", () => {
  if (checkAll.checked === true) {
    checkboxInputs.forEach((elem) => (elem.checked = true));
    changeDeletTodosBtn()
  } else {
    checkboxInputs.forEach((elem) => (elem.checked = false));
    changeDeletTodosBtn()
  }
});


function removeTodo(elem) {
  let li = elem.closest("tr");
  let id = li.dataset.id;  
  showSwal(
    "حذف کار",
    "آیا میخواهید این کار را حذف کنید؟",
    "warning",
    true,
    "حذف"
  ).then((data) => {
    if (data.isConfirmed) {
      fetch(`https://dummyjson.com/todos/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then(() => {
          showTost("success", "کار با موفقیت حذف شد!");
          let itemIndex = todos.findIndex((e) => e.id == id);
          todos.splice(itemIndex, 1);
          li.classList.add("opacity-0");
          setTimeout(() => li.remove(), 500);
          document.querySelector("#total-todos-count").textContent =todos.length;
        })
        .catch(() => showTost("error", "مشکلی پیش آمد. دوباره امتحان کنید!"));
    }
  });
}

deletTodosBtn.addEventListener('click' , ()=>{
  showSwal(
    "حذف کارها",
    "آیا میخواهید این کارها را حذف کنید؟",
    "warning",
    true,
    "حذف"
  ).then((data) => {
    if (data.isConfirmed) {
      checkboxInputs.forEach(elem=>{
        if(elem.checked===true){
          let li = elem.closest("tr")
          let id = li.dataset.id
          let itemIndex = todos.findIndex((e) => e.id == id);
          todos.splice(itemIndex, 1);
          pagination(1)
          changeDeletTodosBtn()
          checkAll.checked = false
        }
      })
      showTost("success", "کارها با موفقیت حذف شدند!");
    }
  }

  )
})

function changeDeletTodosBtn(){
   let isOneChecked = [...checkboxInputs].some(
        (elem) => elem.checked === true
      );
      if (isOneChecked) deletTodosBtn.classList.remove("opacity-0", "invisible");
      else {        
        deletTodosBtn.classList.add("opacity-0", "invisible");
        checkAll.checked = false
      }
        checkboxInputs = document.querySelectorAll("tbody input");

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
    addTodos(todos, 1);

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
  } else if (page == Math.ceil(todosCount / 10)) {
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
  addTodos(todos, page);
}