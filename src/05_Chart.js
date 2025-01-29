
import { loadSubjects } from './storage.js';

// formatar o tempo (segundos para HH:MM:SS)
function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return [hours, minutes, secs]
        .map(v => v.toString().padStart(2, '0'))
        .join(':');
}

// inicialização do gráfico
function initializeChart() {
    const ctx = document.getElementById('barchart').getContext('2d');
    return new Chart(ctx, {
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

// atualizar o gráfico com as 3 matérias mais vistas
function updateChart(chart, top3Subjects) {
    chart.data.labels = top3Subjects.map(subject => subject.name);
    chart.data.datasets[0].data = top3Subjects.map(subject => subject.time);
    chart.update();
}

 
function main() {
    
    const subjects = loadSubjects();

    
    const top3Subjects = subjects
        .sort((a, b) => b.time - a.time) 
        .slice(0, 3); 

    
    const chart = initializeChart();

  
    updateChart(chart, top3Subjects);

    
    setInterval(() => {
        const updatedSubjects = loadSubjects();
        const updatedTop3 = updatedSubjects
            .sort((a, b) => b.time - a.time)
            .slice(0, 3);
        updateChart(chart, updatedTop3);
    }, 60000); 
}


main();