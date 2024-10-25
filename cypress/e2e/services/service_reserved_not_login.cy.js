describe('Prueba de Reserva de Servicios sin Autenticación', () => {
    before(() => {
      // Interceptamos las solicitudes necesarias antes de visitar la página
      cy.intercept('GET', '**/services/get').as('getServices');
      cy.intercept('GET', '**/typeservice/get').as('getCategories');
  
      // Visitamos la página de servicios
      cy.visit('/services/servicespage');
  
      // Esperamos a que los servicios y categorías se carguen
      cy.wait('@getServices', { timeout: 10000 });
      cy.wait('@getCategories', { timeout: 10000 });
    });
  
    it('Debe intentar reservar un servicio sin estar autenticado', () => {
      // Verificamos que los servicios estén presentes en la interfaz
      cy.get('.v-card', { timeout: 10000 }).should('exist');
  
      // Hacemos clic en el primer servicio
      cy.get('.v-card').first().click();
  
      // Verificamos que se redirija a la página de error 404
      cy.url().should('include', '/forbidden');
      cy.contains('Error 404: Oops!').should('be.visible');
    });
  });
  