describe('Start Coding', () => {
  it('Should navigate through main navigation and show page title', () => {
    cy.visit('/#/web');

    cy.get('#app aside nav p-link-pure')
      .contains('Start Coding')
      .click()
      .should('have.attr', 'active', 'true');

    cy.get('#app main h1')
      .should('be.visible')
      .and('contain', 'Start Coding');
  });
});
