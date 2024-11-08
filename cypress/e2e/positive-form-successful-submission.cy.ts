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

    it('should select radio button and then enter address data into the respective fields', () => {
        cy.get('input[name="selectCustomerType"]')
            .should('not.be.checked');

        cy.get('#selectCustomerType-new')
            .check()
            .should('be.checked');  

        cy.get('#selectCustomerType-change')
            .should('not.be.checked');

        cy.get('.sc-fBWQee.fBSyHj').should('be.visible').click();
        cy.get('#zi‌pcit‌y')
            .type(`${connectionAddress.positive.zipCode} ${connectionAddress.positive.city}`)
            .should('have.value', `${connectionAddress.positive.zipCode} ${connectionAddress.positive.city}`);
        cy.wait(1000);

        cy.get('ul.sc-dCFGXG li').should('be.visible');
        cy.get('ul.sc-dCFGXG li')
            .should('contain.text', `${connectionAddress.positive.zipCode} ${connectionAddress.positive.city}`)
            .click();

        cy.get('#str‌eet').type(connectionAddress.positive.streetName)
            .should('have.value', connectionAddress.positive.streetName);
        cy.wait(1000);
        cy.get('ul.sc-dCFGXG.gmWepL').should('be.visible');
        cy.get('ul.sc-dCFGXG li').should('contain.text', connectionAddress.positive.streetName)
            .should('contain.text', connectionAddress.positive.streetName); 
        cy.get('ul.sc-dCFGXG li').click()

        // Ensure house number input is visible and type the house number
        cy.get('.sc-dcJtft.ieYyfk').should('exist').and('be.visible')
            .type(connectionAddress.positive.houseNumber);

        // Click the "fertig" button to submit
        cy.contains('button', 'fertig').click();

        // Validate the full address is displayed correctly
        cy.get('.sc-fBWQee.fBSyHj')
            .should('contain.text', connectionAddress.positive.streetName)
            .should('contain.text', connectionAddress.positive.houseNumber)
            .should('contain.text', connectionAddress.positive.zipCode)
            .should('contain.text', connectionAddress.positive.city);
    });

    after(() => {
        // Click the form submission button after all tests are complete
        cy.get('.sc-aYaIB.bBLUIH.sc-bypIEy.jitcEi').click();
    });
});
