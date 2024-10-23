describe('Prueba de Proyectos Destacados', () => {
  before(() => {
    // Visitamos la página de proyectos destacados
    cy.visit('/proyects/destacados');

    // Interceptamos la solicitud para asegurarnos que los proyectos se carguen
    cy.intercept('GET', '**/feature/get').as('getProjects');
    
    // Esperamos que la solicitud se complete
    cy.wait('@getProjects', { timeout: 15000 });

    // Aseguramos que las tarjetas de proyectos estén presentes
    cy.get('.v-row > .v-col', { timeout: 15000 }).should('exist');
  });

  it('Debería acceder al primer proyecto destacado y verificar su información', () => {
    // Aseguramos que la tarjeta del proyecto y el botón estén visibles
    cy.get('.v-row > .v-col').first().should('exist');

    // Hacemos clic en el botón "MORE INFO" del primer proyecto
    cy.get('.v-row > .v-col')
      .first()
      .find('button')  // Ajustamos para encontrar cualquier botón dentro de la tarjeta
      .contains('MORE INFO')
      .click();

    // Verificamos que la URL cambie a la página de detalles del proyecto
    cy.url().should('include', '/proyects/info');

    // Verificamos que los elementos clave de la página estén visibles
    cy.get('.title').should('be.visible');
    cy.get('.description').should('be.visible');
    cy.get('.service-description').should('be.visible');
  });

  it('Debería iterar sobre todos los proyectos y verificar su información', () => {
    // Aseguramos que las tarjetas de proyectos estén visibles
    cy.get('.v-row > .v-col', { timeout: 15000 }).should('exist');

    // Iteramos sobre cada tarjeta de proyecto
    cy.get('.v-row > .v-col').each(($el) => {
      // Hacemos clic en el botón "MORE INFO" de cada tarjeta
      cy.wrap($el).find('button').contains('MORE INFO').click();

      // Verificamos que la URL contenga la ruta de información del proyecto
      cy.url().should('include', '/proyects/info');

      // Verificamos que los elementos clave estén visibles
      cy.get('.title').should('be.visible');
      cy.get('.description').should('be.visible');
      cy.get('.service-description').should('be.visible');

      // Regresamos a la lista de proyectos
      cy.go('back');
    });
  });
});
