// 05_Chart.js

import { loadSubjects } from './storage.js';

// Inicialização do gráfico
let chart;

function initializeChart() {
    const ctx = document.getElementById('barchart').getContext('2d');
    chart = new Chart(ctx, {
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

// Atualizar o gráfico com as 3 matérias mais vistas
function updateChart(top3Subjects) {
    chart.data.labels = top3Subjects.map(subject => subject.name);
    chart.data.datasets[0].data = top3Subjects.map(subject => subject.time);
    chart.update();
}

function main() {
    initializeChart(); // Inicializa o gráfico
    const subjects = loadSubjects();
    updateChartWithTopSubjects(subjects); // Atualiza o gráfico com as 3 matérias mais estudadas
}

function updateChartWithTopSubjects(subjects) {
    const top3Subjects = subjects
        .sort((a, b) => b.time - a.time)
        .slice(0, 3);
    updateChart(top3Subjects);
}

main();

export { updateChart };