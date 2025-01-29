import { initializeTimer } from '/03_temporizador.js';
import { initializeDashboard } from '/04_dashboard.js';

function initializeApp() {
    initializeTimer();
    initializeDashboard();
}

document.addEventListener('DOMContentLoaded', initializeApp);