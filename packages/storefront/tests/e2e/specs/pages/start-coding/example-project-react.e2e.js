describe('Start Coding', () => {
  it('Should navigate through main navigation and show page title', () => {
    cy.visit('/');

    cy.get('#app .sidebar nav p-link-pure[href*="start-coding/example-project-react"]')
      .contains('Example Project React')
      .click()
      .should('have.attr', 'active', 'true');

    cy.get('#app main h1')
      .should('be.visible')
      .and('contain', 'Sample project integration react');
  });
});
