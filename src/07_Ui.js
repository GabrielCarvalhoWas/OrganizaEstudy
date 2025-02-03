import { carregarMaterias, salvarMaterias } from './06_LocalStorage.js';

function formatarTempo(segundos) {
    const minutos = Math.floor(segundos / 60);
    const secs = segundos % 60;
    return `${String(minutos).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function atualizarUIDoDashboard(materias) {
    const containerDashboard = document.querySelector('.materia-caixa');
    containerDashboard.innerHTML = '';

    // Ordena as matérias em ordem alfabética
    materias.sort((a, b) => a.name.localeCompare(b.name));

    materias.forEach(materia => {
        const elementoMateria = document.createElement('div');
        elementoMateria.classList.add('subject-item');
        elementoMateria.textContent = `${materia.name} - Tempo: ${formatarTempo(materia.time)}`;

        // Botão de excluir
        const botaoExcluir = document.createElement('button');
        botaoExcluir.textContent = 'Excluir';
        botaoExcluir.classList.add('delete-button'); 
        botaoExcluir.addEventListener('click', () => {
            excluirMateria(materia.name);
            atualizarUIDoDashboard(carregarMaterias()); 
            atualizarUIDoDashboardOrdenadas(carregarMaterias()); // Atualiza a lista ordenada após exclusão
        });

        elementoMateria.appendChild(botaoExcluir);
        containerDashboard.appendChild(elementoMateria);
    });

    atualizarUIDoDashboardOrdenadas(materias); 
}

function atualizarUIDoDashboardOrdenadas(materias) {
    const containerMateriasOrdenadas = document.querySelector('.ordered-subjects');
    containerMateriasOrdenadas.innerHTML = '';

    // Ordena as matérias em ordem alfabética
    materias.sort((a, b) => a.name.localeCompare(b.name));

    materias.forEach(materia => {
        const elementoMateria = document.createElement('div');
        elementoMateria.classList.add('ordered-subject-item');
        elementoMateria.textContent = materia.name; 
        containerMateriasOrdenadas.appendChild(elementoMateria);
    });
}

function excluirMateria(nomeMateria) {
    let materias = carregarMaterias();
    materias = materias.filter(materia => materia.name !== nomeMateria);
    salvarMaterias(materias);
}

function popularSeletorDeMaterias() {
    const seletorMateria = document.getElementById('subject-select');
    const materias = carregarMaterias();

    materias.forEach(materia => {
        const opcao = document.createElement('option');
        opcao.value = materia.name;
        opcao.textContent = materia.name;
        seletorMateria.appendChild(opcao);
    });
}

// Atualiza a UI ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    const materias = carregarMaterias();
    popularSeletorDeMaterias();
    atualizarUIDoDashboard(materias);
});

document.getElementById('filter-subjects').addEventListener('input', (event) => {
    const query = event.target.value.toLowerCase();
    const materias = carregarMaterias();
    const materiasFiltradas = materias.filter(materia => materia.name.toLowerCase().includes(query));
    atualizarUIDoDashboard(materiasFiltradas);
});