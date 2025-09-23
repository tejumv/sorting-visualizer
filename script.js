let array = [];
const container = document.getElementById("array-container");
const sortSelect = document.getElementById("sort-method");

// Generate Array
function generateArray() {
  const size = document.getElementById("size").value;
  array = [];
  container.innerHTML = "";
  for (let i = 0; i < size; i++) {
    array.push(Math.floor(Math.random() * 100) + 1);
  }
  renderArray();
  document.getElementById("method-container").classList.remove("hidden");
}

// Render Array
function renderArray(highlightIndices = []) {
  container.innerHTML = "";
  array.forEach((num, i) => {
    const card = document.createElement("div");
    card.classList.add("card");
    if (highlightIndices.includes(i)) card.classList.add("active");
    card.textContent = num;
    container.appendChild(card);
  });
}

// Sleep helper
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Swap DOM elements for sliding
function swapDOM(i, j) {
  const cards = container.children;
  const cardI = cards[i];
  const cardJ = cards[j];
  container.insertBefore(cardJ, cardI);
}

// Event listener for sort method
sortSelect.addEventListener("change", async () => {
  const method = sortSelect.value;
  if (method === "bubble") await bubbleSort();
  else if (method === "selection") await selectionSort();
  else if (method === "insertion") await insertionSort();
});

// Bubble Sort with sliding
async function bubbleSort() {
  const size = array.length;
  for (let i = 0; i < size - 1; i++) {
    for (let j = 0; j < size - i - 1; j++) {
      renderArray([j, j + 1]);
      await sleep(400);

      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        swapDOM(j, j + 1);
      }
    }
  }
  renderArray();
}

// Selection Sort with sliding
async function selectionSort() {
  const size = array.length;
  for (let i = 0; i < size; i++) {
    let minIdx = i;
    for (let j = i + 1; j < size; j++) {
      renderArray([minIdx, j]);
      await sleep(400);
      if (array[j] < array[minIdx]) minIdx = j;
    }
    if (minIdx !== i) {
      [array[i], array[minIdx]] = [array[minIdx], array[i]];
      swapDOM(i, minIdx);
    }
  }
  renderArray();
}

// Insertion Sort with sliding
async function insertionSort() {
  const size = array.length;
  for (let i = 1; i < size; i++) {
    let key = array[i];
    let j = i - 1;
    while (j >= 0 && array[j] > key) {
      renderArray([j, j + 1]);
      await sleep(400);
      array[j + 1] = array[j];
      swapDOM(j, j + 1);
      j--;
    }
    array[j + 1] = key;
  }
  renderArray();
}
