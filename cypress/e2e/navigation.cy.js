describe("Prueba de navegación completa del sitio", () => {
  beforeEach(() => {
    // Visita la página principal antes de cada prueba
    cy.visit("https://mygardenllcservices.com/");
  });

  it("Navega desde Home a Contact", () => {
    cy.contains("Contact").click();
    cy.url().should("include", "/home/contact"); // Verifica que la URL sea la correcta
  });

  it("Navega desde Home a FAQs", () => {
    cy.contains("FAQS").click();
    cy.url().should("include", "/home/answers");
  });

  it("Navega desde Home a Servicios", () => {
    cy.contains("Services").click();
    cy.url().should("include", "/services/servicespage");
  });

  it("Navega desde Home a Proyectos", () => {
    cy.contains("Projects").click();
    cy.url().should("include", "/proyects/destacados");
  });

  it("Navega desde Home a Login", () => {
    cy.contains("Login").click();
    cy.url().should("include", "/login/loginuser");
  });

  it("Regresa al Home desde otra página", () => {
    cy.visit("https://mygardenllcservices.com/services/servicespage");
    cy.contains("Home").click();
    cy.url().should("eq", "https://mygardenllcservices.com/home/homeuser"); // Cambia la URL esperada
  });

  it("Verifica que la página no encontrada funcione correctamente", () => {
    cy.visit("https://mygardenllcservices.com/ruta/no/existente", {
      failOnStatusCode: false,
    });
    cy.contains("404").should("be.visible"); // Asegúrate de que la página 404 se muestre
  });
});
