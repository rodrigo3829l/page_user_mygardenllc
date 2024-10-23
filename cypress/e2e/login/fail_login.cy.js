describe('Pruebas de Inicio de Sesión Fallida', () => {
    it('Debería mostrar un error con un email incorrecto', () => {
      // Navega a la página de login
      cy.visit('/login/loginuser'); 
  
      // Introduce un email incorrecto y la contraseña correcta
      cy.get('.email input', { timeout: 10000 }).should('exist').type('usuario@example.com');
      cy.get('input[type="password"]').type('Drop345terra#');
  
      // Intenta iniciar sesión
      cy.get('button').contains('LOG IN').click();
  
      // Verifica que se muestre el mensaje de "Invalid email"
      cy.contains('Invalid email', { timeout: 10000 }).should('be.visible');
    });
  
    it('Debería mostrar un error con una contraseña incorrecta', () => {
      // Navega a la página de login
      cy.visit('/login/loginuser'); 
  
      // Introduce el email correcto y una contraseña incorrecta
      cy.get('.email input', { timeout: 10000 }).should('exist').type('202106581@gmail.com');
      cy.get('input[type="password"]').type('Drop345terra1#');
  
      // Intenta iniciar sesión
      cy.get('button').contains('LOG IN').click();
  
      // Verifica que se muestre el mensaje de "Invalid password"
      cy.contains('Invalid password', { timeout: 10000 }).should('be.visible');
    });
  });
  