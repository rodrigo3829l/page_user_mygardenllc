describe('Prueba de Proyectos Destacados', () => {
  before(() => {
    // Visitamos la página de proyectos destacados
    cy.visit('/proyects/destacados');

    // Interceptamos la solicitud para asegurarnos que los proyectos se carguen
    cy.intercept('GET', '**/feature/get').as('getProjects');
    
    // Esperamos que la solicitud se complete
    cy.wait('@getProjects', { timeout: 15000 });

    // Aseguramos que las tarjetas de proyectos estén presentes
    cy.get('.v-row > .v-col').should('exist');
  });

  it('Debería acceder al primer proyecto destacado y verificar su información', () => {
    // Seleccionamos el primer v-col que contenga un v-card
    cy.get('.v-row > .v-col')
      .filter(':has(.v-card)')
      .first()
      .within(() => {
        // Accedemos específicamente al primer v-card
        cy.get('.v-card').first().should('be.visible').click();
      });

    // Verificamos que la URL cambie a la página de detalles del proyecto
    cy.url().should('include', '/proyects/info');

    // Verificamos que los elementos clave de la página estén visibles
    cy.get('.title').should('be.visible');
    cy.get('.description').should('be.visible');
    cy.get('.service-description').should('be.visible');
  });
});
