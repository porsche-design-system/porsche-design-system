describe('Design Workflow', () => {
  it('Should navigate through main navigation and show page title', () => {
    cy.visit('/#/web');

    cy.get('#app aside nav p-link-pure')
      .contains('Design Workflow')
      .click()
      .should('have.attr', 'active', 'true');

    cy.get('#app main h1')
      .should('be.visible')
      .and('contain', 'Design Workflow with Abstract');
  });
});
