import { saveSubjects, loadSubjects } from './storage.js';

let timer;
let isRunning = false;
let time = 0;
let currentSubject = null;

const subjects = loadSubjects(); 

//tempo em MM:SS
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

// display de tempo
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
    // O resto do código permanece o mesmo...
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
    if (currentSubject) {
        currentSubject.time = 0;
        saveSubjects(subjects);
    }
    updateTimeDisplay();
}


function finish() {
    if (currentSubject) {
        alert(`Você estudou ${currentSubject.name} por ${formatTime(currentSubject.time)}.`);
        reset();
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
        existingSubject.views++;
    } else {
        const newSubject = { name: subjectName, time: 0, views: 1 };
        subjects.push(newSubject);
        currentSubject = newSubject;
    }

    saveSubjects(subjects);
    subjectInput.value = '';
    updateDashboardUI(subjects);
}


function updateDashboardUI(subjects) {
    const dashboardContainer = document.querySelector('.materia-caixa');
    dashboardContainer.innerHTML = '';

    if (subjects.length === 0) {
        const noSubjectsMessage = document.createElement('div');
        noSubjectsMessage.textContent = 'Nenhuma matéria adicionada.';
        dashboardContainer.appendChild(noSubjectsMessage);
        return;
    }

    subjects.forEach(subject => {
        const subjectElement = document.createElement('div');
        subjectElement.classList.add('subject-item');
        subjectElement.textContent = `${subject.name}: ${formatTime(subject.time)}`;
        subjectElement.addEventListener('click', () => selectSubject(subject));
        dashboardContainer.appendChild(subjectElement);
    });

    updateMostViewed(subjects);
}

function selectSubject(subject) {
    currentSubject = subject;
    time = subject.time;
    updateTimeDisplay();
}


function updateMostViewed(subjects) {
    const mostViewedList = document.getElementById('most-viewed-list');
    mostViewedList.innerHTML = '';

    const mostViewedSubjects = subjects.sort((a, b) => b.views - a.views).slice(0, 5);
    mostViewedSubjects.forEach(subject => {
        const listItem = document.createElement('div');
        listItem.textContent = `${subject.name} - Visualizações: ${subject.views}`;
        mostViewedList.appendChild(listItem);
    });
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

document.addEventListener('DOMContentLoaded', () => {
    populateSubjectSelect();
    initializeTimer();
    updateDashboardUI(subjects);
});