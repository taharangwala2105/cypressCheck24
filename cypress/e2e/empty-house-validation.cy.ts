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

    it('should select radio button, enter zipcode, streetname, housenumber is empty and hausnummer error message shown', () => {
        cy.get('input[name="selectCustomerType"]')
            .should('not.be.checked');

        cy.get('#selectCustomerType-new')
            .check()
            .should('be.checked');  

        cy.get('#selectCustomerType-change')
            .should('not.be.checked');

        cy.get('.sc-fBWQee.fBSyHj').should('be.visible').click();
        cy.get('#zi‌pcit‌y').type(connectionAddress.positive.zipCode, connectionAddress.positive.city)
            .should('have.value', connectionAddress.positive.zipCode);
        cy.wait(1000);

        cy.get('ul.sc-dCFGXG').should('be.visible');
        cy.get('ul.sc-dCFGXG li').should('contain.text', connectionAddress.positive.zipCode)
            .should('contain.text', connectionAddress.positive.city); 
        cy.get('ul.sc-dCFGXG li').click();

        cy.get('#str‌eet').type(connectionAddress.positive.streetName)
            .should('have.value', connectionAddress.positive.streetName);
        cy.wait(1000);
        cy.get('ul.sc-dCFGXG.gmWepL').should('be.visible');
        cy.get('ul.sc-dCFGXG li').should('contain.text', connectionAddress.positive.streetName)
            .should('contain.text', connectionAddress.positive.streetName); 
        cy.get('ul.sc-dCFGXG li').click()

        // Ensure house number input is visible and type the house number
        cy.get('.sc-dcJtft.ieYyfk').should('exist').and('be.visible');

        // Click the "fertig" button to submit
        cy.contains('button', 'fertig').click();
        cy.get('[data-testid="enhancedError"]')
            .should('be.visible')
            .within(() => {
            cy.contains('Bitte geben Sie eine Straße ein.').should('not.exist');
            cy.contains('Bitte geben Sie eine Hausnummer ein.').should('be.visible');
        });
    });

});
