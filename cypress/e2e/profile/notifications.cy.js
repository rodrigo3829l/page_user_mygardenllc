describe('Prueba de Navegación a Notificaciones', () => {
    before(() => {
      // Interceptamos las solicitudes necesarias
      cy.intercept('POST', '**/login').as('loginUser');
      cy.intercept('GET', '**/notifications/notifications').as('getNotifications');
  
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
  
    it('Debería navegar a la pantalla de notificaciones', () => {
      // Navegamos a la página de notificaciones
      cy.visit('/notifications');
  
      // Esperamos que las notificaciones se carguen
      cy.wait('@getNotifications', { timeout: 10000 });
  
      // Verificamos que el título de la página de notificaciones esté visible
      cy.contains('My Garden LLC Notifications').should('be.visible');
    });
  });
  