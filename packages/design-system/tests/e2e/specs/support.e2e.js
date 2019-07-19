describe('Support', () => {
  it('Should navigate through main navigation and show page title', () => {
    cy.visit('/web');

    cy.get('#app aside nav a')
      .contains('Support')
      .click()
      .parents('a')
      .should('have.class', 'router-link-active');

    cy.get('#app main h1')
      .should('be.visible')
      .and('contain', 'Support and Communication Channels');
  });
});
