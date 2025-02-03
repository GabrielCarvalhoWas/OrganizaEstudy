import { carregarMaterias } from './06_LocalStorage.js';

let grafico;

function inicializarGrafico() {
    const ctx = document.getElementById('barchart').getContext('2d');
    grafico = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [], 
            datasets: [{
                label: 'Tempo de Estudo (em segundos)',
                data: [], 
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(75, 192, 192, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(75, 192, 192, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function atualizarGrafico(top3Materias) {
    grafico.data.labels = top3Materias.map(materia => materia.name);
    grafico.data.datasets[0].data = top3Materias.map(materia => materia.time);
    grafico.update();
}

function principal() {
    inicializarGrafico(); 
    const materias = carregarMaterias();
    atualizarGraficoComTopMaterias(materias); 
}

function atualizarGraficoComTopMaterias(materias) {
    const top3Materias = materias
        .sort((a, b) => b.time - a.time)
        .slice(0, 3);
    atualizarGrafico(top3Materias);
}

principal();

export { atualizarGrafico };