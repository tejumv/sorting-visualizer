let array = [];

function generateArray() {
    const size = parseInt(document.getElementById('array-size').value);
    array = [];
    for (let i = 0; i < size; i++) {
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

// Pause for animation
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Bubble Sort
async function bubbleSort() {
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            displayArray([j, j + 1]);
            await sleep(200);
            if (array[j] > array[j + 1]) {
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
                displayArray([j, j + 1]);
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
            displayArray([j, j + 1]);
            await sleep(200);
            j--;
        }
        array[j + 1] = key;
        displayArray([j + 1]);
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
    let l = 0, r = 0;
    while (l < left.length && r < right.length) {
        let leftVal = left[l];
        let rightVal = right[r];
        let highlightIndices = [];
        if (array.includes(leftVal)) highlightIndices.push(array.indexOf(leftVal));
        if (array.includes(rightVal)) highlightIndices.push(array.indexOf(rightVal));
        displayArray(highlightIndices);
        await sleep(200);

        if (leftVal < rightVal) {
            result.push(leftVal);
            l++;
        } else {
            result.push(rightVal);
            r++;
        }
    }
    result = result.concat(left.slice(l)).concat(right.slice(r));
    array = result.concat(array.slice(result.length));
    displayArray();
    await sleep(200);
    return result;
}

// Generate initial array
generateArray();
