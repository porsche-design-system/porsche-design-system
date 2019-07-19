describe('About', () => {
  it('Should navigate through main navigation and show page title', () => {
    cy.visit('/web');

    cy.get('#app aside nav a')
      .contains('About')
      .click()
      .parents('a')
      .should('have.class', 'router-link-active');

    cy.get('#app main h1')
      .should('be.visible')
      .and('contain', 'About the Porsche UI Kit');
  });
});
