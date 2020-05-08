describe('Updates', () => {
  it('Should navigate through main navigation and show page title', () => {
    cy.visit('/');

    cy.get('#app .sidebar nav p-link-pure[href*="news/updates"]')
      .contains('Updates')
      .click()
      .should('have.attr', 'active', 'true');

    cy.get('#app main h1')
      .should('be.visible')
      .and('contain', 'Updates');
  });

  describe('Tabs', () => {
    beforeEach(() => {
      cy.visit('/#/news/updates');
    });

    it('Should show tab navigation with first tab activated', () => {
      cy.get('#app main .tabs a').should(($a) => {
        expect($a, '2 items').to.have.length(2);
        expect($a.eq(0), 'first item')
          .to.contain('Design')
          .to.have.class('router-link-active');
        expect($a.eq(1), 'second item')
          .to.contain('Code')
          .not.to.have.class('router-link-active');
      });
    });

    it('Should show design updates', () => {
      cy.get('#app main .tabs a')
        .contains('Design')
        .click()
        .should('have.class', 'router-link-active');

      cy.get('#app main h1').should('contain', 'Updates');
    });

    it('Should show code updates', () => {
      cy.get('#app main .tabs a')
        .contains('Code')
        .click()
        .should('have.class', 'router-link-active');

      cy.get('#app main h1').should('contain', 'Updates');
    });
  });
});
