let array = [];

function generateArray() {
  const size = document.getElementById("size").value;
  array = [];
  for (let i = 0; i < size; i++) {
    array.push(Math.floor(Math.random() * 100) + 1);
  }
  renderArray();
}

function renderArray(highlightIndices = []) {
  const container = document.getElementById("array-container");
  container.innerHTML = "";
  array.forEach((num, i) => {
    const bar = document.createElement("div");
    bar.classList.add("bar");
    if (highlightIndices.includes(i)) bar.classList.add("active");
    bar.style.height = `${num * 3}px`; 
    bar.textContent = num;
    container.appendChild(bar);
  });
}

async function bubbleSort() {
  for (let i = 0; i < array.length - 1; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      renderArray([j, j + 1]);
      await sleep(500);
      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
      }
    }
  }
  renderArray();
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
