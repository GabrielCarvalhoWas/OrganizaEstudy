export function salvarMaterias(materias) {
    localStorage.setItem('materias', JSON.stringify(materias));
}

export function carregarMaterias() {
    const materiasArmazenadas = localStorage.getItem('materias');
    return materiasArmazenadas ? JSON.parse(materiasArmazenadas) : [];
}