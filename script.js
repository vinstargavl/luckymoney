const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spin-btn");
const finalValue = document.getElementById("final-value");
const popup = document.getElementById("popup");
const popupMessage = document.getElementById("popup-message");
const closePopupBtn = document.getElementById("close-popup");

// Object that stores values of minimum and maximum angle for a value
const rotationValues = [
  { minDegree: 0, maxDegree: 30, value: 1 },
  { minDegree: 31, maxDegree: 90, value: 5 },
  { minDegree: 91, maxDegree: 150, value: 10 },
  { minDegree: 151, maxDegree: 210, value: 7 },
  { minDegree: 211, maxDegree: 270, value: 4 },
  { minDegree: 271, maxDegree: 330, value: 3 },
  { minDegree: 331, maxDegree: 360, value: 2 },
];

// Size of each piece
const data = [16, 16, 16, 16, 16, 16];
// Background color for each piece
var pieColors = ["#8b35bc", "#b163da", "#8b35bc", "#b163da", "#8b35bc", "#b163da"];

// Create chart
let myChart = new Chart(wheel, {
  plugins: [ChartDataLabels],
  type: "pie",
  data: {
    labels: [5, 1, 20, 40, 50, 10],
    datasets: [
      {
        backgroundColor: pieColors,
        data: data,
      },
    ],
  },
  options: {
    responsive: true,
    animation: { duration: 0 },
    plugins: {
      tooltip: false,
      legend: { display: false },
      datalabels: {
        color: "#ffffff",
        formatter: (_, context) => context.chart.data.labels[context.dataIndex],
        font: { size: 24 },
      },
    },
  },
});

// Function to display value based on angle
const valueGenerator = (angleValue) => {
  for (let i of rotationValues) {
    if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
      finalValue.innerHTML = `<p>Value: ${i.value}</p>`;

      // Vô hiệu hóa nút spin
      spinBtn.disabled = true;

      // Hiển thị pop-up sau 2 giây
      setTimeout(() => {
        showPopup(`Bạn đã nhận được lì xì ${i.value} nghìn VND(nhớ quay video màn hình rồi gửi cho quang để nhận thưởng)`);
      }, 2000);

      break;
    }
  }
};

// Spinner count
let count = 0;
let resultValue = 101;

// Start spinning
spinBtn.addEventListener("click", () => {
  spinBtn.disabled = true;
  finalValue.innerHTML = `<p>Good Luck!</p>`;

  const validAngles = [
    Math.floor(Math.random() * (210 - 151 + 1)) + 151,
    Math.floor(Math.random() * (90 - 31 + 1)) + 31,
    Math.floor(Math.random() * (150 - 91 + 1)) + 91,
  ];

  let randomDegree = validAngles[Math.floor(Math.random() * validAngles.length)];

  let rotationInterval = window.setInterval(() => {
    myChart.options.rotation = myChart.options.rotation + resultValue;
    myChart.update();

    if (myChart.options.rotation >= 360) {
      count += 1;
      resultValue -= 5;
      myChart.options.rotation = 0;
    } else if (count > 15 && myChart.options.rotation >= randomDegree) {
      clearInterval(rotationInterval);
      count = 0;
      resultValue = 101;

      valueGenerator(randomDegree);
    }
  }, 10);
});

// Function to show pop-up
const showPopup = (message) => {
  popupMessage.textContent = message;
  popup.classList.add("show");
};

// Close the pop-up when the close button is clicked
closePopupBtn.addEventListener("click", () => {
  popup.classList.remove("show");
  spinBtn.disabled = false; // Bật lại nút spin sau khi đóng pop-up
});
