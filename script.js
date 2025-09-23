let array = [];

function generateArray() {
  const size = document.getElementById("size").value;
  array = [];
  for (let i = 0; i < size; i++) {
    array.push(Math.floor(Math.random() * 100) + 1);
  }
  renderArray();
  document.getElementById("method-container").classList.remove("hidden");

  document.getElementById("sort-method").addEventListener("change", () => {
    const method = document.getElementById("sort-method").value;
    document.getElementById("method-container").classList.add("hidden");
    if (method === "bubble") bubbleSort();
    else if (method === "selection") selectionSort();
    else if (method === "insertion") insertionSort();
  });
}

function renderArray(highlightIndices = []) {
  const container = document.getElementById("array-container");
  container.innerHTML = "";
  array.forEach((num, i) => {
    const card = document.createElement("div");
    card.classList.add("card");
    if (highlightIndices.includes(i)) card.classList.add("active");
    card.style.backgroundColor = pastelColor(i); // assign pastel colors
    card.textContent = num;
    container.appendChild(card);
  });
}

function pastelColor(index) {
  const colors = ["#cdb4db", "#ffc8dd", "#bde0fe", "#a2d2ff", "#fbc4ab", "#ffafcc"];
  return colors[index % colors.length];
}

async function bubbleSort() {
  for (let i = 0; i < array.length - 1; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      renderArray([j, j + 1]);
      await sleep(600);
      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
      }
    }
  }
  renderArray();
}

async function selectionSort() {
  for (let i = 0; i < array.length; i++) {
    let minIdx = i;
    for (let j = i + 1; j < array.length; j++) {
      renderArray([minIdx, j]);
      await sleep(600);
      if (array[j] < array[minIdx]) {
        minIdx = j;
      }
    }
    [array[i], array[minIdx]] = [array[minIdx], array[i]];
  }
  renderArray();
}

async function insertionSort() {
  for (let i = 1; i < array.length; i++) {
    let key = array[i];
    let j = i - 1;
    while (j >= 0 && array[j] > key) {
      renderArray([j, j + 1]);
      await sleep(600);
      array[j + 1] = array[j];
      j--;
    }
    array[j + 1] = key;
  }
  renderArray();
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
