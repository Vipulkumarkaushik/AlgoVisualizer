const container = document.getElementById('bar-container');
const sizeSlider = document.getElementById('size');
const speedSlider = document.getElementById('speed');
const startBtn = document.getElementById('start');
const shuffleBtn = document.getElementById('shuffle');
const toggleThemeBtn = document.getElementById('toggleTheme');
const algorithmSelect = document.getElementById('algorithm');
const description = document.getElementById('description');
const complexity = document.getElementById('complexity');
const codeBlock = document.getElementById('code');

let array = [];
let speed = 50;

function generateBars(size) {
  container.innerHTML = '';
  array = Array.from({ length: size }, () => Math.floor(Math.random() * 300) + 10);
  array.forEach(value => {
    const bar = document.createElement('div');
    bar.style.height = `${value}px`;
    bar.classList.add('bar');
    container.appendChild(bar);
  });
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function bubbleSort() {
  const bars = document.getElementsByClassName('bar');
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        bars[j].style.height = `${array[j]}px`;
        bars[j + 1].style.height = `${array[j + 1]}px`;
      }
      await sleep(100 - speed);
    }
  }
}

function updateInfo(algo) {
  const info = {
    bubble: {
      text: 'Bubble Sort compares adjacent elements and swaps them if they are in the wrong order.',
      time: 'O(n^2)',
      code: 'for i in 0 to n-1:
  for j in 0 to n-i-1:
    if arr[j] > arr[j+1]:
      swap arr[j] and arr[j+1]'
    }
    // Add more algorithms here
  };
  description.textContent = info[algo]?.text || 'Algorithm info coming soon.';
  complexity.textContent = info[algo]?.time || '-';
  codeBlock.textContent = info[algo]?.code || '';
}

sizeSlider.addEventListener('input', () => generateBars(sizeSlider.value));
speedSlider.addEventListener('input', () => speed = speedSlider.value);
shuffleBtn.addEventListener('click', () => generateBars(sizeSlider.value));
toggleThemeBtn.addEventListener('click', () => document.body.classList.toggle('dark'));
algorithmSelect.addEventListener('change', () => updateInfo(algorithmSelect.value));
startBtn.addEventListener('click', () => {
  const algo = algorithmSelect.value;
  if (algo === 'bubble') bubbleSort();
});

// Initial setup
generateBars(sizeSlider.value);
updateInfo(algorithmSelect.value);
