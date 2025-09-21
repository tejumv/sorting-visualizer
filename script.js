let array = [];

function generateArray() {
    array = [];
    for (let i = 0; i < 20; i++) {
        array.push(Math.floor(Math.random() * 300) + 20);
    }
    displayArray();
}

function displayArray(highlightIndices = []) {
    const container = document.getElementById('array-container');
    container.innerHTML = '';
    array.forEach((value, index) => {
        const bar = document.createElement('div');
        bar.classList.add('array-bar');
        if (highlightIndices.includes(index)) bar.classList.add('active');
        bar.style.height = `${value}px`;
        container.appendChild(bar);
    });
}

async function sortArray() {
    const algo = document.getElementById('algorithm').value;
    if (algo === 'bubble') await bubbleSort();
    else if (algo === 'selection') await selectionSort();
    else if (algo === 'insertion') await insertionSort();
    else if (algo === 'merge') await mergeSortWrapper();
}

// Utility to pause for visualization
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Bubble Sort
async function bubbleSort() {
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            displayArray([j, j+1]);
            await sleep(200);
            if (array[j] > array[j + 1]) {
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
                displayArray([j, j+1]);
                await sleep(200);
            }
        }
    }
    displayArray();
}

// Selection Sort
async function selectionSort() {
    for (let i = 0; i < array.length; i++) {
        let minIdx = i;
        for (let j = i + 1; j < array.length; j++) {
            displayArray([minIdx, j]);
            await sleep(200);
            if (array[j] < array[minIdx]) minIdx = j;
        }
        [array[i], array[minIdx]] = [array[minIdx], array[i]];
        displayArray([i, minIdx]);
        await sleep(200);
    }
    displayArray();
}

// Insertion Sort
async function insertionSort() {
    for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i - 1;
        while (j >= 0 && array[j] > key) {
            array[j + 1] = array[j];
            displayArray([j, j+1]);
            await sleep(200);
            j--;
        }
        array[j + 1] = key;
        displayArray([j+1]);
        await sleep(200);
    }
    displayArray();
}

// Merge Sort Wrapper
async function mergeSortWrapper() {
    array = await mergeSort(array);
    displayArray();
}

// Merge Sort
async function mergeSort(arr) {
    if (arr.length <= 1) return arr;
    const mid = Math.floor(arr.length / 2);
    const left = await mergeSort(arr.slice(0, mid));
    const right = await mergeSort(arr.slice(mid));
    return await merge(left, right);
}

async function merge(left, right) {
    let result = [];
    while (left.length && right.length) {
        displayArray(array.map(v => (left.includes(v) || right.includes(v)) ? v : 0));
        await sleep(200);
        if (left[0] < right[0]) result.push(left.shift());
        else result.push(right.shift());
    }
    result = result.concat(left).concat(right);
    array = result.concat(array.slice(result.length));
    displayArray();
    await sleep(200);
    return result;
}

// Generate initial array
generateArray();
