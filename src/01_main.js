import { inicializarTemporizador } from './03_Temporizador.js';
import { inicializarDashboard } from './04_Dashboard.js';

function inicializarApp() {
    inicializarTemporizador();
    inicializarDashboard();
}

document.addEventListener('DOMContentLoaded', inicializarApp);