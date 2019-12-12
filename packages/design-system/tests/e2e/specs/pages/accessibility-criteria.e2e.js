describe('Accessibility Criteria', () => {
  it('Should navigate through main navigation and show page title', () => {
    cy.visit('/#/web');

    cy.get('#app aside nav p-link-pure')
      .contains('Accessibility Criteria')
      .click()
      .should('have.attr', 'active', 'true');

    cy.get('#app main h1')
      .should('be.visible')
      .and('contain', 'Accessibility Criteria');
  });
});
