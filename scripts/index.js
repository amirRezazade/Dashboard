let dateElem = document.querySelector("#date");
let timeElem = document.querySelector("#time");
const totalChart = document.getElementById("totalChart").getContext("2d");

window.addEventListener("DOMContentLoaded", () => {
  if (!getToLocal("top-products")) getTopProducts().then(addTopProducts());
  else addTopProducts();
});
let date = new Date();
dateElem.textContent = `${date.getFullYear()}/${
  date.getMonth() + 1
}/${date.getDate()}`;

setInterval(() => {
  let time = new Date();
  timeElem.textContent = time.getHours() + ":" + time.getSeconds();
}, 1000);

const myChart = new Chart(totalChart, {
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
function addToLocal(key , value){
    localStorage.setItem(key , JSON.stringify(value))
}
function getToLocal(key) {
  return JSON.parse(localStorage.getItem(key));
}
async function getTopProducts() {
  let res = await fetch(
    "https://dummyjson.com/products?sortBy=rating&order=desc&limit=30&skip=30&select=title,price,rating,thumbnail,stock,id,discountPercentage"
  );
  let response = await res.json();
  let products = response.products;
  localStorage.setItem("top-products", JSON.stringify(products));
}


function addTopProducts(page = 1) {

  let container = document.querySelector("#top-product-container");
  container.innerHTML = "";
  let products = getToLocal("top-products")
  let filterProducts = [...products]
  filterProducts.splice(page*5-1 , 5).forEach(product => {
    container.innerHTML += `
        <tr class="transition-colors hover:bg-gray-500/20 p-3 flex justify-between items-center">
          <td class="w-2/6">
            <div class="flex items-center gap-1.5">
              <span class="size-12 rounded-lg shrink-0 bg-gray-500/20"><img src="${product.thumbnail}" class="object-cover" alt="product"></span>
              <a href="product.html?id=${product.id}" dir="ltr" class="truncate">${product.title}</a>
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


 let page=1
              
      let topProductPagination = document.querySelector("#top-product-pagination");
      topProductPagination.addEventListener("click", (e) => {ProductPagination(e)});

      function ProductPagination (e){
        if(e==1) {
            topProductPagination.querySelectorAll("button").forEach((elem) => elem.classList.remove("active-page"));
            topProductPagination.querySelector('.prev').disabled = true
            topProductPagination.querySelector('.next').disabled = false
            topProductPagination.querySelector('.one').textContent=1
            topProductPagination.querySelector('.one').classList.add('active-page')
            topProductPagination.querySelector('.two').textContent=2
            topProductPagination.querySelector('.three').textContent=3
        }
  if (e.target.nodeName == "BUTTON") {
      topProductPagination.querySelectorAll("button").forEach((elem) => elem.classList.remove("active-page"));
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
    if (e.target.classList.contains("next") && page<=5) {
      page++      
    }
    
    
    if(page==1){
       topProductPagination.querySelector('.prev').disabled = true
       topProductPagination.querySelector('.next').disabled = false
       topProductPagination.querySelector('.one').textContent=page
       topProductPagination.querySelector('.one').classList.add('active-page')
       topProductPagination.querySelector('.two').textContent=page+1
       topProductPagination.querySelector('.three').textContent=page+2
    }
    else if(page==5){
       topProductPagination.querySelector('.prev').disabled = false
       topProductPagination.querySelector('.next').disabled = true
       topProductPagination.querySelector('.three').textContent=page
       topProductPagination.querySelector('.three').classList.add('active-page')
       topProductPagination.querySelector('.two').textContent=page-1
       topProductPagination.querySelector('.one').textContent=page-2
    }
    else{
       topProductPagination.querySelector('.prev').disabled = false
       topProductPagination.querySelector('.next').disabled = false
       topProductPagination.querySelector('.two').textContent=page
       topProductPagination.querySelector('.two').classList.add('active-page')
       topProductPagination.querySelector('.one').textContent=page-1
       topProductPagination.querySelector('.three').textContent=page+1
    }     
     addTopProducts(page)
  }
}
      

let isDescending = false

document.querySelector('#top-products-sorting-methods').addEventListener('click' , e=>{
  let products = [...getToLocal('top-products')]
  
  if(e.target.nodeName=='BUTTON'){
   if (isDescending) {
  if (e.target.classList.contains('title')) {
    products = products.sort((a, b) => a.title.localeCompare(b.title));
  }
  if (e.target.classList.contains('price')) {
    products = products.sort((a, b) => a.price - b.price);
  }
  if (e.target.classList.contains('stock')) {
    products = products.sort((a, b) => a.stock - b.stock);
  }
  if (e.target.classList.contains('rating')) {
    products = products.sort((a, b) => a.rating - b.rating);
  }
  if (e.target.classList.contains('discountPercentage')) {
    products = products.sort((a, b) => a.discountPercentage - b.discountPercentage);
  }
} else {
  if (e.target.classList.contains('title')) {
    products = products.sort((a, b) => b.title.localeCompare(a.title));
  }
  if (e.target.classList.contains('price')) {
    products = products.sort((a, b) => b.price - a.price);
  }
  if (e.target.classList.contains('stock')) {
    products = products.sort((a, b) => b.stock - a.stock);
  }
  if (e.target.classList.contains('rating')) {
    products = products.sort((a, b) => b.rating - a.rating);
  }
  if (e.target.classList.contains('discountPercentage')) {
    products = products.sort((a, b) => b.discountPercentage - a.discountPercentage);
  }
}
        

    addToLocal('top-products' ,products)
    isDescending = !isDescending
    addTopProducts(1)
    ProductPagination(1)
  }
})
// addTopProducts()
// getTopProducts()
