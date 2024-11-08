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

    it('should check and click on radio button', () => {

    })

    it('should enter address data into the respective fields', () => {

        cy.get('.sc-fBWQee.fBSyHj').should('be.visible').click();
        cy.get('#zi‌pcit‌y').type(connectionAddress.negative.zipCode)
            .should('have.value', connectionAddress.negativezipCode);
        cy.wait(1000);
        cy.get('ul.sc-dCFGXG').should('be.visible');
        cy.get('ul.sc-dCFGXG li').should('contain.text', connectionAddress.negative.zipCode)
            .should('contain.text', connectionAddress.negative.city); 
        cy.get('ul.sc-dCFGXG li').click();

        
        cy.get('#str‌eet').type(connectionAddress.negative.streetName)
        .should('have.value', connectionAddress.negative.streetName);
        cy.wait(1000);
        cy.get('ul.sc-dCFGXG.gmWepL').should('be.visible');
        cy.get('ul.sc-dCFGXG li').should('contain.text', connectionAddress.negative.streetName)
            .should('contain.text', connectionAddress.negative.streetName); 
        cy.get('ul.sc-dCFGXG li').click();
        // cy.wait(1000)
        
        cy.get('#house').type(connectionAddress.negative.houseNumber)
        .should('have.value', connectionAddress.negative.houseNumber);
        
        cy.contains('button', 'fertig').click();
        });
    });