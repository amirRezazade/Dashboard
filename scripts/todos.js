import { addToLocal, getToLocal, showSwal, showTost, addToShoppingCard } from "./funcs.js";

window.removeTodo = removeTodo;
window.editTodo = editTodo;
window.changeDeletTodosBtn = changeDeletTodosBtn;

const todosWrapper = document.querySelector("#todos-container");
const checkAll = document.querySelector("#check-all");
const paginationElem = document.querySelector("#todos-pagination");
const deletTodosBtn = document.querySelector("#remove-todos");
const statusSelectbox = document.querySelector("#status");
const searchInput = document.querySelector("#search");
let mainTodos = [];
let todos = [];
let page = 1;
let todosCount;
let checkboxInputs;

// start event listeners
window.addEventListener("DOMContentLoaded", () => {
  getTodos();
});
paginationElem.addEventListener("click", (e) => {
  if (e.target.nodeName === "BUTTON") {
    pagination(e);
  }
});
checkAll.addEventListener("click", () => {
  if (checkAll.checked === true) {
    checkboxInputs.forEach((elem) => (elem.checked = true));
    changeDeletTodosBtn();
  } else {
    checkboxInputs.forEach((elem) => (elem.checked = false));
    changeDeletTodosBtn();
  }
});
statusSelectbox.addEventListener("change", filtering);
deletTodosBtn.addEventListener("click", removeTodos);
document.querySelector("#add-todo-btn").addEventListener("click", addTodo);
searchInput.addEventListener("input", () => {
  filtering();
});
// finish event listeners

