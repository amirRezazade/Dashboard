import { addToLocal, getToLocal } from "./funcs.js";

let dateElem = document.querySelector("#date");
let timeElem = document.querySelector("#time");
const totalChart = document.getElementById("totalChart").getContext("2d");
const categoryChart = document.getElementById("top-category");

window.addEventListener("DOMContentLoaded", () => {
  if (!getToLocal("top-products")) getTopProducts().then(addTopProducts());
  else addTopProducts();
  getAndAddOrders();
  document.querySelector('#user-name').textContent= getToLocal('user').firstName 
});
let date = new Date();
dateElem.textContent = `${date.getFullYear()}/${
  date.getMonth() + 1
}/${date.getDate()}`;

setInterval(() => {
  let time = new Date();
  timeElem.textContent = time.getHours() + ":"+ time.getMinutes() + ":" + time.getSeconds();
}, 1000);

// start total chart section
const myTotalChart = new Chart(totalChart, {
  type: "bar",
  data: {
    labels: [
      "Far",
      "Ord",
      "Kho",
      "Tir",
      "Mor",
      "Sha",
      "Meh",
      "Aba",
      "Azr",
      "Dey",
      "Bah",
      "Esf",
    ],

    datasets: [
      {
        label: "درآمد(میلیون)",
        data: [5, 10, 5, 8, 8, 14, 20, 22, 15, 18, 22, 25],
        backgroundColor: "#1dbba5ab",
        hoverBackgroundColor: "#0ab39c",
        barPercentage: 0.6,
        categoryPercentage: 0.6,
        maxBarThickness: 50,
        yAxisID: "saleY",
      },
      {
        label: "هزینه(میلیون)",
        data: [8, 15, 7, 5, 10, 15, 18, 15, 10, 14, 18, 15],
        backgroundColor: "#ef502fc4",
        hoverBackgroundColor: "#f06548",
        barPercentage: 0.6,
        categoryPercentage: 0.6,
        maxBarThickness: 50,
        yAxisID: "saleY",
      },
      {
        type: "line",
        label: "مشتری اضافه شده(هزار نفر)",
        legend: "test",
        data: [2, 4, 5, 3, 7, 8, 10, 10, 6, 9, 10, 8],
        backgroundColor: "#0051e72b",
        borderColor: "#2a5fc1",
        fill: true,
        borderWidth: "2",
        borderStyle: "dashed",
        pointRadius: 0,
        tension: 0.3,
        borderDash: [10, 5],
        yAxisID: "userY",
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index",
      intersect: false,
    },
    scales: {
      saleY: {
        position: "left",
        grid: {
          display: false,
        },
        max: 30,
        ticks: {
          callback: function (value) {
            return value.toFixed(0);
          },
        },
      },
      userY: {
        position: "right",
        max: 40,
        grid: {
          display: false,
        },
        ticks: {
          callback: function (value) {
            return value.toFixed(0);
          },
        },
      },
    },
    plugins: {
      zoom: {
        zoom: {
          wheel: { enabled: true },
          pinch: { enabled: true },
          mode: "x",
        },
      },
      legend: {
        display: true,
        position: "bottom",
        labels: {
          usePointStyle: true, // به جای مربع از شکل نقطه استفاده کن
          pointStyle: "circle", // اینجا circle انتخاب کردی
          padding: 20, // فاصله بین legendها
        },
      },
    },
  },
});
// finish total chart section
// start category chart section
const myCategoryChart = new Chart(categoryChart, {
  type: "doughnut",
  data: {
    labels: ["زیبایی", "گوشی‌های هوشمند", "عطرها", "سایر"],
    datasets: [
      {
        label: "هزار سفارش",
        data: [200, 180, 130, 300],
        backgroundColor: [
          "#FF6384", // زیبایی
          "#36A2EB", // گوشی‌های هوشمند
          "#FFCE56", // عطرها
          "#9966FF", // سایر
        ],
        // hoverOffset:5
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "10%",
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          // color: "#6a7282",
          padding: 20,
          font: {
            size: 14, // می‌تونی سایز رو هم تغییر بدی
          },
        },
      },
      datalabels: {
        color: "white", // رنگ متن داخل دایره
        font: {
          // weight: "bold",
          size: 14,
        },
        formatter: (value, myCategoryChart) => {
          let sum = myCategoryChart.chart.data.datasets[0].data.reduce(
            (a, b) => a + b,
            0
          );
          let percentage = ((value * 100) / sum).toFixed(1) + "%";
          return percentage;
        },
      },
    },
  },
  plugins: [ChartDataLabels],
});
// finish category chart section

