import {
  addToLocal,
  getToLocal,
  showSwal,
  showTost,
  addToShoppingCard,
} from "./funcs.js";

const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get("id");

const firstName = document.getElementById('first-name')
const lastName = document.getElementById('last-name')
const email = document.getElementById('email')
const userName = document.getElementById('user-name')
const phone = document.getElementById('phone')
const password = document.getElementById('password')
const country = document.getElementById('country')
const city = document.getElementById('city')
const address = document.getElementById('address')
const postalCode = document.getElementById('postalCode')
const iban = document.getElementById('iban')
const cartNumber = document.getElementById('cart-number')
const cartYear = document.getElementById('cart-year')
const cartMount = document.getElementById('cart-month')
const requiredInputs = document.querySelectorAll("input[required]");
const cancelBtn = document.getElementById('cancel-btn')
const submitBtn = document.getElementById('submit-btn')
if (userId) {
  getUser();
  submitBtn.textContent = "ویرایش محصول";
  cancelBtn.textContent = "حذف محصول";
}

async function getUser() {
  let res = await fetch(`https://dummyjson.com/users/${userId||1}`)
  let response = await res.json()
firstName.value = response.firstName
lastName.value = response.lastName
email.value = response.email
userName.value = response.username
phone.value = response.phone
password.value = response.password
country.value = response.address.country
city.value = response.address.city
address.value = response.address.address
postalCode.value = response.address.postalCode
cartNumber.value = response.bank.cardNumber
cartYear.value = response.bank.cardExpire[0] + response.bank.cardExpire[1]
cartMount.value = response.bank.cardExpire[3] + response.bank.cardExpire[4]
iban.value =  response.bank.iban

  const userImage = {
    name: "product.jpg",
    size: 0.7,
    type: "image/jpeg",
    url: response.image,
    accepted: true,
  };
  profile.emit("addedfile", userImage);
  profile.emit("thumbnail", userImage, userImage.url);
  profile.emit("complete", userImage);
  profile.files.push(userImage);
}

Dropzone.autoDiscover = false;
const profile = new Dropzone("#user-photo", {
  url: "#",
  autoProcessQueue: false,
  maxFiles: 1,
  maxFilesize: 1,
  acceptedFiles: "image/*",
  dictDefaultMessage: " عکس کاربر را وارد کنید",
  addRemoveLinks: true,
  dictRemoveFile: "حذف تصویر",
  dictFileTooBig: "حجم تصویر زیاد است (حداکثر: {{maxFilesize}}MB)",
});

submitBtn.addEventListener("click", () => {
  if (formValidation()) submitUser()
  
});
function formValidation() {
  let isValid = true;

  requiredInputs.forEach((elem) => {
    if (!elem.checkValidity()) {
        elem.nextElementSibling.classList.remove("hidden");
        elem.classList.replace("border-transparent", "border-red-700");
        isValid = false;
    } else {
        elem.nextElementSibling.classList.add("hidden");
        elem.classList.replace("border-red-700", "border-transparent");
    }

    if (country.value === "all") {
      country.nextElementSibling.classList.remove("hidden");
      country.classList.replace("border-transparent" , "border-red-600");
      isValid = false;
    } else {
      country.nextElementSibling.classList.add("hidden");
      country.classList.replace("border-red-600" , "border-transparent");
    }
  });

  return isValid;
}

async function submitUser() {
  showSwal(
      userId ? "ویرایش اطلاعات کاربر" : "اضافه کردن کاربر",
      userId
        ? "آیا میخواهید اطلاعات این کاربر را تغییر دهید؟"
        : "آیا میخواهید این کاربر را اضافه کنید؟",
      "warning",
      true,
      "تایید"
    ).then((data) => {
        if (data.isConfirmed) {
  
          fetch(`https://dummyjson.com/users/${userId ? userId : 'add'}`, {
            method: userId ? "PUT" : "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              firstName: firstName.value,
              lastName:lastName.value,
              email: email ,
              username: userName.value,
              phone: phone.value,
              password: password.value,
              address: {
                country: country.value,
                city: city.value,
                address: address.value,
                postalCode: postalCode.value,
              },
              bank: {
                iban: iban.value,
                cartNumber: cartNumber.value,
                cardExpire: `${cartYear.value}/${cartMount.value}`,
                postalCode: postalCode.value,
              },
            }),
          })
            .then((res) => res.json())
            .then(
              showTost('success' , userId ? "مشخصات کاربر آپدیت شد!" : "کاربر اضافه شد!" )
            )
            .catch((error) => {
              console.log(error);
              showTost("error", "مشکلی پیش آمد دوباره امتحان کنید!");
            });
        }
      });
}

cancelBtn.addEventListener("click", () => {
  if (userId) deleteUser();
  else {
    showSwal(
      "انصراف",
      "آیا مطمئن هستید که می‌خواهید انصراف دهید ؟ اطلاعات ذخیره نخواهند شد.",
      "warning",
      true,
      "تایید"
    ).then((e) => {
      if (e.isConfirmed) window.location.href = "index.html";
    });
  }
});
function deleteUser() {
  showSwal(
    "حذف کاربر",
    "آیا مطمئن هستید که می‌خواهید این کاربر را حذف کنید؟ این عمل قابل بازگشت نیست.",
    "warning",
    true,
    "تایید"
  ).then((e) => {
    if (e.isConfirmed) {
      fetch(`https://dummyjson.com/users/${userId}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then(
          showTost("success", "کاربر با موفقیت حذف شد!"),
          setTimeout(() => {
            (window.location.href = "user-add.html")
          }, 2500)
        );
    }
  });
}

cartMount.addEventListener('input' , ()=>{
  if(cartMount.value.length > 2)  cartMount.value = cartMount.value.slice(0, 2);
})
cartYear.addEventListener('input' , ()=>{
  if(cartYear.value.length > 2)  cartYear.value = cartYear.value.slice(0, 2);
})
  phone.addEventListener('input', () => {
    phone.value = phone.value.replace(/[^0-9]/g, '');
  });