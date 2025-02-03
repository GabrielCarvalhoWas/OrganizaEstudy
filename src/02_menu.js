function AlternarMenu() {
    const linksNav = document.querySelector('.ul');
    const iconeMenu = document.getElementById('menu-icon');
    const iconeFechar = document.getElementById('close-icon');

    if (linksNav.classList.contains('active')) {
        linksNav.classList.remove('active');
        iconeMenu.style.display = 'block';
        iconeFechar.style.display = 'none';
    } else {
        linksNav.classList.add('active');
        iconeMenu.style.display = 'none';
        iconeFechar.style.display = 'block';
    }
}

document.querySelector('.div-menu-mobile-study').addEventListener('click', AlternarMenu);

function rolagemSuave(event) {
    event.preventDefault();
    const idAlvo = event.currentTarget.getAttribute("href");
    const elementoAlvo = document.querySelector(idAlvo);
    elementoAlvo.scrollIntoView({
        behavior: 'smooth'
    });
}

document.querySelectorAll('.fade-in-section').forEach((secao) => {
    const observador = new IntersectionObserver((entradas) => {
        entradas.forEach(entrada => {
            if (entrada.isIntersecting) {
                entrada.target.classList.add('is-visible');
                observador.unobserve(entrada.target);
            }
        });
    });
    observador.observe(secao);
});