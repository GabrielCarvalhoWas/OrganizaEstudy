export function saveSubjects(subjects) {
    localStorage.setItem('subjects', JSON.stringify(subjects));
}

export function loadSubjects() {
    const storedSubjects = localStorage.getItem('subjects');
    return storedSubjects ? JSON.parse(storedSubjects) : [];
}