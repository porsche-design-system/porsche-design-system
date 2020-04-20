describe('Sketch Plugins', () => {
  it('Should navigate through main navigation and show page title', () => {
    cy.visit('/');

    cy.get('#app .sidebar nav p-link-pure[href*="start-designing/sketch-plugins"]')
      .contains('Sketch Plugins')
      .click()
      .should('have.attr', 'active', 'true');

    cy.get('#app main h1')
      .should('be.visible')
      .and('contain', 'Sketch Plugins');
  });
});
