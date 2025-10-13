import {
  showSwal,
  showTost,
} from "./funcs.js";
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");
const name = document.querySelector("#name");
const sku = document.querySelector("#sku");
const category = document.querySelector("#category ");
const brand = document.querySelector("#brand");
const tags = document.querySelector("#tags");
const tagsContainer = document.querySelector("#tags-container");
const width = document.querySelector("#width");
const height = document.querySelector("#height");
const depth = document.querySelector("#depth");
const weight = document.querySelector("#weight");
const price = document.querySelector("#price");
const stock = document.querySelector("#stock");
const discount = document.querySelector("#discount ");
const shipping = document.querySelector("#shipping");
const warranty = document.querySelector("#warranty");
const returnElem = document.querySelector("#return");
const productThumbnail = document.querySelector("#product-thumbnail");
const submitBtn = document.querySelector("#submit-btn");
const cancelBtn = document.querySelector("#cancel-btn");
const requiredInputs = document.querySelectorAll("input[required]");

let editorValue;
ClassicEditor.create(document.querySelector("#editor"), {
  language: {
    ui: "fa",
    content: "fa",
  },
})
  .then((editor) => {
    editorValue = editor;
    editor.editing.view.change((writer) => {
      writer.setAttribute("dir", "rtl", editor.editing.view.document.getRoot());
    });
  })
  .catch((error) => {
    console.error(error);
  });
if (productId) {
  getItem();
  submitBtn.textContent = "ویرایش محصول";
  cancelBtn.textContent = "حذف محصول";
}
async function getItem() {
  let res = await fetch(`https://dummyjson.com/products/${productId}`);
  let product = await res.json();
  name.value = product.title || "";
  sku.value = product.sku || "";
  category.value = product.category || "all";
  brand.value = product.brand || "";
  width.value = product.dimensions.width || "";
  height.value = product.dimensions.height || "";
  depth.value = product.dimensions.depth || "";
  weight.value = product.weight || "";
  price.value = product.price || "";
  stock.value = product.stock || 0;
  discount.value = product.discountPercentage || 0;
  discount.nextElementSibling.textContent =
    product.discountPercentage + "%" || 0 + "%";
  shipping.value = product.shippingInformation || "all";
  warranty.value = product.warrantyInformation || "No warranty";
  returnElem.value = product.returnPolicy || "No return policy";
  editorValue.setData(`${product.description}`) || "";
  product.tags.forEach(
    (tag) =>
      (tagsContainer.innerHTML +=
        ` <div class="flex items-center  divide-x divide-gray-300 bg-[var(--active-color)] text-white  text-xs overflow-hidden rounded-r-full"><span class="p-2">${tag}</span> <button type="button" class="p-2 cursor-pointer centered" onclick="parentElement.remove()">X</button></div>` ||
        "")
  );

  const thumbnailImage = {
    name: "product.jpg",
    size: 0.7,
    type: "image/jpeg",
    url: product.thumbnail,
    accepted: true,
  };
  thumbnail.emit("addedfile", thumbnailImage);
  thumbnail.emit("thumbnail", thumbnailImage, thumbnailImage.url);
  thumbnail.emit("complete", thumbnailImage);
  thumbnail.files.push(thumbnailImage);
  product.images.forEach((img) => {
    const itemImage = {
      name: "product.jpg",
      size: 0.7,
      type: "image/jpeg",
      url: img,
      accepted: true,
    };
    gallery.emit("addedfile", itemImage);
    gallery.emit("thumbnail", itemImage, itemImage.url);
    gallery.emit("complete", itemImage);
    gallery.files.push(itemImage);
  });
}

tags.addEventListener("keyup", (e) => {
  if (e.code === "Enter" && tags.value.trim()) {
    if (tagsContainer.childElementCount < 8) {
      tagsContainer.nextElementSibling.classList.add("hidden");
      tagsContainer.innerHTML += `
         <div class="flex items-center  divide-x divide-gray-300 bg-[var(--active-color)] text-white  text-xs overflow-hidden rounded-r-full"><span class="p-2">${tags.value.trim()}</span> <button type="button" class="p-2 cursor-pointer centered" onclick="parentElement.remove()">X</button></div>`;
      tags.value = "";
    } else tagsContainer.nextElementSibling.classList.remove("hidden");
  }
});

// start dropzone library
Dropzone.autoDiscover = false;
const gallery = new Dropzone("#product-gallery", {
  url: "#",
  autoProcessQueue: false,
  maxFiles: 5,
  maxFilesize: 1,
  acceptedFiles: "image/*",
  dictDefaultMessage:
    "📸 عکس های محصول را اینجا بکشید یا کلیک کنید برای انتخاب",
  addRemoveLinks: true,
  dictRemoveFile: "حذف تصویر",
  dictFileTooBig: "حجم تصویر زیاد است (حداکثر: {{maxFilesize}}MB)",
});

