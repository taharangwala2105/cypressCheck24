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

    it("Web form found on the page", () => {
        cy.get('#tko-start-new-comparison-desktop').should('be.visible');
    });

    it("should verify that Strasse and Nr. fields are uneditable before entering the zip code", () => {
        cy.get('.sc-fBWQee.fBSyHj').should('be.visible').click();
        cy.get('#zi‌pcit‌y').should('not.have.class', 'disabled');
        cy.wait(500);
        cy.get('#str‌eet').should('be.disabled');
        cy.get('#ho‌use').should('be.disabled');
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
        cy.get('#zi‌pcit‌y').type(connectionAddress.zipCode, connectionAddress.city)
            .should('have.value', connectionAddress.zipCode);
        cy.wait(1000);
        cy.get('ul.sc-dCFGXG').should('be.visible');
        cy.get('ul.sc-dCFGXG li').should('contain.text', connectionAddress.zipCode)
            .should('contain.text', connectionAddress.city); 
        cy.get('ul.sc-dCFGXG li').click();

        cy.get('#str‌eet').type(connectionAddress.streetName)
            .should('have.value', connectionAddress.streetName);
        cy.wait(1000);
        cy.get('ul.sc-dCFGXG.gmWepL').should('be.visible');
        cy.get('ul.sc-dCFGXG li').should('contain.text', connectionAddress.streetName)
            .should('contain.text', connectionAddress.streetName); 
        cy.get('ul.sc-dCFGXG li').click()

        // Ensure house number input is visible and type the house number
        cy.get('.sc-dcJtft.ieYyfk').should('exist').and('be.visible')
            .type(connectionAddress.houseNumber);

        // Click the "fertig" button to submit
        cy.contains('button', 'fertig').click();

        // Validate the full address is displayed correctly
        cy.get('.sc-fBWQee.fBSyHj')
            .should('contain.text', connectionAddress.streetName)
            .should('contain.text', connectionAddress.houseNumber)
            .should('contain.text', connectionAddress.zipCode)
            .should('contain.text', connectionAddress.city);
    });

    after(() => {
        // Click the form submission button after all tests are complete
        cy.get('.sc-aYaIB.bBLUIH.sc-bypIEy.jitcEi').click();
    });
});
