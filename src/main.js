import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'


document.querySelector('#app').innerHTML = `
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1>Hello Vite!</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite logo to learn more
    </p>
  </div>
`

const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const finishButton = document.getElementById('finish');
const subjectInput = document.getElementById('subject-input');
const addSubjectButton = document.getElementById('add-subject');
const timeDisplay = document.getElementById('time-display');
const dashboardContent = document.getElementById('dashboard-content');
let timer;
let timeElapsed = 0;
let isRunning = false;
let subjects = [];

function updateDisplay() {
  const minutes = Math.floor(timeElapsed / 60);
  const seconds = timeElapsed % 60;
  timeDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function startTimer() {
  if (subjects.length === 0) {
    alert('Por favor, adicione uma matéria antes de começar!');
    return;
  }
  if (isRunning) return;
  timer = setInterval(() => {
    timeElapsed++;
    updateDisplay();
  }, 1000);
  isRunning = true;
  startButton.disabled = true;
  pauseButton.disabled = false;
  resetButton.disabled = false;
  finishButton.disabled = false;
}

function pauseTimer() {
  clearInterval(timer);
  isRunning = false;
  startButton.disabled = false;
  pauseButton.disabled = true;
}

function resetTimer() {
  clearInterval(timer);
  timeElapsed = 0;
  updateDisplay();
  isRunning = false;
  startButton.disabled = false;
  pauseButton.disabled = true;
  resetButton.disabled = true;
}

function finishPomodoro() {
  const subject = subjectInput.value.trim();
  if (subject) {
    subjects.push({ name: subject, time: timeElapsed });
    updateDashboard();
    resetTimer();
    alert(`Pomodoro finalizado para a matéria: ${subject}`);
  } else {
    alert('Por favor, adicione uma matéria primeiro!');
  }
}

function addSubject() {
  const subject = subjectInput.value.trim();
  if (subject && !subjects.some(sub => sub.name === subject)) {
    subjects.push({ name: subject, time: 0 });
    updateDashboard();
    subjectInput.value = '';
    startButton.disabled = false;
  } else {
    alert('Digite uma matéria válida!');
  }
}

function updateDashboard() {
  dashboardContent.innerHTML = '';
  subjects.forEach(subject => {
    const subjectElement = document.createElement('p');
    subjectElement.textContent = `${subject.name}: ${Math.floor(subject.time / 60)}:${subject.time % 60}`;
    dashboardContent.appendChild(subjectElement);
  });
}

addSubjectButton.addEventListener('click', addSubject);
startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
finishButton.addEventListener('click', finishPomodoro);

updateDisplay();
