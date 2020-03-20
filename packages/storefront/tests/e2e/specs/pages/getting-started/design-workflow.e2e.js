describe('Design Workflow', () => {
  it('Should navigate through main navigation and show page title', () => {
    cy.visit('/');

    cy.get('#app .sidebar nav p-link-pure[href*="getting-started/design-workflow"]')
      .contains('Design Workflow')
      .click()
      .should('have.attr', 'active', 'true');

    cy.get('#app main h1')
      .should('be.visible')
      .and('contain', 'Design Workflow with Abstract');
  });
});
