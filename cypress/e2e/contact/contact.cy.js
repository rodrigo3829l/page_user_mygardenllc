describe('Prueba de Formulario de Contacto', () => {
    before(() => {
      // Visitamos la página de contacto
      cy.visit('/home/contact');
  
      // Interceptamos la solicitud para enviar el mensaje
      cy.intercept('POST', '**/user/contact').as('sendMessage');
    });
  
    it('Debería completar y enviar el formulario de contacto correctamente', () => {
      // Llenamos los campos del formulario
      cy.get('input[type="text"]').eq(0).type('Juan Pérez'); // Campo Nombre
      cy.get('input[type="email"]').type('juan.perez@example.com'); // Campo Email
      cy.get('input[type="text"]').eq(1).type('Consulta sobre servicios'); // Campo Asunto
      cy.get('textarea').type('Hola, me gustaría saber más sobre sus servicios.'); // Campo Mensaje
  
      // Hacemos clic en el botón "Send Message"
      cy.get('button').contains('Send Message').click();
  
      // Esperamos que la solicitud POST se complete y sea exitosa
      cy.wait('@sendMessage').its('response.statusCode').should('eq', 200);
  
      // Añadimos un pequeño wait opcional para estabilidad
      cy.wait(2000);
    });
  });
  