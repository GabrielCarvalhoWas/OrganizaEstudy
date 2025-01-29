import { loadSubjects, saveSubjects } from './storage.js';

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function updateDashboardUI(subjects) {
    const dashboardContainer = document.querySelector('.materia-caixa');
    dashboardContainer.innerHTML = '';

    // Ordena as matérias em ordem alfabética
    subjects.sort((a, b) => a.name.localeCompare(b.name));

    subjects.forEach(subject => {
        const subjectElement = document.createElement('div');
        subjectElement.classList.add('subject-item');
        subjectElement.textContent = `${subject.name} - Tempo: ${formatTime(subject.time)}`;

        // Botão de excluir
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Excluir';
        deleteButton.classList.add('delete-button'); 
        deleteButton.addEventListener('click', () => {
            deleteSubject(subject.name);
            updateDashboardUI(loadSubjects()); 
            updateOrderedSubjectsUI(loadSubjects()); // Atualiza a lista ordenada após exclusão
        });

        subjectElement.appendChild(deleteButton);
        dashboardContainer.appendChild(subjectElement);
    });

    updateOrderedSubjectsUI(subjects); 
}

function updateOrderedSubjectsUI(subjects) {
    const orderedSubjectsContainer = document.querySelector('.ordered-subjects');
    orderedSubjectsContainer.innerHTML = '';

    // Ordena as matérias em ordem alfabética
    subjects.sort((a, b) => a.name.localeCompare(b.name));

    subjects.forEach(subject => {
        const subjectElement = document.createElement('div');
        subjectElement.classList.add('ordered-subject-item');
        subjectElement.textContent = subject.name; 
        orderedSubjectsContainer.appendChild(subjectElement);
    });
}

function deleteSubject(subjectName) {
    let subjects = loadSubjects();
    subjects = subjects.filter(subject => subject.name !== subjectName);
    saveSubjects(subjects);
}


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

// Atualiza a UI ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    const subjects = loadSubjects();
    populateSubjectSelect();
    updateDashboardUI(subjects);
});


document.getElementById('filter-subjects').addEventListener('input', (event) => {
    const query = event.target.value.toLowerCase();
    const subjects = loadSubjects();
    const filteredSubjects = subjects.filter(subject => subject.name.toLowerCase().includes(query));
    updateDashboardUI(filteredSubjects);
});