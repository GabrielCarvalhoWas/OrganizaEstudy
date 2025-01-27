export function setupCounter(element) {
  let counter = 0
  const setCounter = (count) => {
    counter = count
    element.innerHTML = `count is ${counter}`
  }
  element.addEventListener('click', () => setCounter(counter + 1))
  setCounter(0)
}


document.querySelector('.animate').addEventListener('click', createDashboard);

function createDashboard() {
  console.log('Botão clicado');

  // Seleciona o container onde o HTML será inserido
  const dashboardContainer = document.getElementById('dashboard-container');
  
  // Limpa o conteúdo anterior do container
  dashboardContainer.innerHTML = '';

  // Dados para o relatório de 5 disciplinas
  const disciplines = [
    { name: 'Matemática', views: Math.floor(Math.random() * 100) },
    { name: 'Português', views: Math.floor(Math.random() * 100) },
    { name: 'História', views: Math.floor(Math.random() * 100) },
    { name: 'Ciências', views: Math.floor(Math.random() * 100) },
    { name: 'Geografia', views: Math.floor(Math.random() * 100) }
  ];

  // Encontrar a disciplina mais acessada
  const mostViewed = disciplines.reduce((max, current) => current.views > max.views ? current : max);

  // Gerar o HTML completo do dashboard
  const dashboardHTML = `
    <h2>Relatório de Disciplinas</h2>
    <div class="dashboard-block">
      <h3>Relatório das 5 Disciplinas</h3>
      <ul>
        ${disciplines.map(discipline => `
          <li>${discipline.name}: ${discipline.views} visualizações</li>
        `).join('')}
      </ul>
    </div>
    <div class="dashboard-block">
      <h3>Disciplina Mais Acessada</h3>
      <p>${mostViewed.name}: ${mostViewed.views} visualizações</p>
    </div>
  `;

  // Inserir o HTML gerado no container
  dashboardContainer.innerHTML = dashboardHTML;
}
