describe('Support', () => {
  it('Should navigate through main navigation and show page title', () => {
    cy.visit('/');

    cy.get('#app aside nav p-link-pure')
      .contains('Support')
      .click()
      .should('have.attr', 'active', 'true');

    cy.get('#app main h1')
      .should('be.visible')
      .and('contain', 'Support and communication channels');
  });
});
