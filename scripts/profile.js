import {
  addToLocal,
  getToLocal,
  showSwal,
  showTost,
  addToShoppingCard,
} from "./funcs.js";

window.changePassword = changePassword;
window.changeProfile = changeProfile;

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

    tabWrapper.querySelectorAll(".tab-panel").forEach((el) => {
      el.classList.remove("active-panel");
      if (el.id === `${e.target.dataset.tab}`) {
        el.classList.add("active-panel");
        tabWrapper.style.height = el.offsetHeight + "px";
      }
    });
  }
});

aboutMe.addEventListener("input", changeTextAreaMaxLength);
window.addEventListener("DOMContentLoaded", () => {
  setValues();
  changeTextAreaMaxLength();
  tabWrapper.style.height = tabWrapper.firstElementChild.offsetHeight + "px";
});

document.querySelectorAll("#password-show").forEach((elem) => {
  elem.addEventListener("click", (e) => {
    if (e.target.previousElementSibling.type === "text") {
      e.target.previousElementSibling.type = "password";
      e.target.innerHTML = '<i class="fas fa-eye"></i>';
    } else {
      e.target.previousElementSibling.type = "text";
      e.target.innerHTML = '<i class="fas fa-eye-slash"></i>';
    }
  });
});

function changeProfile() {
  if (
    firstName.value.trim().length >= 3 &&
    lastName.value.trim().length >= 3 &&
    userName.value.trim().length >= 4
  ) {
    showSwal(
      "تغییر اطلاعات ",
      "آیا میخواهید اطلاعات خود را تغییر دهید؟",
      "warning",
      true,
      "تغییر اطلاعات"
    ).then((data) => {
      let user = getToLocal("user");
      if (data.isConfirmed) {
        user.firstName = firstName.value.trim();
        user.lastName = lastName.value.trim();
        user.age = age.value.trim();
        user.userName = userName.value.trim();
        user.email = email.value.trim();
        user.phone = phone.value.trim();
        user.address.country = country.value;
        user.address.city = city.value.trim();
        user.address.postalCode = postalCode.value.trim();
        user.bio = aboutMe.value.trim();

        addToLocal("user", user);
        showTost("success", "اطلاعات شما تغییر کرد!");
        setValues();
      }
    });
  }
  if (userName.value.trim().length < 3)
    showSwal(
      "",
      "نام کاربری باید حداقل 4 کاراکتر باشد!",
      "error",
      false,
      "باشه"
    );
  if (lastName.value.trim().length < 3)
    showSwal(
      "",
      "نام خانوادگی باید حداقل 3 کاراکتر باشد!",
      "error",
      false,
      "باشه"
    );
  if (firstName.value.trim().length < 3)
    showSwal("", "نام باید حداقل 3 کاراکتر باشد!", "error", false, "باشه");
}
function changePassword() {
  let currentPassword = document.querySelector("#user-password");
  let newPassword = document.querySelector("#user-new-password");
  let confirmNewPassword = document.querySelector("#user-new-password-confirm");
  let user = getToLocal("user");
  if (currentPassword.value.trim() === user.password) {
    if (newPassword.value.trim().length >= 6) {
      if (newPassword.value.trim() === confirmNewPassword.value.trim()) {
        if (newPassword.value.trim() === user.password) {
          showSwal(
            "رمز عبور جدید نمیتواند با رمز عبور فعلی یکسان باشد.",
            "",
            "error",
            false,
            "باشه"
          );
        } else {
          showSwal(
            "تغییر رمز عبور",
            "آیا میخواهید رمز عبور خود را تغییر دهید؟",
            "warning",
            true,
            "تغییر رمز عبور"
          ).then((data) => {
            if (data.isConfirmed) {
              user.password = newPassword.value.trim();
              addToLocal("user", user);
              showTost("success", "رمز عبور شما تغییر کرد!");
              currentPassword.value = "";
              newPassword.value = "";
              confirmNewPassword.value = "";
            }
          });
        }
      } else
        showSwal(
          "رمز عبور و تکرار آن یکسان نیستند.",
          "",
          "error",
          false,
          "باشه"
        );
    } else
      showSwal(
        "رمز عبور جدید باید حداقل 6 کاراکتر باشد!",
        "",
        "error",
        false,
        "باشه"
      );
  }
  if (
    currentPassword.value.trim() &&
    currentPassword.value.trim() !== user.password
  )
    showSwal("رمز عبور اشتباه است!", "", "error", false, "باشه");
}

function setValues() {
  let user = getToLocal("user");
  document.querySelector("#name").textContent =
    user.firstName + " " + user.lastName;
  document.querySelector("#role").textContent = user.role ? "مدیر" : "ادمین";
  document.querySelector("#address").textContent =
    user.address.city + " - " + user.address.country;
  document.querySelector("#bio").textContent = user.bio.trim();

  user.image ? (userImg.src = user.image) : "";
  bgImg.style.backgroundImage = user.bg ? `url("${user.bg}")` : "";
  firstName.value = user.firstName || "";
  lastName.value = user.lastName || "";
  userName.value = user.userName || "";
  email.value = user.email || "";
  phone.value = user.phone || "";
  age.value = user.age || "";
  country.value = user.address.country || "";
  city.value = user.address.city || "";
  postalCode.value = user.address.postalCode || "";
  aboutMe.value = user.bio.trim() || "";
}

function changeTextAreaMaxLength() {
  aboutMe.previousElementSibling.firstElementChild.textContent = `(${
    300 - aboutMe.value.length
  } کاراکتر)`;

  if (aboutMe.value.length >= 300) aboutMe.style.borderColor = "red";
  else aboutMe.style.borderColor = "";
}
