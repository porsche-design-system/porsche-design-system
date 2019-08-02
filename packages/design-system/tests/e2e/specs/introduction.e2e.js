describe('Introduction', () => {
  it('Should navigate through main navigation and show page title', () => {
    cy.visit('/');

    cy.get('#app aside nav a')
      .contains('Introduction')
      .click()
      .parents('a')
      .should('have.class', 'router-link-active');

    cy.get('#app main h1')
      .should('be.visible')
      .and('contain', 'Introduction');
  });
});
