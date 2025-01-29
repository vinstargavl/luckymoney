const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spin-btn");
const finalValue = document.getElementById("final-value");
const popup = document.getElementById("popup");
const popupMessage = document.getElementById("popup-message");
const closePopupBtn = document.getElementById("close-popup");

// Object that stores values of minimum and maximum angle for a value
const rotationValues = [
  { minDegree: 0, maxDegree: 30, value: 1 },   // Number 1
  { minDegree: 31, maxDegree: 90, value: 5 },  // Number 2
  { minDegree: 91, maxDegree: 150, value: 10 }, // Number 3
  { minDegree: 151, maxDegree: 210, value: 1 }, // Number 4
  { minDegree: 211, maxDegree: 270, value: 4 }, // Number 5
  { minDegree: 271, maxDegree: 330, value: 3 }, // Number 6
  { minDegree: 331, maxDegree: 360, value: 2 }, // Number 1 again
];

// Size of each piece
const data = [16, 16, 16, 16, 16, 16];
// Background color for each piece
var pieColors = [
  "#8b35bc",
  "#b163da",
  "#8b35bc",
  "#b163da",
  "#8b35bc",
  "#b163da",
];

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
      showPopup(`you have received lucky money ${i.value}thoundsand VND`);
      spinBtn.disabled = false;
      break;
    }
  }
};

// Spinner count
let count = 0;
// Start with 100 rotations for animation and the last rotation for the result
let resultValue = 101;

// Start spinning
spinBtn.addEventListener("click", () => {
  spinBtn.disabled = true;
  // Empty final value
  finalValue.innerHTML = `<p>Good Luck!</p>`;

  // Set the final degree to always land on numbers 1, 2, or 6
  const validAngles = [
    Math.floor(Math.random() * (30 - 0 + 1)) + 0,        // Random angle for Number 2 (0 - 30)
    Math.floor(Math.random() * (90 - 31 + 1)) + 31,       // Random angle for Number 1 (31 - 90)
    Math.floor(Math.random() * (150 - 91 + 1)) + 91,    // Random angle for Number 6 (331 - 360)
  ];

  // Pick a random angle from the valid angles (1, 2, or 6)
  let randomDegree = validAngles[Math.floor(Math.random() * validAngles.length)];

  // Interval for rotation animation
  let rotationInterval = window.setInterval(() => {
    // Rotate the pie chart by the current result value
    myChart.options.rotation = myChart.options.rotation + resultValue;
    myChart.update();

    // If rotation exceeds 360, reset it back to 0
    if (myChart.options.rotation >= 360) {
      count += 1;
      resultValue -= 5;
      myChart.options.rotation = 0;
    } else if (count > 15 && myChart.options.rotation >= randomDegree) {
      valueGenerator(randomDegree); // Display the value at the correct angle
      clearInterval(rotationInterval); // Stop the rotation
      count = 0;
      resultValue = 101; // Reset the speed to initial value
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
});
