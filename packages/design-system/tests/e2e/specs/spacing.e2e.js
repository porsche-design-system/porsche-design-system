describe('Spacing', () => {

  beforeEach(() => {
    window.localStorage.setItem('Feature: Q2/2019 Components', 'true');
  });

  it('Should navigate through main navigation', () => {
    cy.visit('/');

    cy.get('#app aside nav a')
      .contains('Spacing')
      .click()
      .parents('a')
      .should('have.class', 'router-link-active');

    cy.get('#app main h1')
      .should('be.visible')
      .and('contain', 'Spacing');
  });

  describe('Tabs', () => {

    beforeEach(() => {
      cy.visit('/#/components/layout/spacing');
    });

    it('Should show tab navigation with first tab activated', () => {
      cy.get('#app main .tabs a').should(($a) => {
        expect($a, '2 items').to.have.length(2);
        expect($a.eq(0), 'second item').to.contain('Design').to.have.class('router-link-active');
        expect($a.eq(1), 'second item').to.contain('Code').not.to.have.class('router-link-active');
      });
    });

    it('Should show design documentation', () => {
      cy.get('#app main .tabs a')
        .contains('Design')
        .click()
        .should('have.class', 'router-link-active');

      cy.get('#app main h1')
        .should('contain', 'Spacing');
    });

    it('Should show code documentation', () => {
      cy.get('#app main .tabs a')
        .contains('Code')
        .click()
        .should('have.class', 'router-link-active');

      cy.get('#app main h1')
        .should('contain', 'Spacing');
    });
  });
});