async function getTodos() {
  let res = await fetch(`https://dummyjson.com/todos?limit=100`);
  let response = await res.json();
  mainTodos = response.todos;
  todosCount = mainTodos.length;
  filtering();
}
function addTodos(list, page = 1) {
  todosWrapper.innerHTML = "";
  if (list.length == 0) todosWrapper.innerHTML = `<div class=" my-5 block h-auto max-h-[200px] sm:max-h-[350px] centered overflow-hidden"><img class="object-cover aspect-square max-w-sm sm:max-w-xl" src="images/item-notfound.png" alt="item-notfound"></div>`;
  if (list.length <= 10) paginationElem.style.display = "none";
  else paginationElem.style.display = "flex";
  document.querySelector("#total-todos-count").textContent = list.length;
  [...list].splice(page * 10 - 10, 10).forEach((todo) => {
    todosWrapper.innerHTML += `
           <tr class="px-1.5 md:px-3 h-14 flex transition-opacity duration-500 hover:bg-gray-500/20" data-id="${todo.id}">
                         <td class=" centered w-1/10"><input class="accent-[var(--active-color)] cursor-pointer md:size-4 " type="checkbox" oninput="changeDeletTodosBtn()"></td>
                         <td class=" centered w-4/10 text-center ${todo.completed ? "line-through" : ""}">${todo.todo}</td>
                         <td class=" centered w-2/10">
                            <div class="flex flex-nowrap select-none">
                                <a href="javascript: void(0);" class="relative group -mr-2.5 bg-[var(--bg-color)] rounded-full border border-[var(--bg-color)] transition-transform duration-500 hover:-translate-y-2 hover:z-10" >           
                                  <img src="images/profile (1).png" alt="" class="rounded-full size-7"> 
                                  <span class="py-1 px-2 bg-[var(--active-color)] text-white rounded absolute !z-10 left-1/2 -top-1/1 -translate-1/2 after:contetn-[''] after:absolute after:top-1/1 after:left-1/2 after:-translate-1/2 after:size-3 after:rotate-45 after:bg-[var(--active-color)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300 text-xs text-nowrap">Abigail Rivera</span>       
                                </a>
                                <a href="javascript: void(0);" class="relative group -mr-2.5 bg-[var(--bg-color)] rounded-full border border-[var(--bg-color)] transition-transform duration-500 hover:-translate-y-2 hover:z-10" >           
                                  <img src="images/profile (1).png" alt="" class="rounded-full size-7"> 
                                  <span class="py-1 px-2 bg-[var(--active-color)] text-white rounded absolute !z-10 left-1/2 -top-1/1 -translate-1/2 after:contetn-[''] after:absolute after:top-1/1 after:left-1/2 after:-translate-1/2 after:size-3 after:rotate-45 after:bg-[var(--active-color)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300 text-xs text-nowrap">Sofia Mitchell</span>       
                                </a>
                                <a href="javascript: void(0);" class="relative group -mr-2.5 bg-[var(--bg-color)] rounded-full border border-[var(--bg-color)] transition-transform duration-500 hover:-translate-y-2 hover:z-10">           
                                  <img src="images/profile (1).png" alt="" class="rounded-full size-7"> 
                                  <span class="py-1 px-2 bg-[var(--active-color)] text-white rounded absolute !z-10 left-1/2 -top-1/1 -translate-1/2 after:contetn-[''] after:absolute after:top-1/1 after:left-1/2 after:-translate-1/2 after:size-3 after:rotate-45 after:bg-[var(--active-color)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300 text-xs text-nowrap">James Davis</span>       
                                </a>
                              
                            </div>
                         </td>
                         <td class=" centered w-2/10 truncate flex items-center gap-2">${todo.completed ? '<i class="fas fa-check text-xs text-green-500 animate-pulse"></i>' : ""} ${todo.completed ? "تکمیل شده" : "تکمیل نشده"} </td>
                         <td class=" centered w-1/10 flex items-center gap-1.5">
                         <button type="button" class="p-1 rounded-sm cursor-pointer text-blue-500" onclick="editTodo(this)"><i class="fa fa-edit"></i></button>
                         <button type="button" class="p-1 rounded-sm cursor-pointer text-red-500" onclick="removeTodo(this)"><i class="fa fa-trash"></i></button>
                         </td>
                   </tr>
        `;
  });
  checkboxInputs = document.querySelectorAll("tbody input");
}
function filtering() {
  todos = [...mainTodos];
  let value = searchInput.value.toLowerCase().trim();

  if (statusSelectbox.value !== "all") {
    let status = statusSelectbox.value == "true" ? true : false;
    todos = [...mainTodos].filter((elem) => elem.completed == status);
  }
  if (value.length > 1) {
    todos = [...todos].filter((t) => t.todo.toLowerCase().includes(value));
  }
  pagination(1);
}
function removeTodo(elem) {
  let li = elem.closest("tr");
  let id = li.dataset.id;
  showSwal("حذف کار", "آیا میخواهید این کار را حذف کنید؟", "warning", true, "حذف").then((data) => {
    if (data.isConfirmed) {
      fetch(`https://dummyjson.com/todos/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then(() => {
          showTost("success", "کار با موفقیت حذف شد!");
          let itemIndex = mainTodos.findIndex((e) => e.id == id);
          let todoIndex = todos.findIndex((e) => e.id == id);
          mainTodos.splice(itemIndex, 1);
          todos.splice(todoIndex, 1);
          li.classList.add("opacity-0");
          setTimeout(() => li.remove(), 500);
          document.querySelector("#total-todos-count").textContent = todos.length;
          todosCount = todos.length;
        })
        .catch(() => showTost("error", "مشکلی پیش آمد. دوباره امتحان کنید!"));
    }
  });
}
function removeTodos() {
  showSwal("حذف کارها", "آیا میخواهید این کارها را حذف کنید؟", "warning", true, "حذف").then((data) => {
    if (data.isConfirmed) {
      checkboxInputs.forEach((elem) => {
        if (elem.checked === true) {
          let li = elem.closest("tr");
          let id = li.dataset.id;
          let itemIndex = mainTodos.findIndex((e) => e.id == id);
          let todoIndex = todos.findIndex((e) => e.id == id);
          mainTodos.splice(itemIndex, 1);
          todos.splice(todoIndex, 1);
          filtering();
          changeDeletTodosBtn();
          checkAll.checked = false;
        }
      });
      showTost("success", "کارها با موفقیت حذف شدند!");
    }
  });
}
function editTodo(elem) {
  let li = elem.closest("tr");
  let id = li.dataset.id;
  let itemIndex = mainTodos.findIndex((e) => e.id == id);
  let todoIndex = todos.findIndex((e) => e.id == id);

  Swal.fire({
    title: "ویرایش اطلاعات کار",
    html: `
        <form class="w-full max-w-xs mx-auto text-[var(--text-color)] text-xs flex flex-col ">     
      <label class="mb-1 sm:mb-2 mt-2 sm:mt-4 cursor-pointer text-start" for="todo">کار:</label>
      <input id="todo" type="text" required  class=" bg-[var(--bg-color)] p-3 outline-0 rounded-lg border border-gray-500/80 focus:border-[var(--active-color)]" value="${todos[todoIndex].todo}">
          <span class="mb-1 sm:mb-2 mt-7 text-start">وضعیت</span>
      <select id="edit-status" class=" border border-gray-500/80 focus:border-[var(--active-color)] outline-0 cursor-pointer w-full bg-[var(--bg-color)] p-2 md:p-3 rounded-lg ">
           <option ${todos[todoIndex].completed ? "selected" : ""} value="true">تکمیل شده</option>
          <option ${!todos[todoIndex].completed ? "selected" : ""} value="false">تکمیل نشده</option>
      </select>    
    </form>
    `,
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonText: "ذخیره",
    cancelButtonText: "انصراف",
    cancelButtonColor: "#dd3333",
    preConfirm: () => {
      const todo = document.getElementById("todo").value.trim();
      const completed = document.getElementById("edit-status").value.trim();

      if (todo.length < 5) {
        Swal.showValidationMessage("کار باید حداقل 5 کاراکتر باشد!");
        return false;
      }
      return { todo, completed };
    },
  }).then((result) => {
    if (result.isConfirmed) {
      showSwal("ویرایش کار", "آیا میخواهید اطلاعات این کار را تغییر دهید؟", "warning", true, "بله").then((res) => {
        if (res.isConfirmed) {
          let obj = {
            todo: result.value.todo,
            completed: result.value.completed == "true" ? true : false,
            id: todos[todoIndex].id,
          };
          todos[todoIndex] = obj;
          mainTodos[itemIndex] = obj;
          filtering();
          showTost("success", "اطلاعات کار با موفقیت بروزرسانی شد.");
        }
      });
    }
  });
}
function addTodo() {
  Swal.fire({
    title: "افزودن کار",
    html: `
        <form class="w-full max-w-xs mx-auto text-[var(--text-color)] text-xs flex flex-col ">     
      <label class="mb-1 sm:mb-2 mt-2 sm:mt-4 cursor-pointer text-start" for="add-todo">کار:</label>
      <input id="add-todo" type="text" required  class=" bg-[var(--bg-color)] p-3 outline-0 rounded-lg border border-gray-500/80 focus:border-[var(--active-color)]">
          <span class="mb-1 sm:mb-2 mt-7 text-start">وضعیت</span>
      <select id="add-status" class=" border border-gray-500/80 focus:border-[var(--active-color)] outline-0 cursor-pointer w-full bg-[var(--bg-color)] p-2 md:p-3 rounded-lg ">
           <option value="true">تکمیل شده</option>
           <option selected value="false">تکمیل نشده</option>
      </select>    
    </form>
    `,
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonText: "ذخیره",
    cancelButtonText: "انصراف",
    cancelButtonColor: "#dd3333",
    preConfirm: () => {
      const todo = document.getElementById("add-todo").value.trim();
      const completed = document.getElementById("add-status").value.trim();

      if (todo.length < 5) {
        Swal.showValidationMessage("کار باید حداقل 5 کاراکتر باشد!");
        return false;
      }
      return { todo, completed };
    },
  }).then((result) => {
    if (result.isConfirmed) {
      showSwal("افزودن کار", "آیا میخواهید این کار را اضافه کنید؟", "warning", true, "بله").then((res) => {
        if (res.isConfirmed) {
          let obj = {
            todo: result.value.todo,
            completed: result.value.completed == "true" ? true : false,
            id: todos.length + 1,
          };
          todos.unshift(obj);
          mainTodos.unshift(obj);
          filtering();
          showTost("success", " کار با موفقیت اضافه شد.");
        }
      });
    }
  });
}
function changeDeletTodosBtn() {
  let isOneChecked = [...checkboxInputs].some((elem) => elem.checked === true);
  if (isOneChecked) deletTodosBtn.classList.remove("opacity-0", "invisible");
  else {
    deletTodosBtn.classList.add("opacity-0", "invisible");
    checkAll.checked = false;
  }
  checkboxInputs = document.querySelectorAll("tbody input");
}
function pagination(e) {
  if (e === 1) {
    page = 1;
    paginationElem.querySelectorAll("button").forEach((elem) => elem.classList.remove("active-page"));

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
  paginationElem.querySelectorAll("button").forEach((elem) => elem.classList.remove("active-page"));

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
  todosCount = todos.length;
  addTodos(todos, page);
}
