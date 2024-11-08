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

    it("should select radio button, enter invalid city, streetname, housenumber, all error messages displayed", () => {
        cy.get('input[name="selectCustomerType"]')
            .should('not.be.checked');

        cy.get('#selectCustomerType-new')
            .check()
            .should('be.checked');  

        cy.get('#selectCustomerType-change')
            .should('not.be.checked');

        cy.get('.sc-fBWQee.fBSyHj').should('be.visible').click();
        cy.get('#zi‌pcit‌y').type(connectionAddress.negative.city[0])
            .should('have.value', connectionAddress.negative.city[0])
            .type('{enter}');
        cy.wait(1000);

        // Click the "fertig" button to submit
        cy.contains('button', 'fertig').click();

        // Check for the "Postleitzahl oder einen Ort" error message
        cy.get('.sc-imWZod.ibVZls').within(() => {
        cy.contains('Bitte gültige Postleitzahl oder einen Ort eingeben').should('be.visible');
        });

// Check for the "Straße" and "Hausnummer" error messages
       
        cy.get('[data-testid="enhancedError"]')
            .should('be.visible')
            .within(() => {
            cy.contains('Bitte geben Sie eine Straße ein.').should('be.visible');
            cy.contains('Bitte geben Sie eine Hausnummer ein.').should('be.visible');
        });
    });

});
