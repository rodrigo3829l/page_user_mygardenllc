describe('Prueba de navegación al perfil después del login', () => {
    before(() => {
      // Interceptamos las solicitudes necesarias
      cy.intercept('POST', '**/login').as('loginUser');
  
      // Visitamos la página de login
      cy.visit('/login/loginuser');
  
      // Realizamos el login
      cy.get('.email input', { timeout: 10000 }).should('exist').type('202106581@gmail.com');
      cy.get('input[type="password"]').type('Drop345terra#');
  
      // Esperamos por posibles captchas o validaciones
      cy.wait(1000);
  
      // Clic en el botón de login
      cy.get('button').contains('LOG IN').click();
  
      // Verificamos que el login sea exitoso y redirija al home
      cy.wait('@loginUser');
      cy.url().should('include', '/home/homeuser');
    });
  
    it('Debería redirigir al perfil y permitir el logout correctamente', () => {
      // Navegamos al perfil
      cy.visit('/profile/profilepage');
  
      // Verificamos que estamos en la ruta del perfil
      cy.url().should('include', '/profile/profilepage');
  
      // Hacemos clic en el botón de Logout
      cy.get('button').contains('Logout').click();
  
      // Verificamos que redirige al home después del logout
      cy.url().should('include', '/');
    });
  });
  