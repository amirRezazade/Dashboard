import {
  addToLocal,
  getToLocal,
  showSwal,
  showTost,
  addToShoppingCard,
} from "./funcs.js";


const todosWrapper = document.querySelector('tbody')

getTodos()
async function getTodos() {
    let res = await fetch(`https://dummyjson.com/todos?limit=10&skip=0`)
    let response = await res.json()
    console.log(response);
    addTodos(response.todos)
}

function addTodos(list , page=1){

    list.forEach(todo => {
        todosWrapper.innerHTML+=`
           <tr class="p-1.5 md:p-3 flex transition-colors hover:bg-gray-500/20">
                         <td class=" centered w-1/10"><input class="accent-[var(--active-color)] cursor-pointer md:size-4 " type="checkbox"></td>
                         <td class=" centered w-4/10 text-center ${todo.completed ? 'line-through' : ''}">${todo.todo}</td>
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
                         <td class=" centered w-2/10 truncate flex items-center gap-2">${todo.completed ? '<i class="fas fa-check text-xs text-green-500 animate-pulse"></i>' : ''} ${todo.completed? 'تکمیل شده' : 'تکمیل نشده'} </td>
                         <td class=" centered w-1/10 flex items-center gap-1.5">
                         <button type="button" class="p-1 rounded-sm cursor-pointer text-blue-500" onclick="editTodo(84)"><i class="fa fa-edit"></i></button>
                         <button type="button" class="p-1 rounded-sm cursor-pointer text-red-500" onclick="removetodo(84)"><i class="fa fa-trash"></i></button>
                         </td>
                   </tr>
        `
        
    });
}