//   start world map
$("#map").vectorMap({
  map: "world_mill",
  backgroundColor: "transparent",
  zoomOnScroll: false,
  //  zoomButtons: false,
  regionStyle: {
    initial: { fill: "  #6a7282 " },
  },
  markers: [
    { latLng: [32.4279, 53.688], name: "Iran" },
    { latLng: [37.0902, -95.7129], name: "USA" },
    { latLng: [35.8617, 104.1954], name: "China" },
    { latLng: [46.6034, 1.8883], name: "France" },
  ],
  markerStyle: {
    initial: { fill: "#0ca593", stroke: "#fff", r: 6 },
  },
});
//   finish world map

async function getTopProducts() {
  let res = await fetch(
    "https://dummyjson.com/products?sortBy=rating&order=desc&limit=30&skip=30&select=title,price,rating,thumbnail,stock,id,discountPercentage"
  );
  let response = await res.json();
  let products = response.products;
  localStorage.setItem("top-products", JSON.stringify(products));
}
async function getAndAddOrders(page = 1) {
  let res = await fetch("orders.json");
  let response = await res.json();
  let container = document.querySelector("#resent-orders-container");
  container.innerHTML = "";
  response.splice(page * 5 - 1, 5).forEach((order) => {
    container.innerHTML += `
           <tr class="transition-colors hover:bg-gray-500/20 h-12 sm:h-15  flex justify-between items-center">
                    <td class="w-1/6 text-center">${order.orderId}</td>
                    <td class="w-1/6 text-center">${order.date}</td>
                    <td class="w-1/6 text-center">${order.customerName}</td>
                    <td class="w-1/6 text-center">${order.phone}</td>
                    <td class="w-1/6 text-center">${order.address}</td>
                    <td class="w-1/6 text-center">${order.paymentType}</td>
                    <td class="w-1/6 flex items-center justify-center gap-1 sm:gap-2.5"><span class="size-2.5 rounded-full ${
                      order.status == "تکمیل شد" ? "inline-block" : "hidden"
                    } bg-green-500 animate-pulse"></span>
                    <span class="size-2.5 rounded-full ${
                      order.status == "لغو شد" ? "inline-block" : "hidden"
                    } bg-red-500 animate-pulse"></span>
                    <span class="size-2.5 rounded-full ${
                      order.status == "در حال پردازش"
                        ? "inline-block"
                        : "hidden"
                    } bg-amber-500 animate-pulse"></span>${order.status}</td>
                  </tr>
    `;
  });
}

function addTopProducts(page = 1) {
  let container = document.querySelector("#top-product-container");
  container.innerHTML = "";
  let products = getToLocal("top-products");
  let filterProducts = [...products];
  filterProducts.splice(page * 5 - 1, 5).forEach((product) => {
    container.innerHTML += `
        <tr class="transition-colors hover:bg-gray-500/20 p-1.5 xs:p-3 flex justify-between items-center">
          <td class="w-2/6">
            <div class="flex items-center gap-1.5">
              <a href="product-details.html?id=${product.id}" class="size-12 rounded-lg shrink-0 bg-gray-500/20"><img src="${product.thumbnail}" class="object-cover" alt="product"></a>
              <a href="product-details.html?id=${product.id}" dir="ltr" class="truncate">${product.title}</a>
            </div>
          </td>
          <td class="w-1/6 text-center">$${product.price}</td>
          <td class="w-1/6 text-center">${product.stock}</td>
          <td class="w-1/6 text-center">${product.discountPercentage}%</td>
          <td class="w-1/6 text-center">${product.rating}</td>
        </tr>
                  `;
  });
}

