describe("Form loading and validation positive", () => {
    let connectionAddress = {};

    beforeEach(() => {
        let url = Cypress.config("baseUrl");

        cy.fixture("connectionAddress").then((data) => {
            connectionAddress = data;
        });

        cy.setCookie("c24consent", "fam");
        cy.visit(url);
    });

    it("should verify that Strasse and Nr. fields are uneditable before entering the zip code", () => {
    cy.get('.sc-fBWQee.fBSyHj').should('be.visible').click();
    cy.get('#zi‌pcit‌y').should('not.have.class', 'disabled');
    cy.wait(500);
    cy.get('#str‌eet').should('be.disabled');
    cy.get('#ho‌use').should('be.disabled');
    });
});