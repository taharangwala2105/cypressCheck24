describe("Availability Check webform submission", () => {
    let connectionAddress = {};

    beforeEach(() => {
        let url = Cypress.config("baseUrl");

        cy.fixture("connectionAddress").then((data) => {
            connectionAddress = data;
        });

        cy.setCookie("c24consent", "fam");
        cy.visit(url);
    });

    it("Web form found on the page", () => {
        cy.get('#tko-start-new-comparison-desktop').should('be.visible');
    });
});