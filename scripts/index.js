let dateElem = document.querySelector("#date");
let timeElem = document.querySelector("#time");

let date = new Date();
dateElem.textContent = `${date.getFullYear()}/${
  date.getMonth() + 1
}/${date.getDate()}`;

setInterval(() => {
  let time = new Date();
  timeElem.textContent = time.getHours() + ":" + time.getSeconds();
}, 1000);

const totalChart = document.getElementById("totalChart").getContext("2d");

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
  $('#map').vectorMap({
    map: 'world_mill',
    backgroundColor: 'transparent',
    zoomOnScroll: false,  
   //  zoomButtons: false, 
    regionStyle: {
      initial: { fill: '  #6a7282 ' }
    },
      markers: [
      { latLng: [32.4279, 53.6880], name: 'Iran' },
      { latLng: [37.0902, -95.7129], name: 'USA' },
      { latLng: [35.8617, 104.1954], name: 'China' },
      { latLng: [46.6034, 1.8883], name: 'France' }
    ],
    markerStyle: {
      initial: { fill: '#0ca593', stroke: '#fff', r: 6 }
    }
  });
  //   finish world map 
