import { initializeTimer } from './03_timer.js';
import { initializeDashboard } from './04_Dashboard.js';

function initializeApp() {
    initializeTimer();
    initializeDashboard();
}

document.addEventListener('DOMContentLoaded', initializeApp);