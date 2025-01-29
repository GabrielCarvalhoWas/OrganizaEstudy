// ui.js

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
        deleteButton.addEventListener('click', () => {
            deleteSubject(subject.name);
            updateDashboardUI(loadSubjects()); // Atualiza a UI após exclusão
        });

        subjectElement.appendChild(deleteButton);
        dashboardContainer.appendChild(subjectElement);
    });
}

function deleteSubject(subjectName) {
    let subjects = loadSubjects();
    subjects = subjects.filter(subject => subject.name !== subjectName);
    saveSubjects(subjects);
}

// Função para popular o select com as matérias
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