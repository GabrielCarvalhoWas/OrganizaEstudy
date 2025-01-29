import { saveSubjects, loadSubjects } from './storage.js';

let timer;
let isRunning = false;
let time = 0;
let currentSubject = null;

const subjects = loadSubjects(); 

// Tempo em MM:SS
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}


function updateTimeDisplay() {
    const timeDisplay = document.getElementById('time-display');
    if (timeDisplay) {
        timeDisplay.textContent = formatTime(time);
    }
}

function start() {
    const messageElement = document.getElementById('message');
    const subjectSelect = document.getElementById('subject-select');
    const selectedSubjectName = subjectSelect.value;

    if (!selectedSubjectName) {
        messageElement.textContent = "Selecione uma matéria para começar a estudar!";
        messageElement.style.display = 'block';
        return;
    }

    currentSubject = subjects.find(subject => subject.name === selectedSubjectName);
    
    if (!isRunning) {
        isRunning = true; 
        timer = setInterval(() => {
            time++; 
            updateTimeDisplay(); 
            if (currentSubject) {
                currentSubject.time++; 
            }
        }, 1000); 
    }
}

function pause() {
    if (isRunning) {
        clearInterval(timer);
        isRunning = false;
        saveSubjects(subjects);
        alert("Temporizador pausado.");
    }
}

function reset() {
    clearInterval(timer);
    isRunning = false;
    time = 0;
    updateTimeDisplay();
}

function finish() {
    if (currentSubject) {
        alert(`Você estudou ${currentSubject.name} por ${formatTime(currentSubject.time)}.`);
        currentSubject.time += time; 
        reset();
        saveSubjects(subjects); // Salva as alterações no Local Storage
    }
}

function addSubject() {
    const subjectInput = document.getElementById('subject-input');
    const subjectName = subjectInput.value.trim();

    if (!subjectName) {
        alert('Por favor, insira o nome da matéria.');
        return;
    }

    const existingSubject = subjects.find(subject => subject.name === subjectName);

    if (existingSubject) {
        existingSubject.time = 0;
    } else {
        const newSubject = { name: subjectName, time: 0, views: 1 };
        subjects.push(newSubject);
        currentSubject = newSubject;
    }

    saveSubjects(subjects);
    subjectInput.value = '';
    updateDashboardUI(subjects); 
}

function initializeTimer() {
    const startButton = document.getElementById('start');
    const pauseButton = document.getElementById('pause');
    const resetButton = document.getElementById('reset');
    const finishButton = document.getElementById('finish');
    const addSubjectButton = document.getElementById('add-subject');

    if (startButton) startButton.addEventListener('click', start);
    if (pauseButton) pauseButton.addEventListener('click', pause);
    if (resetButton) resetButton.addEventListener('click', reset);
    if (finishButton) finishButton.addEventListener('click', finish);
    if (addSubjectButton) addSubjectButton.addEventListener('click', addSubject);
}

document.addEventListener('DOMContentLoaded', () => {
    initializeTimer();
    updateDashboardUI(subjects);
    populateSubjectSelect(); 
});

function populateSubjectSelect() {
    const subjectSelect = document.getElementById('subject-select');
    const subjects = loadSubjects();

    subjects.forEach(subject => {
        const option = document.createElement('option');
        option.value = subject.name;
        option.textContent = subject.name;
        subjectSelect.appendChild(option);
    });
}