Dropzone.autoDiscover = false;
const thumbnail = new Dropzone("#product-thumbnail", {
  url: "#",
  autoProcessQueue: false,
  maxFiles: 1,
  maxFilesize: 1,
  acceptedFiles: "image/*",
  dictDefaultMessage: " عکس  محصول را اینجا بکشید یا کلیک کنید برای انتخاب",
  addRemoveLinks: true,
  dictRemoveFile: "حذف تصویر",
  dictFileTooBig: "حجم تصویر زیاد است (حداکثر: {{maxFilesize}}MB)",
});

// finish dropzone library

submitBtn.addEventListener("click", () => {
  if (formValidation()) submitProduct();
});

function formValidation() {
  let isValid = true;
  if (price.value.length == 0 || price.value < 1) {
    price.parentElement.nextElementSibling.classList.remove("hidden");
    price.parentElement.classList.replace(
      "border-transparent",
      "border-red-700"
    );
    isValid = false;
  } else {
    price.parentElement.nextElementSibling.classList.add("hidden");
    price.parentElement.classList.replace(
      "border-red-700",
      "border-transparent"
    );
  }
  requiredInputs.forEach((elem) => {
    if (!elem.checkValidity()) {
      if (elem.nextElementSibling) {
        elem.nextElementSibling.classList.remove("hidden");
        elem.classList.replace("border-transparent", "border-red-700");
        isValid = false;
      }
    } else {
      if (elem.nextElementSibling) {
        elem.nextElementSibling.classList.add("hidden");
        elem.classList.replace("border-red-700", "border-transparent");
      }
    }
  });

  document.querySelectorAll("select[required]").forEach((select) => {
    if (select.value === "all") {
      select.nextElementSibling.classList.remove("hidden");
      select.classList.add("border-red-600");
      isValid = false;
    } else {
      select.nextElementSibling.classList.add("hidden");
      select.classList.remove("border-red-600");
    }
  });
  if (editorValue.getData() === "") {
    document.querySelector(".ck-editor").style.border = "1px solid red";
    document.querySelector("#editor-alert").classList.remove("hidden");
    isValid = false;
  } else {
    document.querySelector(".ck-editor").style.border = "";
    document.querySelector("#editor-alert").classList.add("hidden");
  }
  if (thumbnail.getAcceptedFiles().length == 0) {
    productThumbnail.nextElementSibling.classList.remove("hidden");
    productThumbnail.classList.add("!border-red-700");
    isValid = false;
  } else {
    productThumbnail.nextElementSibling.classList.add("hidden");
    productThumbnail.classList.remove("!border-red-700");
  }
  return isValid;
}

cancelBtn.addEventListener("click", () => {
  if (productId) deleteProduct();
  else {
    showSwal(
      "انصراف",
      "آیا مطمئن هستید که می‌خواهید انصراف دهید ؟ اطلاعات ذخیره نخواهند شد.",
      "warning",
      true,
      "تایید"
    ).then((e) => {
      if (e.isConfirmed) window.location.href = "products.html";
    });
  }
});
function deleteProduct() {
  showSwal(
    "حذف محصول",
    "آیا مطمئن هستید که می‌خواهید این محصول را حذف کنید؟ این عمل قابل بازگشت نیست.",
    "warning",
    true,
    "تایید"
  ).then((e) => {
    if (e.isConfirmed) {
      fetch(`https://dummyjson.com/products/${productId}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then(
          showTost("success", "محصول با موفقیت حذف شد!"),
          setTimeout(() => {
            (window.location.href = "product-add.html")
          }, 1500)
        );
    }
  });
}

function submitProduct() {
  showSwal(
    productId ? "ویرایش محصول" : "اضافه کردن محول",
    productId
      ? "آیا میخواهید مشخصات این محصول را تغییر دهید؟"
      : "آیا میخواهید این محصول را اضافه کنید؟",
    "warning",
    true,
    "تایید"
  ).then((data) => {
    if (data.isConfirmed) {
      let images = [];
      gallery.getAcceptedFiles().forEach((img) => images.push(img.url));
      let tags = [];
      tagsContainer
        .querySelectorAll("div span")
        .forEach((elem) => tags.push(elem.textContent));

      fetch(`https://dummyjson.com/products/${productId ? productId : "add"}`, {
        method: productId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: name.value,
          sku: sku.value,
          description: editorValue.getData(),
          price: price.value,
          stock: stock.value,
          discountPercentage: discount.value,
          shippingInformation: shipping.value,
          warrantyInformation: warranty.value,
          returnPolicy: returnElem.value,
          category: category.value,
          brand: brand.value,
          tags: tags,
          dimensions: {
            width: width.value,
            height: height.value,
            depth: depth.value,
          },
          weight: weight.value,
          thumbnail: thumbnail.getAcceptedFiles()[0].url,
          images: images,
        }),
      })
        .then((res) => res.json())
        .then(
          showTost('success' , productId? "مشخصات محصول آپدیت شد!" :  "محصول اضافه شد!" )
        )
        .catch((error) => {
          console.log(error);
          showTost("error", "مشکلی پیش آمد دوباره امتحان کنید!");
        });
    }
  });
}
