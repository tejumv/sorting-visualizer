let array = [];
const container = document.getElementById("array-container");
const sortSelect = document.getElementById("sort-method");

const colors = ["#cdb4db", "#ffc8dd", "#bde0fe", "#a2d2ff", "#c7f9cc", "#fbc4ab"];

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

function renderArray(highlightIndices = []) {
  container.innerHTML = "";
  const cardWidth = 80;
  const gap = 30; // more spacing to avoid overlap

  array.forEach((num, i) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.style.left = `${i * (cardWidth + gap)}px`;
    card.style.backgroundColor = colors[i % colors.length];
    card.textContent = num;
    if (highlightIndices.includes(i)) card.classList.add("active");
    container.appendChild(card);
  });
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Sliding animation for swapping cards
async function swapCards(i, j) {
  const cards = Array.from(container.children);
  const cardI = cards[i];
  const cardJ = cards[j];
  const distance = cardJ.offsetLeft - cardI.offsetLeft;

  cardI.style.transform = `translateX(${distance}px)`;
  cardJ.style.transform = `translateX(${-distance}px)`;

  await sleep(500);

  // Reset transform
  cardI.style.transform = '';
  cardJ.style.transform = '';

  // Swap in array
  [array[i], array[j]] = [array[j], array[i]];
  renderArray();
}

sortSelect.addEventListener("change", async () => {
  const method = sortSelect.value;
  if (method === "bubble") await bubbleSort();
  else if (method === "selection") await selectionSort();
  else if (method === "insertion") await insertionSort();
});

// Bubble Sort
async function bubbleSort() {
  for (let i = 0; i < array.length - 1; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      renderArray([j, j + 1]);
      await sleep(300);
      if (array[j] > array[j + 1]) {
        await swapCards(j, j + 1);
      }
    }
  }
  renderArray();
}

// Selection Sort
async function selectionSort() {
  for (let i = 0; i < array.length; i++) {
    let minIdx = i;
    for (let j = i + 1; j < array.length; j++) {
      renderArray([minIdx, j]);
      await sleep(300);
      if (array[j] < array[minIdx]) minIdx = j;
    }
    if (minIdx !== i) {
      await swapCards(i, minIdx);
    }
  }
  renderArray();
}

// Insertion Sort
async function insertionSort() {
  for (let i = 1; i < array.length; i++) {
    let key = array[i];
    let j = i - 1;

    while (j >= 0 && array[j] > key) {
      renderArray([j, j + 1]);
      await sleep(300);
      await swapCards(j, j + 1);
      j--;
    }
  }
  renderArray();
}
