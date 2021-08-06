describe("Teste aba de contatos", () => {
  // beforeEach(() => cy.visit("https://qa5.digisac.co/"));

  it("Entrar na plataforma", () => {
    cy.visit("https://qa5.digisac.co/");

    cy.get("#username").type("admin@teste.com");
    cy.get("#password").type("123456");
    cy.get(".btn-primary").click();

    cy.get("#contactRoute").click();

    cy.server();
    cy.route("GET", "**/api/v1/tags").as("contactsAcess");
    cy.wait("@contactsAcess").then((xhr) => {
      expect(xhr.status).be.eq(200);
      expect(xhr.response.body).has.property("data");
      expect(xhr.response.body.data).is.not.null;
    });
  });

  //   const logon = Cypress.env('logon')

  //     cy.log(logon)

  //     cy.visit('https://qa5.digisac.co/')

  //     cy.get("#username").type(logon);
  //     cy.get("#password").type(logon);
  //     cy.get(".btn-primary").click();

  it("Teste Inovo contato", () => {
    cy.get("[data-testid=create-contact-button]").click();
    cy.get("[data-testid=contact-internal-name]").type("Cypress");
    cy.get(
      ".create-contacts-person-select > .react_select__control > .react_select__indicators > .react_select__indicator"
    ).click({ multiple: true });
    cy.get("#react-select-type-option-0")
      .contains("Marcos")
      .click({ force: true });

    //
    // cy.get(
    //   ".create-contacts-person-select > .react_select__control > .react_select__value-container"
    // ).click();
  });
});
