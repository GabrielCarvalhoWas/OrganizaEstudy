import { loadSubjects } from '/storage.js'; // Certifique-se de que o caminho está correto

export function updateDashboardUI(subjects) {
    const dashboardContainer = document.querySelector('.materia-caixa'); // Seleciona o contêiner onde as matérias serão exibidas
    dashboardContainer.innerHTML = ''; // Limpa o conteúdo anterior

    // Verifica se há matérias para exibir
    if (subjects.length === 0) {
        const noSubjectsMessage = document.createElement('div');
        noSubjectsMessage.textContent = 'Nenhuma matéria adicionada.';
        dashboardContainer.appendChild(noSubjectsMessage);
        return;
    }

    // Usando Array.map() para criar elementos dinâmicos
    subjects.map(subject => {
        const subjectElement = document.createElement('div');
        subjectElement.classList.add('subject-item'); // Adiciona uma classe para estilização, se necessário
        subjectElement.textContent = `${subject.name}: ${formatTime(subject.time)}`; // Formata o tempo da matéria
        dashboardContainer.appendChild(subjectElement); // Adiciona o elemento ao contêiner
    });
}


function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}


// dashboard.js - Melhorado com programação funcional
export class Dashboard {
    constructor() {
        this.subjects = [];
        this.chartInstance = null;
        this.filterInput = document.getElementById('filter-subjects');
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        // Tratamento de eventos com debounce para melhor performance
        this.filterInput?.addEventListener('input', this.debounce(() => {
            this.filterSubjects(this.filterInput.value);
        }, 300));
    }

    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    filterSubjects(query) {
        const filteredSubjects = this.subjects
            .filter(subject => subject.name.toLowerCase().includes(query.toLowerCase()));
        this.updateUI(filteredSubjects);
    }

    updateUI(subjects) {
        const container = document.querySelector('.materia-caixa');
        if (!container) return;

        // Usando map para criar elementos
        const subjectElements = subjects.map(subject => {
            const element = document.createElement('div');
            element.className = 'subject-item animate__animated animate__fadeIn';
            
            const stats = this.calculateSubjectStats(subject);
            
            element.innerHTML = `
                <div class="subject-header">
                    <h3>${subject.name}</h3>
                    <span class="subject-time">${this.formatTime(subject.time)}</span>
                </div>
                <div class="subject-stats">
                    <span>Sessões: ${stats.sessions}</span>
                    <span>Média: ${stats.averageTime}min</span>
                </div>
                <div class="subject-actions">
                    <button class="start-btn" data-subject="${subject.name}">
                        <i class="fas fa-play"></i> Iniciar
                    </button>
                </div>
            `;
            
            return element;
        });

        // Limpa e adiciona os novos elementos
        container.innerHTML = '';
        container.append(...subjectElements);
    }

    calculateSubjectStats(subject) {
        const sessions = subject.sessions || [];
        return {
            sessions: sessions.length,
            averageTime: sessions.length ? 
                Math.round(sessions.reduce((acc, time) => acc + time, 0) / sessions.length / 60) : 
                0
        };
    }

    formatTime(seconds) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        
        return [hours, minutes, secs]
            .map(v => v.toString().padStart(2, '0'))
            .join(':');
    }
}

// Novo módulo para análise de dados
export class Analytics {
    static getMostStudiedSubjects(subjects, limit = 5) {
        return [...subjects]
            .sort((a, b) => b.time - a.time)
            .slice(0, limit)
            .map(subject => ({
                name: subject.name,
                time: subject.time,
                percentage: (subject.time / this.getTotalStudyTime(subjects) * 100).toFixed(1)
            }));
    }

    static getTotalStudyTime(subjects) {
        return subjects.reduce((total, subject) => total + subject.time, 0);
    }

    static getWeeklyProgress(subjects) {
        const weekDays = Array.from({ length: 7 }, (_, i) => {
            const d = new Date();
            d.setDate(d.getDate() - i);
            return d.toISOString().split('T')[0];
        });

        return weekDays.map(day => ({
            date: day,
            total: subjects.reduce((acc, subject) => {
                const dayStudy = subject.sessions?.filter(s => s.date === day) || [];
                return acc + dayStudy.reduce((t, s) => t + s.time, 0);
            }, 0)
        }));
    }
}