let topProductPage = 1;
let resentOrdersPage = 1;

let topProductPagination = document.querySelector("#top-product-pagination");
let resentOrdersPagination = document.querySelector("#resent-orders-pagination");
topProductPagination.addEventListener("click", (e) => {
  pagination(e, topProductPagination);
  addTopProducts(topProductPage);
});
resentOrdersPagination.addEventListener("click", (e) => {
  pagination(e, resentOrdersPagination);
  getAndAddOrders(resentOrdersPage);
});

function pagination(e, elem) {
  let page;
  if (elem == resentOrdersPagination) page = resentOrdersPage;
  if (elem == topProductPagination) page = topProductPage;

  if (e == 1) {
    elem
      .querySelectorAll("button")
      .forEach((elem) => elem.classList.remove("active-page"));
    elem.querySelector(".prev").disabled = true;
    elem.querySelector(".next").disabled = false;
    elem.querySelector(".one").textContent = 1;
    elem.querySelector(".one").classList.add("active-page");
    elem.querySelector(".two").textContent = 2;
    elem.querySelector(".three").textContent = 3;
    return "";
  }

  if (e.target.nodeName == "BUTTON") {
    elem
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
    if (e.target.classList.contains("next") && page <= 5) {
      page++;
    }

    if (page == 1) {
      elem.querySelector(".prev").disabled = true;
      elem.querySelector(".next").disabled = false;
      elem.querySelector(".one").textContent = page;
      elem.querySelector(".one").classList.add("active-page");
      elem.querySelector(".two").textContent = page + 1;
      elem.querySelector(".three").textContent = page + 2;
    } else if (page == 5) {
      elem.querySelector(".prev").disabled = false;
      elem.querySelector(".next").disabled = true;
      elem.querySelector(".three").textContent = page;
      elem.querySelector(".three").classList.add("active-page");
      elem.querySelector(".two").textContent = page - 1;
      elem.querySelector(".one").textContent = page - 2;
    } else {
      elem.querySelector(".prev").disabled = false;
      elem.querySelector(".next").disabled = false;
      elem.querySelector(".two").textContent = page;
      elem.querySelector(".two").classList.add("active-page");
      elem.querySelector(".one").textContent = page - 1;
      elem.querySelector(".three").textContent = page + 1;
    }

    if (elem == resentOrdersPagination) resentOrdersPage = page;
    if (elem == topProductPagination) topProductPage = page;
  }
}

let isDescending = false;

document
  .querySelector("#top-products-sorting-methods")
  .addEventListener("click", (e) => {
    let products = [...getToLocal("top-products")];
    if (e.target.nodeName == "BUTTON") {
      products.sort((a, b) => {
        if (e.target.dataset.sort == "title") {
          return isDescending
            ? b.title.localeCompare(a.title)
            : a.title.localeCompare(b.title);
        }
        return isDescending
          ? b[e.target.dataset.sort] - a[e.target.dataset.sort]
          : a[e.target.dataset.sort] - b[e.target.dataset.sort];
      });
      addToLocal("top-products", products);
      isDescending = !isDescending;
      addTopProducts(1);
      pagination(1, topProductPagination);
    }
  });


  document.querySelector('#totalChartBtns').addEventListener('click' , e=>{
    if(e.target.nodeName==='BUTTON'){
      document.querySelectorAll('#totalChartBtns button').forEach(btn=>{
        btn.classList.remove('!bg-[var(--active-color)]' , 'text-white')
        if(btn==e.target){
          btn.classList.add('!bg-[var(--active-color)]' , 'text-white')

        }
      })
    }
  })