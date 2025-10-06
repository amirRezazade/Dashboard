import {
  addToLocal,
  getToLocal,
  showSwal,
  showTost,
  addToShoppingCard,
  animatePulse,
} from "./funcs.js";

const usersContainer = document.querySelector("#users-container");
const sortingElem = document.querySelector('#sort-select-box')
const orderingElem = document.querySelector('#ordering')



window.removeUser = removeUser;
window.editUser = editUser;

let users = [];
getUsers();
async function getUsers() {
  usersContainer.innerHTML = animatePulse;
  let res = await fetch(`https://dummyjson.com/users?limit=150&select=id,image,firstName,lastName,gender,email,phone,age,username,role,'`);
  let response = await res.json();
  console.log(response);
  users = response.users;
  filtering();
}

function addUsers(list, page = 1) {
  usersContainer.innerHTML = "";
  list.splice(page * 10 - 10, 10).forEach((user) => {
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
      <td class=" centered w-4/15 " dir="ltr">${user.email}</td>
      <td class=" centered w-2/15 font-[dana-num]" dir="ltr">${user.phone}</td>
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
    let parameter = sortingElem.value
    console.log(parameter)
    let newUsers;
  if(orderingElem.value==='desc'){
    if(parameter==='age'){
        newUsers = users.sort((a,b)=> a.parameter - b.parameter)
    }else{
        console.log(`a.${parameter}.localeCompare(b.${parameter}));`);
        
        newUsers = users.sort((a, b) => a.parameter.localeCompare(b.parameter));
    }
    
}else{
     if(parameter==='age'){
         newUsers = users.sort((a,b)=> b.parameter - a.parameter)
        }else{
        newUsers = users.sort((a, b) => b.parameter.localeCompare(a.parameter));
    }
  }

  addUsers(newUsers);
}

sortingElem.addEventListener('change' , filtering)
orderingElem.addEventListener('change' , filtering)


function removeUser(id) {
  console.log(id);
}
function editUser(id) {
  console.log(id);
}
