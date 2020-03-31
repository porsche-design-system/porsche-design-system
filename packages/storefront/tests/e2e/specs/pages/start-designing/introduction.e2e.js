describe('Start Designing', () => {
  it('Should navigate through main navigation and show page title', () => {
    cy.visit('/');

    cy.get('#app .sidebar nav p-link-pure[href*="start-designing/introduction"]')
      .contains('Introduction')
      .click()
      .should('have.attr', 'active', 'true');

    cy.get('#app main h1')
      .should('be.visible')
      .and('contain', 'Start Designing');
  });
});
