let array = [];

function generateArray() {
  const size = parseInt(document.getElementById("array-size").value);
  array = [];
  for (let i = 0; i < size; i++) {
    array.push(Math.floor(Math.random() * 100) + 1); // numbers 1-100
  }
  displayArray();
}

function displayArray(highlightIndices = []) {
  const container = document.getElementById("array-container");
  container.innerHTML = "";

  array.forEach((num, idx) => {
    const square = document.createElement("div");
    square.classList.add("square");
    if (highlightIndices.includes(idx)) {
      square.classList.add("active");
    }
    square.innerText = num;
    container.appendChild(square);
  });
}

// Sleep function for animation delays
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Bubble Sort with animation
async function bubbleSort() {
  let n = array.length;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      displayArray([j, j + 1]);
      await sleep(500);

      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        displayArray([j, j + 1]);
        await sleep(500);
      }
    }
  }
  displayArray(); // final sorted array
}

// Generate default array on load
generateArray();
