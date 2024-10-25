describe('Prueba de Navegación a Mis Servicios', () => {
    before(() => {
      // Interceptamos las solicitudes necesarias antes de visitar la página
      cy.intercept('POST', '**/login').as('loginUser');
      cy.intercept('GET', '**/services/get').as('getServices');
      cy.intercept('GET', '**/typeservice/get').as('getCategories');
  
      // Visitamos la página de login
      cy.visit('/login/loginuser');
  
      // Realizamos el login
      cy.get('.email input', { timeout: 10000 }).should('exist').type('202106581@gmail.com');
      cy.get('input[type="password"]').type('Drop345terra#');
  
      // Clic en el botón de login
      cy.get('button').contains('LOG IN').click();
  
      // Verificamos que el login sea exitoso y redirija al home
      cy.wait('@loginUser');
      cy.url().should('include', '/home/homeuser');
    });
  
    it('Debería navegar a Mis Servicios y ver un servicio', () => {
      // Navegamos a la página de "Mis Servicios"
      cy.visit('/profile/myservices');
  
      // Esperamos a que los servicios se carguen
    //   cy.wait('@getServices', { timeout: 10000 });
      cy.wait(2000)
  
      // Seleccionamos el primer servicio
      cy.get('.v-card').first().within(() => {
        cy.get('button').contains('View').click();
      });
  
      // Verificamos que se redirija a la página de detalles del servicio
      cy.url().should('include', '/infomyservices');
    //   cy.get('h1').should('contain', 'Garden Maintenance'); // Ejemplo de título del servicio
    });
  });
  