describe('Typography', () => {

  beforeEach(() => {
    window.localStorage.setItem('Feature: Q2/2019 Components', 'true');
  });

  it('Should navigate through main navigation and show design tab', () => {
    cy.visit('/');

    cy.get('#app aside nav a')
      .contains('Typography')
      .click()
      .parents('a')
      .should('have.class', 'router-link-active');

    cy.get('#app main h1')
      .should('be.visible')
      .and('contain', 'Typography');

  });
});
