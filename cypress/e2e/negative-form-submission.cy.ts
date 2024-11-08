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
    it('should verify that Strasse and Nr. fields are uneditable before entering the zip code', () => {
        // Check that the "Strasse" (street) input field is disabled or readonly
        cy.get('.sc-fBWQee.fBSyHj').should('be.visible').click();
        cy.get('#zi‌pcit‌y').should('not.have.class', 'disabled');
        cy.wait(500);
        cy.get('#str‌eet').should('be.disabled');
        cy.get('#ho‌use').should('be.disabled');
    });

    it("should ensure Neuer Vertrag is selected", () => {
        cy.get('input[name="selectCustomerType"]')
            .should('not.be.checked');

        cy.get('#selectCustomerType-new')
            .check()
            .should('be.checked');  

        cy.get('#selectCustomerType-change')
            .should('not.be.checked');
    });

    it('should enter address data into the respective fields', () => {
        
        cy.get('.sc-fBWQee.fBSyHj').should('be.visible').click();
        cy.get('#zi‌pcit‌y').type(connectionAddress.zipCode)
            .should('have.value', connectionAddress.zipCode);
        cy.wait(1000);
        cy.get('ul.sc-dCFGXG').should('be.visible');
        cy.get('ul.sc-dCFGXG li').should('contain.text', connectionAddress.zipCode)
            .should('contain.text', connectionAddress.city); 
        cy.get('ul.sc-dCFGXG li').click();

        
        
        cy.contains('button', 'fertig').click();

        cy.get('data-testid="enhancedError"').should('be.visible');
        cy.get('.sc-aYaIB.bBLUIH.sc-bypIEy jitcEi').click();
        });
    });