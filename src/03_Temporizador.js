import { salvarMaterias, carregarMaterias } from './06_LocalStorage.js';

let temporizador;
let estaRodando = false;
let tempo = 0;
let materiaAtual = null;

const materias = carregarMaterias(); 

// Tempo em MM:SS
function formatarTempo(segundos) {
    const minutos = Math.floor(segundos / 60);
    const secs = segundos % 60;
    return `${String(minutos).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function atualizarDisplayDeTempo() {
    const displayDeTempo = document.getElementById('time-display');
    if (displayDeTempo) {
        displayDeTempo.textContent = formatarTempo(tempo);
    }
}

function iniciar() {
    const elementoMensagem = document.getElementById('message');
    const seletorMateria = document.getElementById('subject-select');
    const nomeMateriaSelecionada = seletorMateria.value;

    if (!nomeMateriaSelecionada) {
        elementoMensagem.textContent = "Selecione uma matéria para começar a estudar!";
        elementoMensagem.style.display = 'block';
        return;
    }

    materiaAtual = materias.find(materia => materia.name === nomeMateriaSelecionada);
    
    if (!estaRodando) {
        estaRodando = true; 
        temporizador = setInterval(() => {
            tempo++; 
            atualizarDisplayDeTempo(); 
            if (materiaAtual) {
                materiaAtual.time++; 
            }
        }, 1000); 
    }
}

function pausar() {
    if (estaRodando) {
        clearInterval(temporizador);
        estaRodando = false;
        salvarMaterias(materias);
        alert("Temporizador pausado.");
    }
}

function reiniciar() {
    clearInterval(temporizador);
    estaRodando = false;
    tempo = 0;
    atualizarDisplayDeTempo();
}

function finalizar() {
    if (materiaAtual) {
        alert(`Você estudou ${materiaAtual.name} por ${formatarTempo(materiaAtual.time)}.`);
        reiniciar();
        salvarMaterias(materias); // Salva as alterações no Local Storage
    }
}

function adicionarMateria() {
    const entradaMateria = document.getElementById('subject-input');
    const nomeMateria = entradaMateria.value.trim();

    if (!nomeMateria) {
        alert('Por favor, insira o nome da matéria.');
        return;
    }

    const materiaExistente = materias.find(materia => materia.name === nomeMateria);

    if (materiaExistente) {
        materiaExistente.time = 0;
    } else {
        const novaMateria = { name: nomeMateria, time: 0, views: 1 };
        materias.push(novaMateria);
        materiaAtual = novaMateria;
    }

    salvarMaterias(materias);
    entradaMateria.value = '';
    atualizarUIDoDashboard(materias); 
}

function inicializarTemporizador() {
    const botaoIniciar = document.getElementById('start');
    const botaoPausar = document.getElementById('pause');
    const botaoReiniciar = document.getElementById('reset');
    const botaoFinalizar = document.getElementById('finish');
    const botaoAdicionarMateria = document.getElementById('add-subject');

    if (botaoIniciar) botaoIniciar.addEventListener('click', iniciar);
    if (botaoPausar) botaoPausar.addEventListener('click', pausar);
    if (botaoReiniciar) botaoReiniciar.addEventListener('click', reiniciar);
    if (botaoFinalizar) botaoFinalizar.addEventListener('click', finalizar);
    if (botaoAdicionarMateria) botaoAdicionarMateria.addEventListener('click', adicionarMateria);
}

document.addEventListener('DOMContentLoaded', () => {
    inicializarTemporizador();
    atualizarUIDoDashboard(materias);
    popularSeletorDeMaterias(); 
});

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