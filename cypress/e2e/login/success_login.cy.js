describe("Prueba de Inicio de Sesión", () => {
  it("Debería iniciar sesión exitosamente y redirigir al home", () => {
    cy.visit("/login/loginuser"); // Usa la ruta relativa

    cy.get(".email input", { timeout: 10000 })
      .should("exist")
      .type("202106581@gmail.com");
    cy.get('input[type="password"]').type("Drop345terra#");

    cy.wait(1000); // Espera para el captcha si es necesario

    cy.get("button").contains("LOG IN").click();

    cy.url().should("include", "/home/homeuser");
    cy.contains("Successful login").should("be.visible");
  });
});
