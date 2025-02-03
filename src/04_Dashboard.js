import { carregarMaterias } from './06_LocalStorage.js';
import { atualizarGrafico } from './05_Chart.js';

export function atualizarUIDoDashboard(materias) {
    const containerDashboard = document.querySelector('.materia-caixa');
    containerDashboard.innerHTML = '';

    if (materias.length === 0) {
        const mensagemSemMaterias = document.createElement('div');
        mensagemSemMaterias.textContent = 'Nenhuma matéria adicionada.';
        containerDashboard.appendChild(mensagemSemMaterias);
        return;
    }

    materias.map(materia => {
        const elementoMateria = document.createElement('div');
        elementoMateria.classList.add('subject-item');
        elementoMateria.textContent = `${materia.name}: ${formatarTempo(materia.time)}`;
        containerDashboard.appendChild(elementoMateria);
    });
}

function formatarTempo(segundos) {
    const minutos = Math.floor(segundos / 60);
    const secs = segundos % 60;
    return `${String(minutos).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

export class Dashboard {
    constructor() {
        this.materias = [];
        this.graficoInstancia = null;
        this.entradaFiltro = document.getElementById('filter-subjects');
        this.inicializarTratadoresDeEventos();
    }

    inicializarTratadoresDeEventos() {
        // Tratamento de eventos com debounce para melhor performance
        this.entradaFiltro?.addEventListener('input', this.debounce(() => {
            this.filtrarMaterias(this.entradaFiltro.value);
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

    filtrarMaterias(query) {
        const materiasFiltradas = this.materias
            .filter(materia => materia.name.toLowerCase().includes(query.toLowerCase()));
        this.atualizarUI(materiasFiltradas);
    }

    atualizarUI(materias) {
        const container = document.querySelector('.materia-caixa');
        if (!container) return;

        // Usando map para criar elementos
        const elementosMaterias = materias.map(materia => {
            const elemento = document.createElement('div');
            elemento.className = 'subject-item animate__animated animate__fadeIn';

            const estatisticas = this.calcularEstatisticasMateria(materia);

            elemento.innerHTML = `
                <div class="subject-header">
                    <h3>${materia.name}</h3>
                    <span class="subject-time">${this.formatarTempo(materia.time)}</span>
                </div>
                <div class="subject-stats">
                    <span>Sessões: ${estatisticas.sessao}</span>
                    <span>Média: ${estatisticas.tempoMedio}min</span>
                </div>
                <div class="subject-actions">
                    <button class="start-btn" data-subject="${materia.name}">
                        <i class="fas fa-play"></i> Iniciar
                    </button>
                </div>
            `;

            return elemento;
        });

        container.innerHTML = '';
        container.append(...elementosMaterias);
    }

    calcularEstatisticasMateria(materia) {
        const sessoes = materia.sessions || [];
        return {
            sessoes: sessoes.length,
            tempoMedio: sessoes.length ?
                Math.round(sessoes.reduce((acc, tempo) => acc + tempo, 0) / sessoes.length / 60) :
                0
        };
    }

    formatarTempo(segundos) {
        const horas = Math.floor(segundos / 3600);
        const minutos = Math.floor((segundos % 3600) / 60);
        const secs = segundos % 60;

        return [horas, minutos, secs]
            .map(v => v.toString().padStart(2, '0'))
            .join(':');
    }
}

export class Analitica {
    static obterMateriasMaisEstudadas(materias, limite = 5) {
        return [...materias]
            .sort((a, b) => b.time - a.time)
            .slice(0, limite)
            .map(materia => ({
                name: materia.name,
                time: materia.time,
                percentage: (materia.time / this.obterTempoTotalDeEstudo(materias) * 100).toFixed(1)
            }));
    }

    static obterTempoTotalDeEstudo(materias) {
        return materias.reduce((total, materia) => total + materia.time, 0);
    }

    static obterProgressoSemanal(materias) {
        const diasDaSemana = Array.from({ length: 7 }, (_, i) => {
            const d = new Date();
            d.setDate(d.getDate() - i);
            return d.toISOString().split('T')[0];
        });

        return diasDaSemana.map(dia => ({
            date: dia,
            total: materias.reduce((acc, materia) => {
                const estudoDoDia = materia.sessions?.filter(s => s.date === dia) || [];
                return acc + estudoDoDia.reduce((t, s) => t + s.time, 0);
            }, 0)
        }));
    }
}

export { inicializarDashboard };

function inicializarDashboard() {
    const materias = carregarMaterias();
    atualizarUIDoDashboard(materias);
    atualizarGraficoComTopMaterias(materias);
}

function atualizarUIDoDashboard(materias) {
    atualizarGraficoComTopMaterias(materias);
}

function atualizarGraficoComTopMaterias(materias) {
    const top3Materias = materias
        .sort((a, b) => b.time - a.time)
        .slice(0, 3);
    atualizarGrafico(top3Materias);
}