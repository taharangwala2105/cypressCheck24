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

    it('should select radio button, enter zipcode, invalid streetname, housenumber is empty and all error messages displayed', () => {
        cy.get('input[name="selectCustomerType"]')
            .should('not.be.checked');

        cy.get('#selectCustomerType-new')
            .check()
            .should('be.checked');  

        cy.get('#selectCustomerType-change')
            .should('not.be.checked');

        cy.get('.sc-fBWQee.fBSyHj').should('be.visible').click();
        cy.get('#zi‌pcit‌y').type(connectionAddress.positive.zipCode, connectionAddress.positive.city)
        cy.wait(1000);

        cy.get('ul.sc-dCFGXG').should('be.visible');
        cy.get('ul.sc-dCFGXG li').should('contain.text', connectionAddress.positive.zipCode)
            .should('contain.text', connectionAddress.positive.city)
            .type('{enter}');

        cy.get('#str‌eet').type(connectionAddress.negative.streetName)
            .should('have.value', connectionAddress.negative.streetName)
            .type('{enter}');
        cy.wait(1000);           ;

        // Click the "fertig" button to submit
        cy.contains('button', 'fertig').click();
        cy.get('[data-testid="enhancedError"]')
            .should('be.visible')
            .within(() => {
            cy.contains('Bitte geben Sie eine gültige Straße an oder prüfen Sie ob die richtige PLZ gesetzt ist.').should('be.visible');
            cy.contains('Bitte geben Sie eine Hausnummer ein.').should('be.visible');
        });
    });

});
