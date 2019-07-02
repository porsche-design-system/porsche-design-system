describe('Flex', () => {

  beforeEach(() => {
    window.localStorage.setItem('Feature: Q2/2019 Components', 'true');
  });

  it('Should navigate through main navigation', () => {
    cy.visit('/');

    cy.get('#app aside nav a')
      .contains('Flex')
      .click()
      .parents('a')
      .should('have.class', 'router-link-active');

    cy.get('#app main h1')
      .should('be.visible')
      .and('contain', 'Flex');
  });

  describe('Tabs', () => {

    beforeEach(() => {
      cy.visit('/#/components/layout/flex');
    });

    it('Should show tab navigation with first tab activated', () => {
      cy.get('#app main .tabs a').should(($a) => {
        expect($a, '2 items').to.have.length(2);
        expect($a.eq(0), 'second item').to.contain('Code').to.have.class('router-link-active');
        expect($a.eq(1), 'second item').to.contain('Props').not.to.have.class('router-link-active');
      });
    });

    it('Should show code documentation', () => {
      cy.get('#app main .tabs a')
        .contains('Code')
        .click()
        .should('have.class', 'router-link-active');

      cy.get('#app main h1')
        .should('contain', 'Flex');
    });

    it('Should show props documentation', () => {
      cy.get('#app main .tabs a')
        .contains('Props')
        .click()
        .should('have.class', 'router-link-active');

      cy.get('#app main h1')
        .should('contain', 'Flex');
    });
  });
});
