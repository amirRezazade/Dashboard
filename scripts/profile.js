import {
  addToLocal,
  getToLocal,
  showSwal,
  showTost,
  addToShoppingCard,
} from "./funcs.js";

const userImg = document.querySelector("#user-profile-photo");
const userImgInput = document.querySelector("#profile-photo-input");
const bgImg = document.querySelector("#bg-photo");
const bgImgInput = document.querySelector("#bg-photo-input");
const firstName = document.querySelector("#first-name");
const lastName = document.querySelector("#last-name");
const userName = document.querySelector("#user-name");
const email = document.querySelector("#user-email");
const phone = document.querySelector("#user-phone");
const age = document.querySelector("#user-age");
const country = document.querySelector("#user-country");
const city = document.querySelector("#user-city");
const postalCode = document.querySelector("#user-postalCode");
const aboutMe = document.querySelector("#user-about-me");

const tabBtns = document.querySelector("#tab-btns");
const tabWrapper = document.querySelector("#tab-container");

userImgInput.addEventListener("change", () => {
  let file = userImgInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      userImg.src = e.target.result;
      let user = getToLocal("user");
      user.image = e.target.result;
      addToLocal("user", user);
    };
    reader.readAsDataURL(file);
  }
});
bgImgInput.addEventListener("change", () => {
  let file = bgImgInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      bgImg.style.backgroundImage = `url("${e.target.result}")`;
      let user = getToLocal("user");
      user.bg = e.target.result;
      addToLocal("user", user);
    };
    reader.readAsDataURL(file);
  }
});
tabBtns.addEventListener("click", (e) => {
  if (e.target.nodeName === "BUTTON") {
    tabBtns
      .querySelectorAll("button")
      .forEach((elem) => elem.classList.remove("before:!w-full"));
    e.target.classList.add("before:!w-full");
    tabWrapper.querySelectorAll('.tab-content').forEach(el=> {
      el.classList.add('hidden')
      
    })
    tabWrapper.querySelector(`#${e.target.dataset.tab}`).classList.remove('hidden')
  }
});

aboutMe.addEventListener("input", changeTextAreaMaxLength);
window.addEventListener("DOMContentLoaded",()=>{
  setValues()
  changeTextAreaMaxLength()
} );

document.querySelectorAll('#password-show').forEach(elem=>{
  elem.addEventListener('click' , e=>{
    if(e.target.previousElementSibling.type==='text'){
                e.target.previousElementSibling.type='password'
                e.target.innerHTML='<i class="fas fa-eye"></i>'
            }else{
                e.target.previousElementSibling.type='text'
                e.target.innerHTML='<i class="fas fa-eye-slash"></i>'
            }
        })
 })


 function setValues() {
  let user = getToLocal("user");
 document.querySelector('#name').textContent = user.firstName +' ' + user.lastName
 document.querySelector('#role').textContent = user.role ? 'مدیر' : 'ادمین'
 document.querySelector('#address').textContent = user.address.city + ' - ' + user.address.country


  user.image ? userImg.src = user.image : '';
  bgImg.style.backgroundImage = user.bg ? `url("${user.bg}")` : '';
  firstName.value= user.firstName || ''
  lastName.value= user.lastName || ''
  userName.value= user.userName || ''
  email.value= user.email || ''
  phone.value= user.phone || ''
  age.value= user.age || ''
  country.value= user.address.country || ''
  city.value= user.address.city || ''
  postalCode.value= user.address.postalCode || ''
  aboutMe.value= user.bio || ''
}

function changeTextAreaMaxLength() {
  aboutMe.previousElementSibling.firstElementChild.textContent =`(${300 - aboutMe.value.length} کاراکتر)`
    
  if (aboutMe.value.length >= 300) aboutMe.style.borderColor = "red";
  else aboutMe.style.borderColor = "";
}
