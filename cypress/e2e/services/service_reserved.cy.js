describe('Prueba de Navegación a la Reserva de Servicio', () => {
    before(() => {
      // Interceptamos las solicitudes necesarias antes de visitar la página
      cy.intercept('GET', '**/services/get').as('getServices');
      cy.intercept('GET', '**/typeservice/get').as('getCategories');
      cy.intercept('POST', '**/login').as('loginUser'); // Intercepción de la solicitud de login
  
      // Visitamos la página de login
      cy.visit('/login/loginuser');
  
      // Realizamos el login
      cy.get('.email input', { timeout: 10000 })
        .should('exist')
        .type('202106581@gmail.com'); // Correo de ejemplo
      cy.get('input[type="password"]').type('Drop345terra#'); // Contraseña de ejemplo
  
      cy.wait(1000); // Espera para manejar captchas o validaciones adicionales
  
      // Clic en el botón de login
      cy.get('button').contains('LOG IN').click();
  
      // Verificamos que el login sea exitoso
      cy.wait('@loginUser'); // Esperamos a que se complete la solicitud de login
      cy.url().should('include', '/home/homeuser');
      cy.contains('Successful login').should('be.visible');
    });
  
    it('Debería navegar a la reserva de un servicio y verificar los elementos', () => {
      // Visitamos la página de servicios después del login
      cy.visit('/services/servicespage');
      
      // Esperamos a que se carguen los servicios
      cy.wait('@getServices', { timeout: 10000 });
      cy.wait('@getCategories', { timeout: 10000 });
  
      // Verificamos que los servicios estén presentes
      cy.get('.v-card', { timeout: 10000 }).should('exist');
  
      // Hacemos clic en el primer servicio para ir a la página de reserva
      cy.get('.v-card').first().click();
  
      // Verificamos que estemos en la página de reserva
      cy.url().should('include', '/schedule');
  
      // Usamos selectores más generales para los campos
      cy.get('textarea').should('exist'); // Verificar textarea de descripción
      cy.get('input[type="file"]').should('exist'); // Verificar input de imagen
      cy.get('input[type="date"]').should('exist'); // Verificar selector de fecha
      cy.get('button').contains('Schedule').should('be.visible'); // Botón de agendar
    });
  });
  