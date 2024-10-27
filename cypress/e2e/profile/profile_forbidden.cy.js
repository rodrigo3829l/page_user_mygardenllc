describe("Prueba de acceso al perfil sin autenticación", () => {
  it("Debe redirigir a la página de error 403 al intentar acceder al perfil sin login", () => {
    // Visitamos la ruta del perfil directamente
    cy.visit("/profile/profilepage");

    // Verificamos que se redirija a la página 403 Forbidden
    cy.url().should("include", "/forbidden");
    cy.contains("Error 403: Forbidden!").should("be.visible");
  });
});
