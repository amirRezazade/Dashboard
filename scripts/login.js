let loginBtn = document.querySelector("#login-btn");
let nameInput = document.querySelector("#user-name");
let passwordInput = document.querySelector("#password");
let showDemoLink = document.querySelector("#show-demo");
loginBtn.addEventListener("click", (e) => {
  if (nameInput.checkValidity() && passwordInput.checkValidity()) {
    e.preventDefault();
    Swal.fire({
      title: "کاربر یافت نشد!",
      text: "نام کاربری یا رمز عبور اشتباه است. لطفاً دوباره تلاش کنید یا ثبت‌ نام کنید.",
      icon: "error",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ثبت نام",
      cancelButtonText: "تصحیح",
    }).then((data) => {
      if (data.isConfirmed) window.location.href = "register.html";
    });
  }
});
showDemoLink.addEventListener("click", () => {
  let user = {
    firstName: "امیر",
    lastName: "رضازاده",
    userName: "amir-account",
    email: "amir-Rezazade@gmail.com",
    password: "amir-1382",
    phone: "09022222222",
    age: 22,
    address: {
      country: "Iran",
      city: "Tabriz",
      postalCode: 11111111111,
    },
    bio: "سلام من آنا آدام هستم، به همین سادگی خواهد بود. در واقع، آن را غربی خواهد بود. برای یک فرد انگلیسی، این مانند زبان انگلیسی ساده به نظر می رسد، همانطور که یکی از دوستان شکاکم کمبریجی به من گفت که زبان های اروپایی چه چیزی غربی هستند، زبان های اروپایی اعضای یک خانواده هستند.",
    password: "Amir-1382",
    role: "moderator",
  };
  window.localStorage.setItem("user", JSON.stringify(user));
  window.localStorage.setItem("firstLoginShown", false);

  window.location.href = "index.html";
});

document.querySelector("#password-show").addEventListener("click", (e) => {
  if (e.target.previousElementSibling.type === "text") {
    e.target.previousElementSibling.type = "password";
    e.target.innerHTML = '<i class="fas fa-eye"></i>';
  } else {
    e.target.previousElementSibling.type = "text";
    e.target.innerHTML = '<i class="fas fa-eye-slash"></i>';
  }
});

particlesJS.load("particles-js", "particlesjs-config.json", function () {});
